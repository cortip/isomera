import { MailerModule as MailModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { Module } from '@nestjs/common'
import { MailerService } from './mailer.service'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    MailModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAIL_HOST'),
          secure: false,
          auth: {
            user: configService.get('MAIL_USER'),
            pass: configService.get('MAIL_PASSWORD')
          }
        },
        defaults: {
          from: '"No Reply" <noreply@example.com>'
        },
        template: {
          dir: __dirname + '/mailer' + '/templates',
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
