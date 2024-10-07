import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TournamentsPlayersService } from './tournaments-players.service';
import { CreateTournamentsPlayerDto } from './dto/create-tournaments-player.dto';
import { UpdateTournamentsPlayerDto } from './dto/update-tournaments-player.dto';

@Controller('tournaments-players')
export class TournamentsPlayersController {
  constructor(private readonly tournamentsPlayersService: TournamentsPlayersService) {}

  @Post()
  create(@Body() createTournamentsPlayerDto: CreateTournamentsPlayerDto) {
    return this.tournamentsPlayersService.create(createTournamentsPlayerDto);
  }

  @Get()
  findAll() {
    return this.tournamentsPlayersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tournamentsPlayersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTournamentsPlayerDto: UpdateTournamentsPlayerDto) {
    return this.tournamentsPlayersService.update(+id, updateTournamentsPlayerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tournamentsPlayersService.remove(+id);
  }
}
