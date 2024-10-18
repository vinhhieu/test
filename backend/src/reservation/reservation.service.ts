import { Injectable, ConflictException, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Between, Repository } from 'typeorm'
import { Reservation } from 'entities/reservation.entity'

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  async create(userId: number, startTime: Date): Promise<Reservation> {
    const openTime = new Date(startTime)
    openTime.setHours(19)

    const closeTime = new Date(startTime)
    closeTime.setHours(24)

    if (startTime < openTime || startTime >= closeTime) {
      throw new HttpException({ message: 'Reservation is not available now' }, HttpStatus.BAD_REQUEST)
    }

    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000)
    const overlapping = await this.reservationRepository.find({
      where: {
        bookingStartTime: Between(startTime, endTime),
      },
    })

    if (overlapping.length >= 5) {
      throw new HttpException({ message: 'No available tables at this time' }, HttpStatus.BAD_REQUEST)
    }

    return this.reservationRepository.save({
      userId,
      bookingStartTime: startTime,
      bookingEndTime: endTime,
    })
  }

  async findAll(page = 1, limit = 10): Promise<{ data: Reservation[]; total: number }> {
    const [results, total] = await this.reservationRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    })

    return {
      data: results,
      total,
    }
  }
}
