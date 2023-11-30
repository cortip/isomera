import { Test, TestingModule } from '@nestjs/testing'
import { MailerService } from './mailer.service'
import { MailerService as Mailer } from '@nestjs-modules/mailer'
import { createMock } from 'ts-auto-mock'

describe('MailerService', () => {
  let service: MailerService
  let mockedMailerService: jest.Mocked<Mailer>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailerService]
    })
      .useMocker(token => {
        if (Object.is(token, Mailer)) {
          return createMock<Mailer>()
        }
      })
      .compile()

    mockedMailerService = module.get<Mailer, jest.Mocked<Mailer>>(Mailer)

    service = module.get<MailerService>(MailerService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
