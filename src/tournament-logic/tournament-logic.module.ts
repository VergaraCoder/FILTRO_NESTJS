import { Module } from '@nestjs/common';
import { TournamentLogicService } from './tournament-logic.service';
import { TournamentLogicController } from './tournament-logic.controller';

@Module({
  controllers: [TournamentLogicController],
  providers: [TournamentLogicService],
})
export class TournamentLogicModule {}
