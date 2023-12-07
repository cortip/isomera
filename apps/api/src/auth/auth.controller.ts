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
  ResetPasswordRequestDto,
  SignInWithEmailCredentialsDto,
  SignUpWithEmailCredentialsDto
} from '@isomera/dtos'
import { JWTAuthGuard } from './guards/jwt-auth.guard'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { SessionAuthGuard } from './guards/session-auth.guard'
import { TokenInterceptor } from './interceptors/token.interceptor'
import { ConfirmCodeService } from '../user/confirm-code.service'
import {
  PasswordResetPerformInterface,
  PasswordResetRequestInterface,
  Pure,
  StatusType
} from '@isomera/interfaces'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly confirmCodeService: ConfirmCodeService
  ) {}

  //
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
    return user as UserEntity
  }

  @Post('code')
  @HttpCode(HttpStatus.OK)
  async confirmCode(
    @Body() body: Pure<ConfirmationCodeDto>
  ): Promise<UserEntity> {
    const user = await this.confirmCodeService.verifyCode(body.code, body.email)

    await this.authService.sendGreetings(user)

    return user
  }

  @Get('/me')
  @UseGuards(SessionAuthGuard, JWTAuthGuard)
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
}
