import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm/dist'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { config } from './ormConfig'
@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...config,
      autoLoadEntities: true,
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
