import { Test, TestingModule } from '@nestjs/testing'
import { createMock } from 'ts-auto-mock'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { ConfirmCodeService } from '../user/confirm-code.service'
import { UserEntity } from '../entities/user.entity'
import { SignUpWithEmailCredentialsDto } from '@isomera/dtos'
import { Pure } from '@isomera/interfaces'

describe('Auth Controller', () => {
  let controller: AuthController
  let mockedAuthService: jest.Mocked<AuthService>
  const user = createMock<Omit<UserEntity, 'password'>>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@doe.me'
  }) as UserEntity

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController]
    })
      .useMocker(token => {
        if (Object.is(token, AuthService)) {
          return createMock<AuthService>()
        }
        if (Object.is(token, ConfirmCodeService)) {
          return createMock<ConfirmCodeService>()
        }
      })
      .compile()

    controller = module.get<AuthController>(AuthController)
    mockedAuthService = module.get<AuthService, jest.Mocked<AuthService>>(
      AuthService
    )
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should register a new user', async () => {
    const register = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.me',
      password: 'Pa$$w0rd',
      policy: true
    }

    mockedAuthService.register.mockResolvedValue(
      createMock<Omit<Pure<SignUpWithEmailCredentialsDto>, 'password'>>({
        email: register.email,
        firstName: 'John',
        lastName: 'Doe'
      }) as UserEntity
    )

    await expect(controller.register(register)).resolves.not.toHaveProperty(
      'password'
    )
  })

  it('should log in an user', async () => {
    await expect(controller.login(user)).resolves.not.toHaveProperty('password')
  })

  it('should got me logged', () => {
    expect(controller.me(user)).toEqual(user)
  })
})
