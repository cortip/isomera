import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UserEntity } from '../entities/user.entity'
import {
  ConfirmationCodeDto,
  ResetPasswordRequestDto,
  SignUpWithEmailCredentialsDto
} from '@isomera/dtos'
import {
  JwtPayload,
  LoginResponseInterface,
  LoginWith2FAPayload,
  LoginWithEmailPayload,
  SignTokenInterface
} from '@isomera/interfaces'
import { UserService } from '../user/user.service'
import { MailerService } from '../mailer/mailer.service'
import { ConfirmCodeService } from '../user/confirm-code.service'
import { Pure } from '@isomera/interfaces'
import { generateRandomStringUtil } from '@isomera/utils'
import { OrganizationService } from '../organization/organization.service'
import { ConfigService } from '@nestjs/config'
import * as bcrypt from 'bcrypt'
import { HandlebarsTemplate } from '../mailer/types/mailer.types'
import { authenticator } from 'otplib'
import { toDataURL } from 'qrcode'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly confirmCode: ConfirmCodeService,
    private readonly organizationService: OrganizationService,
    private readonly configService: ConfigService
  ) {}

  async register(
    SignUpWithEmailCredentialsDto: Pure<SignUpWithEmailCredentialsDto>
  ): Promise<UserEntity> {
    const user = await this.userService.create(SignUpWithEmailCredentialsDto)
    delete user.password

    //TODO: mock confirmCode
    if (process.env.NODE_ENV !== 'test') {
      const code = await this.confirmCode.genNewCode(user)
      if (code.code) {
        await this.mailerService.sendEmail(
          user,
          'Email verification',
          HandlebarsTemplate.EMAIL_CONFIRMATION,
          {
            name: user.firstName,
            code: code.code
          }
        )
        return user
      }
      throw new HttpException(
        "Couldn't generate the code",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    } else {
      return user
    }
  }

  async login(
    email: string,
    password: string
  ): Promise<LoginResponseInterface> {
    let user: UserEntity

    try {
      user = await this.userService.findOne({ where: { email } })
    } catch (err) {
      throw new UnauthorizedException(
        `There isn't any user with email: ${email}`
      )
    }

    if (!(await user.checkPassword(password))) {
      throw new UnauthorizedException(
        `Wrong password for user with email: ${email}`
      )
    }

    const { refresh_token, access_token } =
      await this.generateTokenFromUser(user)

    delete user.password

    return { ...user, refresh_token, access_token }
  }

  async verifyPayload(
    payload: JwtPayload
  ): Promise<UserEntity & { isTwoFactorAuthenticated?: boolean }> {
    let user: UserEntity & { isTwoFactorAuthenticated?: boolean }

    try {
      user = await this.userService.findOne({
        where: { email: payload.email }
      })

      if (!user.isTwoFAEnabled) {
        return user
      }

      if (payload.isTwoFactorAuthenticated) {
        user.isTwoFactorAuthenticated = payload.isTwoFactorAuthenticated
      }

      delete user.password

      return user
    } catch (error) {
      throw new UnauthorizedException(
        `There isn't any user with email: ${payload.email}`
      )
    }
  }

  signToken<T>(payload: T): SignTokenInterface {
    return {
      refresh_token: this.generateRefreshToken(payload),
      access_token: this.generateAccessToken(payload)
    }
  }

  public generateAccessToken<T>(payload: T): string {
    return this.jwtService.sign(payload as object, {
      expiresIn: `${this.configService.get<string>(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
        '260'
      )}s`
    })
  }

  public generateRefreshToken<T>(payload: T): string {
    return this.jwtService.sign(payload as object, {
      expiresIn: `${this.configService.get<string>(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME'
      )}s`
    })
  }

  async sendGreetings(user: UserEntity) {
    return this.mailerService.sendEmail(
      user,
      'Welcome!',
      HandlebarsTemplate.WELCOME,
      { user }
    )
  }

  async requestPasswordReset(email: string): Promise<boolean> {
    /**
     * Do not fail if user is not found. We do not want people to know whether email they
     * provided is actually registered or not.
     */
    try {
      const user: UserEntity = await this.userService.findOne({
        where: { email }
      })
      if (user?.id) {
        const passwordResetCode = generateRandomStringUtil(32)
        await this.userService.setPasswordResetCode(user.id, passwordResetCode)
        void this.mailerService.sendEmail(
          user,
          'Password reset code',
          HandlebarsTemplate.PASSWORD_RESET_CODE,
          {
            name: `${user.firstName} ${user.lastName}`,
            code: passwordResetCode,
            link: `${process.env.PLATFORM_URL}/reset-password/confirm`
          }
        )
        return true
      }
    } catch (e) {
      return false
    }
    return false
  }

  async setNewPassword(
    resetPasswordRequestDto: Pure<ResetPasswordRequestDto>
  ): Promise<boolean> {
    const user: UserEntity = await this.userService.findOne({
      where: { passwordResetCode: resetPasswordRequestDto.passwordResetCode }
    })

    if (!user.isValidResetCodeTime()) {
      throw new HttpException(
        'Invalid password reset code',
        HttpStatus.BAD_REQUEST
      )
    }

    if (user?.id) {
      await this.userService.setNewPassword(
        user.id,
        resetPasswordRequestDto.newPassword
      )

      return true
    }
    return false
  }

  /**
   * After verify user, create personal organization for this user and send email
   * @param code
   * @param email
   */
  public async verifyCode({
    code,
    email
  }: Pure<ConfirmationCodeDto>): Promise<UserEntity> {
    const user = await this.confirmCode.verifyCode(code, email)

    await this.organizationService.createDefaultOrganization(user.id)

    await this.sendGreetings(user)

    return user
  }

  async getUserIfRefreshTokenMatched(
    email: string,
    refreshToken: string
  ): Promise<UserEntity> {
    const user = await this.userService.findOne({ where: { email } })
    if (!user) {
      throw new UnauthorizedException()
    }
    await this.verifyPlainContentWithHashedContent(
      refreshToken,
      user.refreshToken
    )
    return user
  }

  private async verifyPlainContentWithHashedContent(
    plainText: string,
    hashedText: string
  ) {
    const is_matching = await bcrypt.compare(plainText, hashedText)
    if (!is_matching) {
      throw new BadRequestException()
    }
  }

  async storeRefreshToken(
    user: UserEntity,
    token: string
  ): Promise<UserEntity> {
    const salt = await bcrypt.genSalt()
    const hashedToken = await bcrypt.hash(token, salt)
    return await this.userService.storeRefreshToken(user, hashedToken)
  }

  async logout(user: UserEntity) {
    return this.userService.storeRefreshToken(user, null)
  }

  // for 2FA
  async generateTwoFactorAuthenticationSecret(user: UserEntity) {
    const secret = authenticator.generateSecret()

    const otpAuthUrl = authenticator.keyuri(
      user.email,
      this.configService.get<string>('AUTH_APP_NAME'),
      secret
    )

    await this.userService.setTwoFactorAuthenticationSecret(user, secret)

    return {
      secret,
      otpAuthUrl
    }
  }

  // for 2FA
  isTwoFactorAuthenticationCodeValid(user: UserEntity, code: string): boolean {
    return authenticator.verify({
      token: code,
      secret: user.twoFASecret
    })
  }

  /**
   * Generate QR code
   * @param otpAuthUrl
   * @returns
   */
  async generateQrCodeDataURL(otpAuthUrl: string) {
    return toDataURL(otpAuthUrl)
  }

  /**
   * Turn on 2FA
   * @param user
   * @param code
   */
  async turnOn2FA(user: UserEntity, code: string) {
    const isCodeValid = this.isTwoFactorAuthenticationCodeValid(user, code)

    if (!isCodeValid) {
      throw new UnauthorizedException('Code is incorrect.')
    }

    await this.userService.setupTwoFactorAuthentication(user, true)
  }

  /**
   * Turn off 2FA
   * @param user
   * @param code
   */
  async turnOff2FA(user: UserEntity, code: string) {
    const isCodeValid = this.isTwoFactorAuthenticationCodeValid(user, code)

    if (!isCodeValid) {
      throw new UnauthorizedException('Code is incorrect.')
    }

    await this.userService.turnOfTwoFactorAuthentication(user)
  }

  /**
   * Login with 2FA
   * @param user
   * @param code
   * @returns
   */
  async loginWith2fa(
    user: UserEntity,
    code: string
  ): Promise<LoginResponseInterface> {
    const isCodeValid = this.isTwoFactorAuthenticationCodeValid(user, code)

    if (!isCodeValid) {
      throw new UnauthorizedException('Code is incorrect.')
    }

    const payload: LoginWith2FAPayload = {
      email: user.email,
      isTwoFactorAuthenticationEnabled: !!user.isTwoFAEnabled,
      isTwoFactorAuthenticated: true
    }

    const { refresh_token, access_token } = this.signToken(payload)

    await this.storeRefreshToken(user, refresh_token)

    return {
      ...user,
      access_token: access_token,
      refresh_token: refresh_token
    }
  }

  async requestRecovery2FA(secret: string) {
    const user = await this.userService.findOne({
      where: { twoFASecret: secret }
    })
    if (!user) {
      throw new UnauthorizedException(`There isn't any user with this code`)
    }

    if (process.env.NODE_ENV !== 'test') {
      const code = await this.confirmCode.genNewCode(user)
      if (code.code) {
        await this.mailerService.sendEmail(
          user,
          'Two Factor Authentication Recovery',
          HandlebarsTemplate.CONFIRM_RECOVERY,
          {
            name: user.firstName,
            code: code.code,
            email: user.email,
            baseUrl: process.env.PLATFORM_URL
          }
        )
        return user
      }
      throw new HttpException(
        "Couldn't generate the code",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    } else {
      return user
    }
  }

  async confirmRecovery2FACode({
    code,
    email
  }: Pure<ConfirmationCodeDto>): Promise<UserEntity> {
    const user = await this.confirmCode.verifyCode(code, email)
    return this.userService.turnOfTwoFactorAuthentication(user)
  }

  /**
   * Generate token from user
   * @param user
   * @returns
   */
  async generateTokenFromUser(user: UserEntity): Promise<SignTokenInterface> {
    const payload: LoginWithEmailPayload = {
      email: user.email
    }
    const { refresh_token, access_token } = this.signToken(payload)

    await this.storeRefreshToken(user, refresh_token)

    return { refresh_token, access_token }
  }
}
