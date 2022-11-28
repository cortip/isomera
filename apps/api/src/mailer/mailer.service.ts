import { MailerService as Mailer } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';

@Injectable()
export class MailerService {
  constructor(private mailerService: Mailer) {}

  async sendEmail(user: User, subject: string, template: string, data) {
    try {
      return await this.mailerService.sendMail({
        to: user.email,
        subject: subject,
        template: template,
        context: {
          ...data,
        },
      });
    } catch (err) {
      throw new HttpException(
        'Email could not be sent',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
