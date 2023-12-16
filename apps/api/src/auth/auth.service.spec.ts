import { JwtService } from '@nestjs/jwt'
import { Test, type TestingModule } from '@nestjs/testing'
import { createMock } from '@golevelup/ts-jest'

import { UserService } from '../user/user.service'
import { AuthService } from './auth.service'
import type { JwtPayload } from '@isomera/interfaces'
import { MailerService } from '../mailer/mailer.service'
import { ConfirmCodeService } from '../user/confirm-code.service'
import { UserEntity } from '../entities/user.entity'
import { SignUpWithEmailCredentialsDto } from '@isomera/dtos'
import { Pure } from '@isomera/interfaces'

describe('AuthService', () => {
  let service: AuthService
  let mockedUserService: jest.Mocked<UserService>
  let mockedJwtService: jest.Mocked<JwtService>
  // let mockedMailerService: jest.Mocked<MailerService>;
  // let mockedConfirmCodeService: jest.Mocked<ConfirmCodeService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService]
    })
      .useMocker(token => {
        if (Object.is(token, UserService)) {
          return createMock<UserService>()
        }
        if (Object.is(token, JwtService)) {
          return createMock<JwtService>()
        }
        if (Object.is(token, MailerService)) {
          return createMock<MailerService>()
        }
        if (Object.is(token, ConfirmCodeService)) {
          return createMock<ConfirmCodeService>()
        }
      })
      .compile()

    service = module.get(AuthService)
    mockedUserService = module.get<UserService, jest.Mocked<UserService>>(
      UserService
    )
    mockedJwtService = module.get<JwtService, jest.Mocked<JwtService>>(
      JwtService
    )
    // mockedMailerService = module.get<MailerService, jest.Mocked<MailerService>>(
    //   MailerService
    // );
    // mockedConfirmCodeService = module.get<
    //   ConfirmCodeService,
    //   jest.Mocked<ConfirmCodeService>
    // >(ConfirmCodeService);
  })

  afterAll(() => {
    jest.clearAllMocks()
  })
  it('should be an instanceof AuthService', () => {
    expect(service).toBeInstanceOf(AuthService)
  })

  it('should register a new user', async () => {
    const signUp: Pure<SignUpWithEmailCredentialsDto> = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.me',
      password: 'Pa$$w0rd',
      isPrivacyPolicyAccepted: true
    }

    mockedUserService.create.mockResolvedValueOnce(
      createMock<UserEntity>(signUp)
    )
    const user = await service.register(signUp)

    expect(user).toHaveProperty('email', signUp.email)
    expect(user).toHaveProperty('firstName', signUp.firstName)
    expect(Object.getOwnPropertyNames(user)).not.toContain(['password'])
  })

  it('should log in an existing user', async () => {
    const email = 'john@doe.me'
    const password = 'Pa$$w0rd'

    mockedUserService.findOne.mockResolvedValueOnce(
      createMock<UserEntity>({
        email,
        checkPassword: jest.fn().mockResolvedValue(true)
      })
    )
    const user = await service.login(email, password)

    expect(user).toHaveProperty('email', email)
    expect(Object.getOwnPropertyNames(user)).not.toContain(['password'])
  })

  it('should throw on log in when the email not exist', async () => {
    const email = 'notfound@example.com'
    /* spell-checker:dictionaries lorem-ipsum */
    const password = 'laboris-tempor-amet'

    mockedUserService.findOne.mockRejectedValueOnce('NotFound')

    await expect(
      service.login(email, password)
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"There isn't any user with email: notfound@example.com"`
    )
  })

  it('should throw on log in when the email not exist', async () => {
    const email = 'john@doe.me'
    /* spell-checker:dictionaries lorem-ipsum */
    const password = 'Exercitation esse labore anim'

    mockedUserService.findOne.mockResolvedValueOnce(
      createMock<UserEntity>({
        email,
        checkPassword: jest.fn().mockResolvedValue(false)
      })
    )

    await expect(
      service.login(email, password)
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Wrong password for user with email: john@doe.me"`
    )
  })

  it('should verify the JWT payload', async () => {
    const payload: JwtPayload = {
      sub: 'john@doe.me',
      iat: 0,
      exp: 0
    }

    mockedUserService.findOne.mockResolvedValueOnce(
      createMock<UserEntity>({ email: payload.sub })
    )
    const user = await service.verifyPayload(payload)

    expect(user).toHaveProperty('email', payload.sub)
    expect(Object.getOwnPropertyNames(user)).not.toContain(['password'])
  })

  it("should throw on verify when JWT's subject not exist", async () => {
    const payload: JwtPayload = {
      sub: 'notregistered@example.com',
      iat: 0,
      exp: 0
    }

    mockedUserService.findOne.mockRejectedValueOnce('NotFound')

    await expect(
      service.verifyPayload(payload)
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"There isn't any user with email: notregistered@example.com"`
    )
  })

  it('should sign a new JWT', () => {
    const user = createMock<UserEntity>({ email: 'john@doe.me' })

    mockedJwtService.sign.mockReturnValueOnce('j.w.t')
    const { refresh_token, access_token } = service.signToken(user)

    expect(access_token).toEqual(expect.any(String))
    expect(refresh_token).toEqual(expect.any(String))
  })
})
