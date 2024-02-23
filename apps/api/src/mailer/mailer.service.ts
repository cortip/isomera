import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UserEntity } from '../entities/user.entity'
import * as nodemailer from 'nodemailer'
import * as handlebars from 'handlebars'
import * as fs from 'fs'
import * as path from 'path'
import { HandlebarsTemplate } from './types/mailer.types'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter
  private templateCache: Map<HandlebarsTemplate, handlebars.TemplateDelegate>

  constructor(protected readonly configService: ConfigService) {
    this.templateCache = new Map()

    const host = this.configService.get<string>('MAIL_HOST', 'localhost')
    const port = this.configService.get<number>('MAIL_PORT', 1025)
    const secure = this.configService.get<boolean>('MAILER_SECURE', false)
    const user = this.configService.get<string>('MAIL_USER')
    const pass = this.configService.get<string>('MAIL_PASSWORD')
    const fromName = this.configService.get<string>(
      'MAIL_FROM_NAME',
      'No-reply'
    )
    const fromAddress = this.configService.get<string>(
      'MAIL_FROM_ADDRESS',
      'noreply@example.com'
    )

    const auth = user && pass ? { auth: { user, pass } } : {}

    this.transporter = nodemailer.createTransport(
      {
        host,
        port,
        secure,
        ...auth,
        debug: process.env.NODE_ENV === 'development',
        logger: process.env.NODE_ENV === 'development'
      },
      {
        from: `"${fromName}" <${fromAddress}>`
      }
    )
  }

  private loadTemplate(templateName: HandlebarsTemplate, data: object): string {
    if (this.templateCache.has(templateName)) {
      const templateRenderFunction = this.templateCache.get(templateName)

      return templateRenderFunction(data)
    }

    const templatesFolderPath = path.join(__dirname, './templates')
    const templatePath = path.join(templatesFolderPath, `${templateName}.hbs`)

    const templateSource = fs.readFileSync(templatePath, 'utf8')

    const templateRenderFunction = handlebars.compile(templateSource)
    this.templateCache.set(templateName, templateRenderFunction)

    const finalHtml = templateRenderFunction(data)

    return finalHtml
  }

  async sendEmail(
    user: UserEntity,
    subject: string,
    template: HandlebarsTemplate,
    data?: object
  ) {
    const html = this.loadTemplate(template, data)

    try {
      await this.transporter.sendMail({
        to: user.email,
        subject: subject,
        html: html
      })
    } catch (err) {
      throw new HttpException(
        'Email could not be sent',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
