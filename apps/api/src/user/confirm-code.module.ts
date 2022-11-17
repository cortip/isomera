import { Module } from '@nestjs/common';
import { ConfirmCodeService } from './confirm-code.service';
import { ConfirmCode } from './entities/confirm-code.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, ConfirmCode]), ConfirmCode],
  controllers: [],
  providers: [ConfirmCodeService],
  exports: [ConfirmCodeService],
})
export class ConfirmCodeModule {}
