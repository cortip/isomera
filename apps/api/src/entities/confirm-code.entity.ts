import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { UserEntity } from './user.entity'

@Entity('confirmation-codes')
export class ConfirmCodeEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 7, comment: 'User code verification after registering' })
  code: string

  @CreateDateColumn()
  createdAt: Date

  @Column({ type: 'time', comment: 'Limit time to use this code' })
  expiresIn: Date

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity
}
