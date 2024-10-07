import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './jwt/strategy/local.strategy';
import { LocalGuard } from './jwt/guards/local.guard';
import { JwtGuard } from './jwt/guards/jwt.guard';
import { RoleGuard } from './jwt/role.guard';

@Module({
  imports:[
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:async(configService:ConfigService)=>({
        secret:configService.get<string>("JWT_SECRET")
      })
    })
  ],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    LocalGuard,
    JwtGuard,
    AuthService,
    RoleGuard
  ],
  exports:[
    JwtGuard,
  ]
})
export class AuthModule {}
