import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MoreThan, Repository } from 'typeorm'
import { generateRandomStringUtil } from '@isomera/utils'
import { ConfirmCodeEntity } from '../entities/confirm-code.entity'
import { UserEntity } from '../entities/user.entity'
import { DateTime } from 'luxon'

@Injectable()
export class ConfirmCodeService {
  constructor(
    @InjectRepository(ConfirmCodeEntity)
    private readonly confirmCodeRepository: Repository<ConfirmCodeEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  public async genNewCode(user: UserEntity): Promise<ConfirmCodeEntity> {
    await this.invalidateOlderCodes(user) // If there are other codes, we want to invalidate them

    const code = generateRandomStringUtil(7)
    const createCode = new ConfirmCodeEntity()

    createCode.code = code
    createCode.user = user
    createCode.expiresIn = DateTime.now().plus({ minute: 30 }).toJSDate()
    console.log('xxx createCode.expiresIn', createCode.expiresIn)
    await this.confirmCodeRepository.save(createCode)

    return createCode
  }

  public async verifyCode(code: string, email: string) {
    const user = await this.userRepository.findOne({ where: { email } })

    const codeExists = await this.confirmCodeRepository
      .createQueryBuilder()
      .where({
        code: code,
        expiresIn: MoreThan(DateTime.now().toFormat('yyyy-MM-dd HH:MM:ss'))
      })
      .andWhere('"userId" = :userId', { userId: user.id })
      .limit(1)
      .execute()

    if (typeof codeExists[0] !== 'undefined') {
      user.active = true
      await this.userRepository.save(user)

      return user
    }
    throw new HttpException('Code not found', HttpStatus.FORBIDDEN)
  }

  private async invalidateOlderCodes(user: UserEntity) {
    await this.confirmCodeRepository
      .createQueryBuilder()
      .update(ConfirmCodeEntity)
      .set({ expiresIn: new Date() })
      .where('userId = :userId', { userId: user.id })
      .execute()
  }
}
