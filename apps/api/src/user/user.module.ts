import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ProfileController } from './profile.controller'
import { UserService } from './user.service'
import { IsUserAlreadyExist } from './is-user-already-exist.validator'
import { ProfileEntity } from '../entities/profile.entity'
import { UserEntity } from '../entities/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ProfileEntity])],
  controllers: [ProfileController],
  providers: [UserService, IsUserAlreadyExist],
  exports: [UserService]
})
export class UserModule {}
