import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ConfirmCode } from './entities/confirm-code.entity';
import { randomString } from '@isomera/utils';

@Injectable()
export class ConfirmCodeService {
  constructor(
    @InjectRepository(ConfirmCode)
    private readonly confirmCodeRepository: Repository<ConfirmCode>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  public async genNewCode(user: User): Promise<ConfirmCode> {
    await this.invalidateOlderCodes(user); // If there are other codes, we want to invalidate them

    const code = randomString(7);
    return this.confirmCodeRepository.create({
      code,
      user: user,
      expiresIn: new Date(new Date().getTime() + 1000 * 60 * 30), // Half hour
    });
  }

  private async invalidateOlderCodes(user: User) {
    await this.confirmCodeRepository
      .createQueryBuilder()
      .update(ConfirmCode)
      .set({ expiresIn: new Date() })
      .where('userId = :userId', { userId: user.id })
      .execute();
  }
}
