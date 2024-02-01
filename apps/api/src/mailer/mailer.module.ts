import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MailerService } from './mailer.service'

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [MailerService],
  exports: [MailerService]
})
export class MailerModule {}
