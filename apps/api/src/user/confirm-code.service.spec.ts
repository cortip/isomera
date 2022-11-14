import { Test, type TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createMock } from 'ts-auto-mock';
import type { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { ConfirmCodeService } from './confirm-code.service';
import { ConfirmCode } from './entities/confirm-code.entity';

describe('ConfirmCodeService', () => {
  let service: ConfirmCodeService;
  let mockedConfirmCodeRepository: jest.Mocked<Repository<ConfirmCode>>;
  let mockedUserRepository: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfirmCodeService],
    })
      .useMocker((token) => {
        if (Object.is(token, getRepositoryToken(User))) {
          return createMock<Repository<User>>();
        }
        if (Object.is(token, getRepositoryToken(ConfirmCode))) {
          return createMock<Repository<ConfirmCode>>();
        }
      })
      .compile();

    service = module.get<ConfirmCodeService>(ConfirmCodeService);
    mockedUserRepository = module.get(getRepositoryToken(User));
    mockedConfirmCodeRepository = module.get(getRepositoryToken(ConfirmCode));
  });

  it('should be an instanceof ConfirmCodeService', () => {
    expect(service).toBeInstanceOf(ConfirmCodeService);
  });
});
