import {
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
import { JwtPayload } from '@isomera/interfaces'
import { UserService } from '../user/user.service'
import { MailerService } from '../mailer/mailer.service'
import { ConfirmCodeService } from '../user/confirm-code.service'
import { Pure } from '@isomera/interfaces'
import { generateRandomStringUtil } from '@isomera/utils'
import { OrganizationService } from '../organization/organization.service'
import { ConfigService } from '@nestjs/config'

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
          'email-confirmation',
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

  async login(email: string, password: string): Promise<UserEntity> {
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
    delete user.password

    return user
  }

  async verifyPayload(payload: JwtPayload): Promise<UserEntity> {
    let user: UserEntity

    try {
      user = await this.userService.findOne({ where: { email: payload.sub } })
    } catch (error) {
      throw new UnauthorizedException(
        `There isn't any user with email: ${payload.sub}`
      )
    }
    delete user.password

    return user
  }

  signToken(user: UserEntity): {refresh_token: string, access_token: string} {
    return {
      refresh_token: this.generateRefreshToken(user.email),
      access_token: this.generateAccessToken(user.email)
    }
  }

  private generateAccessToken(email: string): string {
    const payload = {
      sub: email
    }

    return this.jwtService.sign(payload, {
      expiresIn: `${this.configService.get<string>(
          'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
  }

  private generateRefreshToken(email: string): string {
    const payload = {
      sub: email
    }

    return this.jwtService.sign(payload, {
      expiresIn: `${this.configService.get<string>(
          'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
  }

  async sendGreetings(user: UserEntity) {
    return this.mailerService.sendEmail(user, 'Welcome!', 'welcome', { user })
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
          'password-reset-code',
          { user, code: passwordResetCode }
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
    if (user?.id) {
      const updateResult = await this.userService.setNewPassword(
        user.id,
        resetPasswordRequestDto.newPassword
      )
      return updateResult.affected > 0
    }
    return false
  }

  /**
   * After verify user, create personal organization for this user and send email
   * @param code 
   * @param email 
   */
  public async verifyCode({code, email}: Pure<ConfirmationCodeDto>): Promise<UserEntity> {
    const user = await this.confirmCode.verifyCode(code, email);

    await this.organizationService.createDefaultOrganization(user.id);

    await this.sendGreetings(user);
    
    return user
  }
}
