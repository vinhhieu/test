import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User } from './user.entity'

@Entity('videos')
export class Video {
  @PrimaryGeneratedColumn()
  id: number

  @Column('longtext')
  url: string

  @Column({ name: 'user_id', type: 'int' })
  userId: number

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'user_id',
  })
  user: User
}
