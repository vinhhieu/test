import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local.guard'
import { AuthenticationGuard } from './guards/auth.guard'
import { UserService } from 'user/user.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService, private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() request): Promise<any> {
    return this.authService.login(request.user)
  }

  @UseGuards(AuthenticationGuard)
  @Get('profile')
  getProfile(@Request() request) {
    return request.user
  }
}
