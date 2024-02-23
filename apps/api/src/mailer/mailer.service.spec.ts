import { Test, TestingModule } from '@nestjs/testing'
import { MailerService } from './mailer.service'
import { createMock } from '@golevelup/ts-jest'
import { ConfigService } from '@nestjs/config'

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue({ messageId: 'test-message-id' })
  })
}))

describe('MailerService', () => {
  let service: MailerService
  let configService: ConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailerService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              // this is being super extra, in the case that you need multiple keys with the `get` method
              if (key === 'MAIL_FROM_NAME') {
                return 'from name'
              }
              if (key === 'MAIL_FROM_ADDRESS') {
                return 'from address'
              }
              return null
            })
          }
        }
      ]
    })
      .useMocker(token => {
        if (Object.is(token, ConfigService)) {
          return createMock<ConfigService>()
        }
      })
      .compile()

    service = module.get<MailerService>(MailerService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
