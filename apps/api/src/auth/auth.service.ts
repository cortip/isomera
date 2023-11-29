import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UserEntity } from '../entities/user.entity'
import { SignUpWithEmailCredentialsDto } from '@isomera/dtos'
import { JwtPayload } from '@isomera/interfaces'
import { UserService } from '../user/user.service'
import { MailerService } from '../mailer/mailer.service'
import { ConfirmCodeService } from '../user/confirm-code.service'
import { Pure } from '@isomera/interfaces'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly confirmCode: ConfirmCodeService
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

  signToken(user: UserEntity): string {
    const payload = {
      sub: user.email
    }

    return this.jwtService.sign(payload)
  }

  async sendGreetings(user: UserEntity) {
    return this.mailerService.sendEmail(user, 'Welcome!', 'welcome', { user })
  }
}
