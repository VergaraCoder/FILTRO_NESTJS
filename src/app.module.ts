import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { TournamentsModule } from './tournaments/tournaments.module';
import { TournamentsPlayersModule } from './tournaments-players/tournaments-players.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [PlayersModule, TournamentsModule, TournamentsPlayersModule, AuthModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
