import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MoreThan, Repository } from 'typeorm';
import { ConfirmCode } from './entities/confirm-code.entity';
import { randomString } from '@isomera/utils';
import { format } from 'date-fns';

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
    const createCode = new ConfirmCode();

    createCode.code = code;
    createCode.user = user;
    createCode.expiresIn = new Date(new Date().getTime() + 1000 * 60 * 30); // Half hour

    await this.confirmCodeRepository.save(createCode);

    return createCode;
  }

  public async verifyCode(code: string, email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    const codeExists = await this.confirmCodeRepository
      .createQueryBuilder()
      .where({
        code: code,
        expiresIn: MoreThan(format(new Date(), 'yyyy-MM-dd HH:MM:ss')),
      })
      .andWhere('"userId" = :userId', { userId: user.id })
      .limit(1)
      .execute();

    if (typeof codeExists[0] !== 'undefined') {
      user.active = true;
      await this.userRepository.save(user);

      return user;
    }
    throw new HttpException('Code not found', HttpStatus.FORBIDDEN);
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
