import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class ConfirmCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 7, comment: 'User code verification after registering' })
  code: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'time', comment: 'Limit time to use this code' })
  expiresIn: Date;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;
}
