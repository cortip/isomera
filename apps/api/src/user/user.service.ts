import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, FindOneOptions } from 'typeorm'

import { UserUpdate } from './dto/user-update.dto'
import { UserEntity } from '../entities/user.entity'
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult'
import { ConfigService } from '@nestjs/config'
import moment from 'moment'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService
  ) {}

  async create(data: Partial<UserEntity>): Promise<UserEntity> {
    const user = this.userRepository.create(data)

    return this.userRepository.save(user)
  }

  async findOne(where: FindOneOptions<UserEntity>): Promise<UserEntity> {
    const user = await this.userRepository.findOne(where)

    if (!user) {
      throw new NotFoundException(
        `There isn't any user with identifier: ${where}`
      )
    }

    return user
  }

  async update(id: number, updates: UserUpdate): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id })

    if (!user) {
      throw new NotFoundException(`There isn't any user with id: ${id}`)
    }

    this.userRepository.merge(user, updates)

    return this.userRepository.save(user)
  }

  async setPasswordResetCode(
    id: number,
    passwordResetCode: string
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id })

    if (!user) {
      throw new NotFoundException(`There isn't any user with id: ${id}`)
    }

    const resetPasswordPeriod = this.configService.get<number>(
      'RESET_PASSWORD_PERIOD'
    )
    const expiredTime = moment()
      .clone()
      .add(resetPasswordPeriod, 'minutes')
      .format('YYYY-MM-DD HH:mm:ss')

    user.passwordResetCode = passwordResetCode
    user.passwordResetExpiredTime = expiredTime
    return this.userRepository.save(user)
  }

  async setNewPassword(id: number, password: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id })

    if (!user) {
      throw new NotFoundException(`There isn't any user with id: ${id}`)
    }

    user.password = password
    user.passwordResetCode = null
    user.passwordResetExpiredTime = null

    return this.userRepository.save(user)
  }

  async storeRefreshToken(
    user: UserEntity,
    token: string
  ): Promise<UserEntity> {
    user.refreshToken = token
    return this.userRepository.save(user)
  }
}
