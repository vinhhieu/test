import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'auth/auth.module'
import { Reservation } from 'entities/reservation.entity'
import { ReservationController } from './reservation.controller'
import { ReservationService } from './reservation.service'
import { UserModule } from 'user/user.module'

@Module({
  imports: [TypeOrmModule.forFeature([Reservation]), AuthModule, UserModule],
  controllers: [ReservationController],
  providers: [ReservationService],
  exports: [ReservationService],
})
export class ReservationModule {}
