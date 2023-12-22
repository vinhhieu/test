import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { jwtConstants } from 'auth/constants'
import { UserService } from 'user/user.service'

interface AuthPayload {
  id: number | string
  email: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    })
  }
  async validate(payload: AuthPayload) {
    const { id } = payload
    return await this.userService.findOne(Number(id))
  }
}
