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
import { OrganizationModule } from '../organization/organization.module'
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh-token.strategy'

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
    ConfirmCodeModule,
    OrganizationModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, SessionSerializer, JwtRefreshTokenStrategy]
})
export class AuthModule {}
