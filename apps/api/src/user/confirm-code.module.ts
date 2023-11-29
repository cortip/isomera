import { Module } from '@nestjs/common'
import { ConfirmCodeService } from './confirm-code.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfirmCodeEntity } from '../entities/confirm-code.entity'
import { UserEntity } from '../entities/user.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ConfirmCodeEntity]),
    ConfirmCodeEntity
  ],
  controllers: [],
  providers: [ConfirmCodeService],
  exports: [ConfirmCodeService]
})
export class ConfirmCodeModule {}
