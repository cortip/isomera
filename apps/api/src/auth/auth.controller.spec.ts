import { Test, TestingModule } from '@nestjs/testing'
import { createMock } from '@golevelup/ts-jest'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { ConfirmCodeService } from '../user/confirm-code.service'
import { UserEntity } from '../entities/user.entity'
import { SignUpWithEmailCredentialsDto } from '@isomera/dtos'
import { Pure } from '@isomera/interfaces'

describe('Auth Controller', () => {
  let controller: AuthController
  let mockedAuthService: jest.Mocked<AuthService>
  const user = createMock({
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
      policy: true,
      isPrivacyPolicyAccepted: true
    }

    mockedAuthService.register.mockResolvedValue(
      createMock<UserEntity>({
        email: register.email,
        firstName: 'John',
        lastName: 'Doe'
      }) as UserEntity
    )
    const result = await controller.register(register)
    const userEntityObjectKeys = Object.getOwnPropertyNames((result))

    expect(userEntityObjectKeys).not.toEqual(
      expect.arrayContaining(['password'])
    )
  })

  it('should log in an user', async () => {
    mockedAuthService.register.mockResolvedValue(
      createMock<UserEntity>({
        email: 'johndoe@johndoe.com',
        firstName: 'John',
        lastName: 'Doe',
      }) as UserEntity
    )
    const result: UserEntity = await controller.login(user)
    const userEntityObjectKeys = Object.getOwnPropertyNames((result))

    expect(userEntityObjectKeys).not.toEqual(
      expect.arrayContaining(['password'])
    )
    expect(result).toHaveProperty('email')
  })

  it('should got me logged', () => {
    expect(controller.me(user)).toEqual(user)
  })
})
