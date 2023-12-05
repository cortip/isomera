import { Test, TestingModule } from '@nestjs/testing'
import { createMock } from 'ts-auto-mock'
import { ProfileController } from './profile.controller'
import { UserService } from './user.service'
import { UserEntity } from '../entities/user.entity'
import { InjectionToken } from '@nestjs/common'

jest.mock('../entities/user.entity')

describe('Profile Controller', () => {
  let profileController: ProfileController
  let mockedUserService: jest.Mocked<UserService>


  const testUserProfile = {
    firstName: 'John',
    lastName: 'Doe'
  }

  const testId = 1

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController]
    }).useMocker((token: InjectionToken) => {
      if (token === UserService) {
        return {
          findOne: jest.fn().mockImplementation(() => testUserProfile),
          update: jest.fn().mockImplementation((testId: number, args: {}) => { return { args } })
        }
      }
    })
      .compile()

    profileController = module.get<ProfileController>(ProfileController)
    mockedUserService = module.get<UserService, jest.Mocked<UserService>>(
      UserService
    )
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(profileController).toBeDefined()
  })

  it('should get a profile', async () => {
    const where = 1
    const result = await profileController.get(where)

    expect(result).toEqual(testUserProfile)
  })

  it('should update a profile', async () => {
    const updatesUser = {
      firstName: 'Jane',
      lastName: 'Doe'
    }
    const testUserId = 2
    const updateProfile = await profileController.update(testUserId, updatesUser)
    await expect(updateProfile).resolves.toBeDefined()
  })
})
