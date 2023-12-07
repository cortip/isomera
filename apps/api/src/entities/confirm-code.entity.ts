import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { UserEntity } from './user.entity'
import { ConfirmationCodeInterface } from '@isomera/interfaces'

@Entity('confirmation-codes')
export class ConfirmCodeEntity implements ConfirmationCodeInterface {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 7, comment: 'User code verification after registering' })
  code: string

  @CreateDateColumn()
  createdAt: Date

  @Column({ type: 'timestamp', comment: 'Limit time to use this code' })
  expiresIn: Date

  @ManyToOne(() => UserEntity, user => user.id)
  user: UserEntity
}
