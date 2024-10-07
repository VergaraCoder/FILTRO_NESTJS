import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { TournamentsModule } from './tournaments/tournaments.module';
import { TournamentsPlayersModule } from './tournaments-players/tournaments-players.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { UsersModule } from './users/users.module';
import { RoleModule } from './role/role.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmCredentials } from './common/database/dbconfig/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:".env"
    }),

    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useClass:TypeOrmCredentials
    }),
    PlayersModule, TournamentsModule, TournamentsPlayersModule, AuthModule, CommonModule, UsersModule, RoleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
