import { Test, type TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import type { Repository } from 'typeorm'

import type { UserUpdate } from './dto/user-update.dto'
import { UserService } from './user.service'
import { UserEntity } from '../entities/user.entity'
import { NotFoundException } from '@nestjs/common'

type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>
}

describe('UserService', () => {
  let userService: UserService
  let mockedUserRepository: MockType<Repository<UserEntity>>

  const testUser = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@doe.me',
    password: 'Pa$$w0rd'
  }

  const userRepositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
    () => ({
      create: jest.fn(entity => entity),
      findOne: jest.fn(({ where }) => testUser),
      update: jest.fn(),
      save: jest.fn().mockImplementationOnce((entity) => {
        return Promise.resolve(testUser)
      }),
      findOneBy: jest.fn(),
      merge: jest.fn(),
    })
  )


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useFactory: userRepositoryMockFactory
        }
      ]
    }).compile()

    userService = module.get<UserService>(UserService)
    mockedUserRepository = module.get(getRepositoryToken(UserEntity))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be an instanceof UserService', () => {
    expect(userService).toBeInstanceOf(UserService)
  })

  it('should create a new user', async () => {
    mockedUserRepository.create.mockReturnValueOnce(testUser)
    const user = await userService.create(testUser)

    expect(user.id).toEqual(testUser.id)
  })

  it('should find one user', async () => {
    const email = 'john@doe.me'

    mockedUserRepository.findOne.mockImplementation(() => {
      return Promise.resolve(testUser)
    })

    const user = await userService.findOne({ where: { email } })

    expect(user).toBeDefined()
    expect(user).toHaveProperty('email', 'john@doe.me')
    expect(mockedUserRepository.findOne).toHaveBeenCalledTimes(1)
  })

  it('should throw on find one when the user not exist', async () => {
    mockedUserRepository.findOne.mockImplementationOnce(({ where }) => {
      return Promise.reject(
        new NotFoundException("\"There isn't any user with identifier: [object Object]\""))
    })

    await expect(
      userService.findOne({ where: { email: 'notexisting@example.com' } })
    ).rejects.toThrow(
      `"There isn't any user with identifier: [object Object]"`
    )
  })

  it('should update an user', async () => {
    const id = 1
    const updates: UserUpdate = {
      firstName: 'John',
      lastName: 'Doe'
    }

    mockedUserRepository.findOneBy.mockImplementation(({ id }) => {
      return Promise.resolve(testUser)
    })

    jest.spyOn(mockedUserRepository, 'merge').mockImplementationOnce((user, updates) => {
      return Promise.resolve({ testUser, ...updates })
    })

    const user = await userService.update(id, updates)

    expect(user).toBeDefined()
    expect(user).toHaveProperty('firstName', updates.firstName)
    expect(mockedUserRepository.merge).toHaveBeenCalled()
    expect(mockedUserRepository.merge).toHaveBeenCalledTimes(1)

  })

  it('should throw on update when the user not exist', async () => {
    const id = 1
    const updates: UserUpdate = {
      firstName: 'Jhonny',
      lastName: 'Doe'
    }

    mockedUserRepository.findOneBy.mockImplementationOnce(({ id }) => {
      return Promise.reject(new NotFoundException(`There isn't any user with id: ${id}`))
    })

    await expect(
      userService.update(id, updates)
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"There isn't any user with id: 1"`
    )
    expect(mockedUserRepository.findOneBy).toHaveBeenCalledWith({ id })
    expect(mockedUserRepository.findOneBy).toHaveBeenCalledTimes(1)
  })
})
