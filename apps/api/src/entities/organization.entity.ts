import { OrganizationInterface } from '@isomera/interfaces'
import { PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm'

import { UserEntity } from './user.entity'

export class OrganizationEntity implements OrganizationInterface {
  @PrimaryGeneratedColumn('increment')
  id: number

  @ManyToOne(() => UserEntity, user => user.id)
  @JoinColumn()
  user: UserEntity
}
