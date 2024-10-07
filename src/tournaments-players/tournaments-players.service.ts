import { Injectable } from '@nestjs/common';
import { CreateTournamentsPlayerDto } from './dto/create-tournaments-player.dto';
import { UpdateTournamentsPlayerDto } from './dto/update-tournaments-player.dto';

@Injectable()
export class TournamentsPlayersService {
  create(createTournamentsPlayerDto: CreateTournamentsPlayerDto) {
    return 'This action adds a new tournamentsPlayer';
  }

  findAll() {
    return `This action returns all tournamentsPlayers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tournamentsPlayer`;
  }

  update(id: number, updateTournamentsPlayerDto: UpdateTournamentsPlayerDto) {
    return `This action updates a #${id} tournamentsPlayer`;
  }

  remove(id: number) {
    return `This action removes a #${id} tournamentsPlayer`;
  }
}
