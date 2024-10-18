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

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'user_id', type: 'int' })
  userId: number

  @Column({ name: 'start_time' })
  bookingStartTime: Date

  @Column({ name: 'end_time' })
  bookingEndTime: Date

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
  User: User
}
