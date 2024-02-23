import { Request } from 'express'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from '../auth.service'
import { LoginWith2FAPayload } from '@isomera/interfaces'

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token'
) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.APP_SECRET,
      passReqToCallback: true
    })
  }

  async validate(request: Request, payload: LoginWith2FAPayload) {
    const user = await this.authService.getUserIfRefreshTokenMatched(
      payload.email,
      request.headers.authorization.split('Bearer ')[1]
    )

    return {
      ...user,
      isTwoFactorAuthenticated: payload.isTwoFactorAuthenticated
    }
  }
}
