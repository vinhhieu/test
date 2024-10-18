import { Body, Controller, Get, HttpException, HttpStatus, Post, Query } from '@nestjs/common'
import { ReservationService } from './reservation.service'
import { UserService } from 'user/user.service'

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService, private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: { userId: number; bookTime: string }) {
    const user = await this.userService.findOne(body.userId)

    if (!user) {
      throw new HttpException({ message: 'User not found' }, HttpStatus.BAD_REQUEST)
    }
    const bookTime = new Date(body.bookTime)
    return this.reservationService.create(body.userId, bookTime)
  }

  @Get()
  async findAll(@Query('page') page: string, @Query('limit') limit: string) {
    const pageNum = parseInt(page) || 1
    const limitNum = parseInt(limit) || 10

    return this.reservationService.findAll(pageNum, limitNum)
  }
}
