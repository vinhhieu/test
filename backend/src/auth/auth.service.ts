import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { User } from 'entities/user.entity'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async comparePassword(password: string, storePasswordHash: string): Promise<boolean> {
    return await bcrypt.compare(password, storePasswordHash)
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email)
    if (!user) return null
    const loginCheck = await this.comparePassword(pass, user.password)
    if (!loginCheck) {
      return null
    }
    delete user.password
    return user
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12)
  }

  async login(user: User) {
    const payload = { id: user.id, email: user.email }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
