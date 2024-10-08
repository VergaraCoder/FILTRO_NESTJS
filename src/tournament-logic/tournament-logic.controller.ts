import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TournamentLogicService } from './tournament-logic.service';
import { CreateTournamentLogicDto } from './dto/create-tournament-logic.dto';
import { UpdateTournamentLogicDto } from './dto/update-tournament-logic.dto';

@Controller('tournament-logic')
export class TournamentLogicController {
  constructor(
    private readonly tournamentLogicService: TournamentLogicService,
  ) {}

  @Post()
  create(@Body() createTournamentLogicDto: any) {
    return this.tournamentLogicService.createClashes(
      createTournamentLogicDto.id,
    );
  }

  @Get()
  findAll() {
    return this.tournamentLogicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tournamentLogicService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTournamentLogicDto: UpdateTournamentLogicDto,
  ) {
    return this.tournamentLogicService.update(+id, updateTournamentLogicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tournamentLogicService.remove(+id);
  }
}
