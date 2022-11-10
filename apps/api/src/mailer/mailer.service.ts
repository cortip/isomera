import { MailerService as Mailer } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';

@Injectable()
export class MailerService {
  constructor(private mailerService: Mailer) {}

  async sendUserConfirmation(
    user: User,
    subject: string,
    template: string,
    data: any
  ) {
    return await this.mailerService.sendMail({
      to: user.email,
      subject: subject,
      template: template,
      context: {
        ...data,
      },
    });
  }
}
