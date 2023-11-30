import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'
import { Repository } from 'typeorm'
import { UserEntity } from '../entities/user.entity'

@ValidatorConstraint({ name: 'isUserAlreadyExist', async: true })
@Injectable()
export class IsUserAlreadyExist implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async validate(email: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ email })

    return user === null || user === undefined
  }

  defaultMessage(): string {
    return 'The email «$value» is already register.'
  }
}
