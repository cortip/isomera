import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { OrganizationInterface } from '@isomera/interfaces'

@Entity({ name: 'organizations' })
export class OrganizationEntity implements OrganizationInterface {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  name: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  static DEFAULT_ORGANIZATION_NAME =  'Isomera personal user'
}
