import { Injectable } from '@nestjs/common';
import { CreateTournamentLogicDto } from './dto/create-tournament-logic.dto';
import { UpdateTournamentLogicDto } from './dto/update-tournament-logic.dto';

@Injectable()
export class TournamentLogicService {
  create(createTournamentLogicDto: CreateTournamentLogicDto) {
    return 'This action adds a new tournamentLogic';
  }

  findAll() {
    return `This action returns all tournamentLogic`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tournamentLogic`;
  }

  update(id: number, updateTournamentLogicDto: UpdateTournamentLogicDto) {
    return `This action updates a #${id} tournamentLogic`;
  }

  remove(id: number) {
    return `This action removes a #${id} tournamentLogic`;
  }
}
