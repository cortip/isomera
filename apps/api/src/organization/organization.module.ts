import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrganizationService } from './organization.service'
import { OrganizationEntity } from '../entities/organization.entity'
import { UserOrganizationEntity } from '../entities/user-organization.entity'

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationEntity, UserOrganizationEntity]), OrganizationEntity, UserOrganizationEntity],
  providers: [OrganizationService],
  exports: [OrganizationService]
})
export class OrganizationModule {}
