import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, FindOneOptions } from 'typeorm'

import { UserUpdate } from './dto/user-update.dto'
import { UserEntity } from '../entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
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
}
