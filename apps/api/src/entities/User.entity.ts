import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { UserInterface } from '@isomera/interfaces'

@Entity()
export class User implements UserInterface {
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
