import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AuthUser } from '../user/user.decorator';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { SignUp } from './dto/sign-up.dto';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SessionAuthGuard } from './guards/session-auth.guard';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ConfirmCodeService } from '../user/confirm-code.service';
import { ConfirmCodeDto } from './dto/confirm-code.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly confirmCodeService: ConfirmCodeService
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(TokenInterceptor)
  register(@Body() signUp: SignUp): Promise<User> {
    if (signUp.policy) {
      delete signUp.policy;
      return this.authService.register(signUp);
    }
    throw new HttpException('You must accept the policy', HttpStatus.FORBIDDEN);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TokenInterceptor)
  async login(@AuthUser() user: User): Promise<User> {
    return user;
  }

  @Post('code')
  @HttpCode(HttpStatus.OK)
  async confirmCode(@Body() body: ConfirmCodeDto): Promise<User> {
    return this.confirmCodeService.verifyCode(body.code, body.email);
  }

  @Get('/me')
  @UseGuards(SessionAuthGuard, JWTAuthGuard)
  me(@AuthUser() user: User): User {
    return user;
  }
}
