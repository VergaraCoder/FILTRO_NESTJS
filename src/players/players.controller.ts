import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Auth } from 'src/common/decorators/custom/auth.decorator';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }

  @Get()
  @Auth('admin', 'client')
  findAll() {
    return this.playersService.findAll();
  }

  @Get(':id')
  @Auth('admin', 'client')
  findOne(@Param('id') id: string) {
    return this.playersService.findOne(+id);
  }

  @Patch(':id')
  @Auth('admin', 'client')
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playersService.update(+id, updatePlayerDto);
  }

  @Delete(':id')
  @Auth('admin')
  remove(@Param('id') id: string) {
    return this.playersService.remove(+id);
  }
}
