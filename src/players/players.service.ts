import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { Repository } from 'typeorm';
import { manageError } from 'src/common/errors/custom/manage.error';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  async create(createPlayerDto: CreatePlayerDto) {
    const dataPlayer = this.playerRepository.create(createPlayerDto);
    await this.playerRepository.save(dataPlayer);
    return dataPlayer;
  }

  async findAll() {
    try {
      const players = await this.playerRepository.find();
      if (!players) {
        throw new manageError({
          type: 'NOT_FOUND',
          message: 'DOES THERE ARE NOT REGISTERS YET',
        });
      }
      return players;
    } catch (err: any) {
      throw manageError.signedError(err.message);
    }
  }

  async findOne(id: number) {
    try {
      const player = await this.playerRepository.findOneBy({ id: id });
      if (!player) {
        throw new manageError({
          type: 'NOT_FOUND',
          message: 'THAT PLAYER NOT EXIST',
        });
      }
      return player;
    } catch (err: any) {
      throw manageError.signedError(err.message);
    }
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto) {
    try {
      const { affected } = await this.playerRepository.update(
        id,
        updatePlayerDto,
      );
      if (affected == 0) {
        throw new manageError({
          type: 'NOT_FOUND',
          message: 'FAILED TO UPDATE PLAYER',
        });
      }
      return 'player update';
    } catch (err: any) {
      throw manageError.signedError(err.message);
    }
  }

  async remove(id: number) {
    try {
      const { affected } = await this.playerRepository.delete(id);
      if (affected == 0) {
        throw new manageError({
          type: 'NOT_FOUND',
          message: 'FAILED TO DELETE PLAYER',
        });
      }
      return 'player delete';
    } catch (err: any) {
      throw manageError.signedError(err.message);
    }
  }
}
