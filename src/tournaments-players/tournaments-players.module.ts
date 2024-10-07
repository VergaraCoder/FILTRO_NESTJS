import { Module } from '@nestjs/common';
import { TournamentsPlayersService } from './tournaments-players.service';
import { TournamentsPlayersController } from './tournaments-players.controller';
import { PlayersModule } from 'src/players/players.module';
import { TournamentsModule } from 'src/tournaments/tournaments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournamentsPlayer } from './entities/tournaments-player.entity';
import { FilterDataTournamentService } from './filterData/filterData';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      TournamentsPlayer
    ]),
    PlayersModule,
    TournamentsModule
  ],
  controllers: [TournamentsPlayersController],
  providers: [
    TournamentsPlayersService,
    FilterDataTournamentService
  ],
  exports:[TypeOrmModule]
})
export class TournamentsPlayersModule {}
