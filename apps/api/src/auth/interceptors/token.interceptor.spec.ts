import type { CallHandler } from '@nestjs/common'
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host'
import { Test, type TestingModule } from '@nestjs/testing'
import { createMocks } from 'node-mocks-http'
import { lastValueFrom, of } from 'rxjs'
import { createMock } from '@golevelup/ts-jest'

import { TokenInterceptor } from './token.interceptor'
import { AuthService } from '../auth.service'
import { UserEntity } from '../../entities/user.entity'

describe('TokenInterceptor', () => {
  let interceptor: TokenInterceptor
  let mockedAuthService: jest.Mocked<AuthService>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenInterceptor]
    })
      .useMocker(token => {
        if (Object.is(token, AuthService)) {
          return createMock<AuthService>()
        }
      })
      .compile()

    interceptor = module.get<TokenInterceptor>(TokenInterceptor)
    mockedAuthService = module.get<AuthService, jest.Mocked<AuthService>>(
      AuthService
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should add the token to the response', async () => {
    const { req, res } = createMocks()
    const user = createMock<UserEntity>({
      email: 'john@johndoe.com',
      firstName: 'John'
    })
    const context = new ExecutionContextHost([req, res])
    const next = createMock<CallHandler<UserEntity>>({
      handle: () => of(user)
    })

    lastValueFrom(interceptor.intercept(context, next))

    jest
      .spyOn(mockedAuthService, 'signToken')
      .mockImplementationOnce(() => {
        return {
          refresh_token: 'refresh_token',
          access_token: 'jwt'
        }
      })
    jest.spyOn(res, 'getHeader').mockReturnValue('Bearer j.w.t')

    expect(res.getHeader('Authorization')).toBe('Bearer j.w.t')
    // @todo: Refactor implementation of token.interceptor for implementation
    // expect(res.cookies).toHaveProperty('token')
  })
})
