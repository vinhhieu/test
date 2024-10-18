import { Controller, Get, Post, Put, Body, Param, HttpException, HttpStatus } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from 'entities/user.entity'
import { AuthService } from 'auth/auth.service'

@Controller('user')
export class UserController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll()
  }

  @Get(':id')
  get(@Param() params) {
    return this.userService.findOne(params.id)
  }

  @Post()
  async create(@Body() user: User) {
    const check = await this.validate(user.email)
    if (!check) {
      throw new HttpException({ message: 'User already exists' }, HttpStatus.BAD_REQUEST)
    }
    user.password = await this.authService.hashPassword(user.password)
    const result = await this.userService.create(user)
    delete result.password
    return result
  }

  @Put()
  update(@Body() user: User) {
    return this.userService.update(user)
  }

  async validate(email: string) {
    try {
      const user = await this.userService.findByEmail(email)
      return !user ? true : false
    } catch (e) {
      return false
    }
  }
}
