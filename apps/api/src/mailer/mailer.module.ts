import { MailerModule as MailModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { Module } from '@nestjs/common'
import { MailerService } from './mailer.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { config as dotenvConfig } from 'dotenv'

dotenvConfig({ path: '.env' })

@Module({
  imports: [
    MailModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAIL_HOST', 'localhost'),
          port: configService.get('MAIL_PORT', 1025),
          secure: false,
          ...(configService.get('MAIL_USER') && {
            auth: {
              type: 'login',
              user: configService.get('MAIL_USER'),
              pass: configService.get('MAIL_PASSWORD')
            }
          })
        },
        defaults: {
          from: '"No Reply" <noreply@example.com>'
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true
          }
        }
      })
    })
  ],
  providers: [MailerService],
  exports: [MailerService]
})
export class MailerModule {}
