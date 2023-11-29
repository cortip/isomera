import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn
} from 'typeorm'

import { UserEntity } from './user.entity'

@Entity('profiles')
export class ProfileEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  phone: string

  @Column('date')
  birthday: Date

  @Column()
  website: string

  @Column()
  occupation: string

  @OneToOne(type => UserEntity)
  @JoinColumn()
  user: UserEntity
}
