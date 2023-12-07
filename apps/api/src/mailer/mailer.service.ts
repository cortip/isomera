import { MailerService as Mailer } from '@nestjs-modules/mailer'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UserEntity } from '../entities/user.entity'

@Injectable()
export class MailerService {
  constructor(private mailerService: Mailer) {}

  async sendEmail(user: UserEntity, subject: string, template: string, data) {
    try {
      return await this.mailerService.sendMail({
        to: user.email,
        subject: subject,
        template: template,
        context: {
          ...data
        }
      })
    } catch (err) {
      console.error(err)
      throw new HttpException(
        'Email could not be sent',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
