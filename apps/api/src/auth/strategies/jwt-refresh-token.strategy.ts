import { Request } from 'express'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from '../auth.service'
import { JwtPayload } from '@isomera/interfaces'

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

  async validate(request: Request, payload: JwtPayload) {
    return await this.authService.getUserIfRefreshTokenMatched(
      payload.sub,
      request.headers.authorization.split('Bearer ')[1]
    )
  }
}
