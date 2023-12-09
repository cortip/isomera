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
  const testUser = createMock({
    firstName: 'John',
    lastName: 'Doe',
    password: '$pa55w00rd',
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

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should register a new user', async () => {
    const register: Pure<SignUpWithEmailCredentialsDto> = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.me',
      password: 'Pa$$w0rd',
      isPrivacyPolicyAccepted: true
    }

    const user = await controller.register(register)
    expect(user).toHaveProperty('email', register.email)
    expect(Object.getOwnPropertyNames(user)).not.toContain(['password'])

  })

  it('should log in an user', async () => {
    mockedAuthService.register.mockResolvedValue(
      createMock<UserEntity>({
        email: 'johndoe@johndoe.com',
        firstName: 'John',
        lastName: 'Doe',
      }) as UserEntity
    )
    const user: UserEntity = await controller.login(testUser)
    expect(Object.getOwnPropertyNames(user)).not.toContain(['password'])
    expect(user).toHaveProperty('email')
  })

  it('should got me logged', () => {
    expect(controller.me(testUser)).toEqual(testUser)
  })
})
