import { Module } from '@nestjs/common';
import { WinnersService } from './winners.service';
import { WinnersController } from './winners.controller';
import { PlayersModule } from 'src/players/players.module';
import { TournamentsModule } from 'src/tournaments/tournaments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Winner } from './entities/winner.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Winner
    ]),
    PlayersModule,
    TournamentsModule
  ],
  controllers: [WinnersController],
  providers: [WinnersService],
  exports:[
    TypeOrmModule
  ]
})
export class WinnersModule {}
