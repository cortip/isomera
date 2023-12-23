import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { OrganizationEntity } from '../entities/organization.entity'
import { UserOrganizationEntity } from '../entities/user-organization.entity'
import { UserOrganizationRoleEnum } from '@isomera/interfaces'

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(OrganizationEntity)
    private readonly organizationRepository: Repository<OrganizationEntity>,

    @InjectRepository(UserOrganizationEntity)
    private readonly userOrganizationRepository: Repository<UserOrganizationEntity>
  ) {}

  async create(data: Partial<OrganizationEntity>): Promise<OrganizationEntity> {
    const organization = this.organizationRepository.create(data)

    return this.organizationRepository.save(organization)
  }

  async createDefaultOrganization(userId: number): Promise<OrganizationEntity> {
    const organization = await this.create({
      name: OrganizationEntity.DEFAULT_ORGANIZATION_NAME
    })

    const user = this.userOrganizationRepository.create({
      organizationId: organization.id,
      userId: userId,
      role: UserOrganizationRoleEnum.OWNER
    })

    await this.userOrganizationRepository.save(user)

    return organization
  }
}
