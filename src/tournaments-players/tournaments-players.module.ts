import { Module } from '@nestjs/common';
import { TournamentsPlayersService } from './tournaments-players.service';
import { TournamentsPlayersController } from './tournaments-players.controller';

@Module({
  controllers: [TournamentsPlayersController],
  providers: [TournamentsPlayersService],
})
export class TournamentsPlayersModule {}
