import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { UserInterface } from '@isomera/interfaces'

@Entity({ name: 'users' })
export class UserEntity implements UserInterface {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  firstName: string

  @Column({ nullable: true })
  lastName: string

  @Column()
  email: string

  @Column({ nullable: true })
  password: string
}
