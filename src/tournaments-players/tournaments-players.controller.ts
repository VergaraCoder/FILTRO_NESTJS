import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TournamentsPlayersService } from './tournaments-players.service';
import { CreateTournamentsPlayerDto } from './dto/create-tournaments-player.dto';
import { UpdateTournamentsPlayerDto } from './dto/update-tournaments-player.dto';

@Controller('tournaments-players')
export class TournamentsPlayersController {
  constructor(
    private readonly tournamentsPlayersService: TournamentsPlayersService,
  ) {}

  @Post()
  create(@Body() createTournamentsPlayerDto: CreateTournamentsPlayerDto) {
    return this.tournamentsPlayersService.create(createTournamentsPlayerDto);
  }

  @Get()
  findAll(
    @Query('idTournament') tournament: number,
    @Query('score') score: number,
    @Query('score_gt') score_gt: number,
    @Query('score_gte') score_gte: number,
    @Query('score_lt') score_lt: number,
    @Query('score_lte') score_lte: number,
  ) {
    console.log('entramos');
    console.log(score_lte);

    return this.tournamentsPlayersService.findAll({
      tournament: tournament,
      score: score,
      score_gt: score_gt,
      score_gte: score_gte,
      score_lt: score_lt,
      score_lte: score_lte,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tournamentsPlayersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTournamentsPlayerDto: UpdateTournamentsPlayerDto,
  ) {
    return this.tournamentsPlayersService.update(
      +id,
      updateTournamentsPlayerDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tournamentsPlayersService.remove(+id);
  }
}
