import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { UserInterface } from '@isomera/interfaces'
import bcrypt from 'bcryptjs'

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

  @Column({ nullable: true })
  accessToken: string

  @Column({ nullable: true })
  refreshToken: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column({ type: 'boolean', default: false })
  active: boolean

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    const salt = await bcrypt.genSalt()
    if (!/^\$2[abxy]?\$\d+\$/.test(this.password)) {
      this.password = await bcrypt.hash(this.password, salt)
    }
  }

  async checkPassword(plainPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, this.password)
  }
}
