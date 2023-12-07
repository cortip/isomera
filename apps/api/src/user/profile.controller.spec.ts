import { Test, TestingModule } from '@nestjs/testing'
import { ProfileController } from './profile.controller'
import { UserService } from './user.service'
import { InjectionToken } from '@nestjs/common'

jest.mock('../entities/user.entity')

describe('Profile Controller', () => {
  let profileController: ProfileController

  const testUserProfile = {
    firstName: 'John',
    lastName: 'Doe'
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController]
    })
      .useMocker((token: InjectionToken) => {
        if (token === UserService) {
          return {
            findOne: jest.fn().mockImplementation(() => testUserProfile),
            update: jest.fn().mockImplementation((testId: number, args) => {
              return { args }
            })
          }
        }
      })
      .compile()

    profileController = module.get<ProfileController>(ProfileController)
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
    const updateProfile = await profileController.update(
      testUserId,
      updatesUser
    )
    expect(updateProfile).toBeDefined()
  })
})
