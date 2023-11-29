import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'

import { AuthService } from '../auth.service'

import { JwtPayload } from '@isomera/interfaces'
import { UserEntity } from '../../entities/user.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.APP_SECRET,
      ignoreExpiration: false,
      passReqToCallback: false
    })
  }

  validate(payload: JwtPayload): Promise<UserEntity> {
    return this.authService.verifyPayload(payload)
  }
}
