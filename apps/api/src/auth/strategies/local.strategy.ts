import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'

import { AuthService } from '../auth.service'
import { UserEntity } from '../../entities/user.entity'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passReqToCallback: false
    })
  }

  validate(
    email: string,
    password: string
  ): Promise<
    Partial<UserEntity> & { refresh_token: string; access_token: string }
  > {
    return this.authService.login(email, password)
  }
}
