import {
  All,
  Controller,
  HttpStatus,
  type INestApplication,
  Request,
  UnauthorizedException
} from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { PassportModule } from '@nestjs/passport'
import { Test, type TestingModule } from '@nestjs/testing'
import type { Request as Req } from 'express'
import session from 'express-session'
import request from 'supertest'
import { createMock } from '@golevelup/ts-jest'

import { AuthService } from '../auth.service'
import { SessionSerializer } from '../session.serializer'
import { LocalStrategy } from '../strategies/local.strategy'
import { LocalAuthGuard } from './local-auth.guard'
import { UserEntity } from '../../entities/user.entity'
import { generateRandomNumber } from '@isomera/utils'

@Controller()
class TestController {
  @All()
  endpoint(@Request() req: Req) {
    return req.user
  }
}

describe('LocalAuthGuard', () => {
  let app: INestApplication
  let mockedAuthService: jest.Mocked<AuthService>

  beforeEach(async () => {
    process.env.SESSION_SECRET = generateRandomNumber(10).toString()

    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ session: true })],
      controllers: [TestController],
      providers: [
        LocalStrategy,
        SessionSerializer,
        {
          provide: APP_GUARD,
          useClass: LocalAuthGuard
        }
      ]
    })
      .useMocker(token => {
        if (Object.is(token, AuthService)) {
          return createMock<AuthService>()
        }
      })
      .compile()

    mockedAuthService = module.get(AuthService)
    app = module.createNestApplication()

    app.use(
      session({
        secret: String(process.env.SESSION_SECRET),
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: true
        }
      })
    )

    await app.init()
    await app.getHttpAdapter().getInstance()
  })

  afterAll(async () => {
    await app.close()
    delete process.env.SESSION_SECRET
  })

  it('should authenticate using email and password', async () => {
    mockedAuthService.login.mockResolvedValueOnce(
      createMock<UserEntity>({
        email: 'john@doe.me',
        id: 1,
        firstName: 'John',
        lastName: 'Doe'
      })
    )

    request(app.getHttpServer())
      .post('/')
      .send({ email: 'john@doe.me', password: 'Pa$$w0rd' })
      .expect(HttpStatus.OK)
      .expect(({ headers }) => {
        expect(headers['set-cookie'][0]).toEqual(
          expect.stringContaining('connect.sid')
        )
      })
  })

  it('should not authenticate when email and password are missing', async () => {
    mockedAuthService.login.mockRejectedValueOnce(new UnauthorizedException())

    await request(app.getHttpServer()).get('/').expect(HttpStatus.UNAUTHORIZED)
  })
})
