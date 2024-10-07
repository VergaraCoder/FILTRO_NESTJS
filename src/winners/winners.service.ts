import { Injectable } from '@nestjs/common';
import { CreateWinnerDto } from './dto/create-winner.dto';
import { UpdateWinnerDto } from './dto/update-winner.dto';

@Injectable()
export class WinnersService {
  create(createWinnerDto: CreateWinnerDto) {
    return 'This action adds a new winner';
  }

  findAll() {
    return `This action returns all winners`;
  }

  findOne(id: number) {
    return `This action returns a #${id} winner`;
  }

  update(id: number, updateWinnerDto: UpdateWinnerDto) {
    return `This action updates a #${id} winner`;
  }

  remove(id: number) {
    return `This action removes a #${id} winner`;
  }
}
