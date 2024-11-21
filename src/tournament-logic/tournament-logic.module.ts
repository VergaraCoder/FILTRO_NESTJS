import { Module } from '@nestjs/common';
import { TournamentLogicService } from './tournament-logic.service';
import { TournamentLogicController } from './tournament-logic.controller';
import { TournamentsPlayersModule } from 'src/tournaments-players/tournaments-players.module';

@Module({
  imports: [TournamentsPlayersModule],
  controllers: [TournamentLogicController],
  providers: [TournamentLogicService],
})
export class TournamentLogicModule {}
