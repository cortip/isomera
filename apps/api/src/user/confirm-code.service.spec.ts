import { Test, type TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { createMock } from '@golevelup/ts-jest'
import type { Repository } from 'typeorm'

import { ConfirmCodeService } from './confirm-code.service'
import { ConfirmCodeEntity } from '../entities/confirm-code.entity'
import { UserEntity } from '../entities/user.entity'

describe('ConfirmCodeService', () => {
  let service: ConfirmCodeService
  // let mockedConfirmCodeRepository: jest.Mocked<Repository<ConfirmCode>>;
  // let mockedUserRepository: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfirmCodeService]
    })
      .useMocker(token => {
        if (Object.is(token, getRepositoryToken(UserEntity))) {
          return createMock<Repository<UserEntity>>()
        }
        if (Object.is(token, getRepositoryToken(ConfirmCodeEntity))) {
          return createMock<Repository<ConfirmCodeEntity>>()
        }
      })
      .compile()

    service = module.get<ConfirmCodeService>(ConfirmCodeService)
    // mockedUserRepository = module.get(getRepositoryToken(User));
    // mockedConfirmCodeRepository = module.get(getRepositoryToken(ConfirmCode));
  })

  it('should be an instanceof ConfirmCodeService', () => {
    expect(service).toBeInstanceOf(ConfirmCodeService)
  })
})
