import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { UserService } from '../../user/user.service'
import { LoginWith2FAPayload } from '@isomera/interfaces'

@Injectable()
export class Jwt2faStrategy extends PassportStrategy(Strategy, 'jwt-2fa') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.APP_SECRET
    })
  }

  async validate(payload: LoginWith2FAPayload) {
    const user = await this.userService.findOne({
      where: { email: payload.email }
    })

    if (!user.isTwoFAEnabled) {
      return user
    }

    if (payload.isTwoFactorAuthenticated) {
      return {
        ...user,
        isTwoFactorAuthenticated: payload.isTwoFactorAuthenticated
      }
    }
  }
}
