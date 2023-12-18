import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'

import { AuthService } from '../auth.service'
import { LoginResponseInterface } from '@isomera/interfaces'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passReqToCallback: false
    })
  }

  validate(email: string, password: string): Promise<LoginResponseInterface> {
    return this.authService.login(email, password)
  }
}
