import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { UserModule } from '../user/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { SessionSerializer } from './session.serializer'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'
import { MailerModule } from '../mailer/mailer.module'
import { ConfirmCodeModule } from '../user/confirm-code.module'

@Module({
  imports: [
    MailerModule,
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.APP_SECRET,
      signOptions: {
        expiresIn: '1d',
        algorithm: 'HS384'
      },
      verifyOptions: {
        algorithms: ['HS384']
      }
    }),
    ConfirmCodeModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, SessionSerializer]
})
export class AuthModule {}
