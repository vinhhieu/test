import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module'
import { User } from 'entities/user.entity'
import { AuthService } from 'auth/auth.service'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService, UserService, JwtService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
