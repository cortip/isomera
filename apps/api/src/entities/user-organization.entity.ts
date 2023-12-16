import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'
import { UserOrganizationInterace } from '@isomera/interfaces'

@Entity({ name: 'user-organization' })
export class UserOrganizationEntity implements UserOrganizationInterace {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  userId: number

  @Column({ nullable: false })
  organizationId: number

  @Column({ nullable: false })
  role: number

  @CreateDateColumn()
  createdAt: Date
}
