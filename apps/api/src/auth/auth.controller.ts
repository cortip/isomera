import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'

import { AuthUser } from '../user/user.decorator'
import { UserEntity } from '../entities/user.entity'
import { AuthService } from './auth.service'
import {
  ConfirmationCodeDto,
  ForgotPasswordResetRequestDto,
  Recovery2FADto,
  ResetPasswordRequestDto,
  SignInWithEmailCredentialsDto,
  SignUpWithEmailCredentialsDto,
  TurnOff2FADto,
  TurnOn2FADto
} from '@isomera/dtos'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { SessionAuthGuard } from './guards/session-auth.guard'
import { TokenInterceptor } from './interceptors/token.interceptor'
import {
  ConfirmCodeResponseInterface,
  LogoutResponseInterface,
  PasswordResetPerformInterface,
  PasswordResetRequestInterface,
  Pure,
  RefreshTokenResponseInterface,
  StatusType,
  TurnOff2FAResponseInterface
} from '@isomera/interfaces'
import { JwtRefreshTokenGuard } from './guards/jwt-refresh-token'
import { Jwt2faAuthGuard } from './guards/jwt-2fa-auth.guard'
import { JWTAuthGuard } from './guards/jwt-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(TokenInterceptor)
  register(
    @Body()
    SignUpWithEmailCredentialsDto: Pure<SignUpWithEmailCredentialsDto>
  ): Promise<UserEntity> {
    if (SignUpWithEmailCredentialsDto.isPrivacyPolicyAccepted) {
      delete SignUpWithEmailCredentialsDto.isPrivacyPolicyAccepted
      return this.authService.register(SignUpWithEmailCredentialsDto)
    }
    throw new HttpException('You must accept the policy', HttpStatus.FORBIDDEN)
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TokenInterceptor)
  async login(
    @AuthUser() user: Pure<SignInWithEmailCredentialsDto>
  ): Promise<UserEntity> {
    delete user.password
    return user as UserEntity
  }

  @Post('code')
  @HttpCode(HttpStatus.OK)
  async confirmCode(
    @Body() body: Pure<ConfirmationCodeDto>
  ): Promise<ConfirmCodeResponseInterface> {
    const user = await this.authService.verifyCode(body)

    return { status: user ? StatusType.OK : StatusType.FAIL }
  }

  @Get('/me')
  @UseGuards(SessionAuthGuard, Jwt2faAuthGuard)
  me(@AuthUser() user: Pure<SignInWithEmailCredentialsDto>): UserEntity {
    return user as UserEntity
  }

  @Post('/request-password-reset')
  @HttpCode(HttpStatus.OK)
  async requestPasswordReset(
    @Body() body: Pure<ForgotPasswordResetRequestDto>
  ): Promise<PasswordResetRequestInterface> {
    await this.authService.requestPasswordReset(body.email)
    return { status: StatusType.OK }
  }

  @Post('/request-password-reset/confirm')
  @HttpCode(HttpStatus.OK)
  async resetPassword(
    @Body() body: Pure<ResetPasswordRequestDto>
  ): Promise<PasswordResetPerformInterface> {
    const result = await this.authService.setNewPassword(body)
    return { status: result ? StatusType.OK : StatusType.FAIL }
  }

  @UseGuards(JwtRefreshTokenGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @AuthUser() user: Pure<UserEntity> & { isTwoFactorAuthenticated: boolean }
  ): Promise<RefreshTokenResponseInterface> {
    const payload = {
      email: user.email,
      isTwoFactorAuthenticationEnabled: !!user.isTwoFAEnabled,
      isTwoFactorAuthenticated: !!user.isTwoFactorAuthenticated
    }

    const { refresh_token, access_token } = this.authService.signToken(payload)

    await this.authService.storeRefreshToken(user, refresh_token)
    return {
      access_token,
      refresh_token,
      status: StatusType.OK
    }
  }

  @Post('/logout')
  @UseGuards(SessionAuthGuard, Jwt2faAuthGuard)
  @HttpCode(HttpStatus.OK)
  async logout(
    @AuthUser() user: Pure<UserEntity>
  ): Promise<LogoutResponseInterface> {
    await this.authService.logout(user)
    return {
      status: StatusType.OK
    }
  }

  @Post('2fa/generate')
  @UseGuards(SessionAuthGuard, Jwt2faAuthGuard)
  @HttpCode(HttpStatus.OK)
  async register2FA(@AuthUser() user: Pure<UserEntity>) {
    const { otpAuthUrl } =
      await this.authService.generateTwoFactorAuthenticationSecret(user)

    return {
      status: StatusType.OK,
      image: await this.authService.generateQrCodeDataURL(otpAuthUrl)
    }
  }

  @Post('2fa/request-recovery')
  @HttpCode(HttpStatus.OK)
  async requestRecovery2FA(@Body() { code }: Pure<Recovery2FADto>) {
    await this.authService.requestRecovery2FA(code)
    return {
      status: StatusType.OK
    }
  }

  @Post('2fa/confirm-recovery')
  @HttpCode(HttpStatus.OK)
  async confirmRecovery2FACode(
    @Body() { code, email }: Pure<ConfirmationCodeDto>
  ) {
    await this.authService.confirmRecovery2FACode({ code, email })
    return {
      status: StatusType.OK
    }
  }

  @Post('2fa/turn-on')
  @UseGuards(SessionAuthGuard, Jwt2faAuthGuard)
  @HttpCode(HttpStatus.OK)
  async turnOnTwoFactorAuthentication(
    @AuthUser() user: Pure<UserEntity>,
    @Body() { code }: Pure<TurnOn2FADto>
  ) {
    await this.authService.turnOn2FA(user, code)
    const data = await this.authService.loginWith2fa(user, code)
    delete data.password

    const { access_token, refresh_token } = data

    return {
      status: StatusType.OK,
      secret: user.twoFASecret,
      access_token,
      refresh_token
    }
  }

  @Post('2fa/authenticate')
  @HttpCode(200)
  @UseGuards(SessionAuthGuard, JWTAuthGuard)
  async authenticate(
    @AuthUser() user: Pure<UserEntity>,
    @Body() { code }: Pure<TurnOn2FADto>
  ) {
    const data = await this.authService.loginWith2fa(user, code)
    delete data.password

    return data
  }

  @Post('2fa/turn-off')
  @UseGuards(SessionAuthGuard, Jwt2faAuthGuard)
  @HttpCode(HttpStatus.OK)
  async turnOffTwoFactorAuthentication(
    @AuthUser() user: Pure<UserEntity>,
    @Body() { code }: Pure<TurnOff2FADto>
  ): Promise<TurnOff2FAResponseInterface> {
    await this.authService.turnOff2FA(user, code)
    const { access_token, refresh_token } =
      await this.authService.generateTokenFromUser(user)

    return {
      status: StatusType.OK,
      access_token,
      refresh_token
    }
  }
}
