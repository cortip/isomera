import { Test, type TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { createMock } from '@golevelup/ts-jest'
import type { Repository } from 'typeorm'

import type { UserUpdate } from './dto/user-update.dto'
import { UserService } from './user.service'
import { UserEntity } from '../entities/user.entity'

describe('UserService', () => {
  let service: UserService
  let mockedUserRepository: jest.Mocked<Repository<UserEntity>>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService]
    })
      .useMocker(token => {
        if (Object.is(token, getRepositoryToken(UserEntity))) {
          return createMock<Repository<UserEntity>>()
        }
      })
      .compile()

    service = module.get<UserService>(UserService)
    mockedUserRepository = module.get(getRepositoryToken(UserEntity))
  })

  it('should be an instanceof UserService', () => {
    expect(service).toBeInstanceOf(UserService)
  })

  it('should create a new user', async () => {
    const data = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.me',
      password: 'Pa$$w0rd'
    }

    mockedUserRepository.save.mockResolvedValueOnce(
      createMock<UserEntity>(data)
    )
    const user = await service.create(data)

    expect(user).toBeDefined()
  })

  it('should find one user', async () => {
    const email = 'john@doe.me'

    mockedUserRepository.findOne.mockResolvedValueOnce(
      createMock<UserEntity>({ email })
    )
    const user = await service.findOne({ where: { email } })

    expect(user).toBeDefined()
    expect(user).toHaveProperty('email', 'john@doe.me')
  })

  it('should throw on find one when the user not exist', async () => {
    mockedUserRepository.findOne.mockResolvedValueOnce(undefined)

    await expect(
      service.findOne({ where: { email: 'notexisting@example.com' } })
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"There isn't any user with identifier: [object Object]"`
    )
  })

  it('should update an user', async () => {
    const id = 1
    const updates: UserUpdate = {
      firstName: 'Jhonny',
      lastName: 'Doe'
    }

    mockedUserRepository.save.mockResolvedValueOnce(
      createMock<UserEntity>(updates)
    )
    const user = await service.update(id, updates)

    expect(user).toBeDefined()
    expect(user).toHaveProperty('firstName', updates.firstName)
  })

  it('should throw on update when the user not exist', async () => {
    const id = 0
    const updates: UserUpdate = {
      firstName: 'Jhonny',
      lastName: 'Doe'
    }
    mockedUserRepository.findOneBy.mockResolvedValueOnce(undefined)

    await expect(
      service.update(id, updates)
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"There isn't any user with id: 0"`
    )
  })
})
