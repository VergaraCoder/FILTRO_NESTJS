import { Injectable } from '@nestjs/common';
import { CreateTournamentsPlayerDto } from './dto/create-tournaments-player.dto';
import { UpdateTournamentsPlayerDto } from './dto/update-tournaments-player.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TournamentsPlayer } from './entities/tournaments-player.entity';
import { Repository } from 'typeorm';
import { manageError } from 'src/common/errors/custom/manage.error';
import { FilterDataTournamentService } from './filterData/filterData';

@Injectable()
export class TournamentsPlayersService {
  constructor(
    @InjectRepository(TournamentsPlayer)
    private tournamentPlayerRepository: Repository<TournamentsPlayer>,
    private filterDataTournamentPlayer: FilterDataTournamentService,
  ) {}

  async create(createTournamentsPlayerDto: CreateTournamentsPlayerDto) {
    const dataToCreate = this.tournamentPlayerRepository.create(
      createTournamentsPlayerDto,
    );
    await this.tournamentPlayerRepository.save(dataToCreate);
    return dataToCreate;
  }

  async findAll(querys?: any) {
    try {
      console.log(Object.values(querys).every((item) => item == undefined));

      if (!Object.values(querys).every((item) => item == undefined)) {
        console.log('enter');

        return await this.filterDataTournamentPlayer.returnResults(
          this.tournamentPlayerRepository,
          querys,
        );
      }

      const playersOfTournament = await this.tournamentPlayerRepository.find();
      if (playersOfTournament.length == 0) {
        throw new manageError({
          type: 'NOT_FOUND',
          message: 'DOES NOT EXIST REGISTERS',
        });
      }

      return playersOfTournament;
    } catch (err: any) {
      throw manageError.signedError(err.message);
    }
  }

  async findOne(id: number) {
    try {
      const playerOfTournament =
        await this.tournamentPlayerRepository.findOneBy({ id: id });
      if (!playerOfTournament) {
        throw new manageError({
          type: 'NOT_FOUND',
          message: 'THAT PLAYER NOT EXIST',
        });
      }
      return playerOfTournament;
    } catch (err: any) {
      throw manageError.signedError(err.message);
    }
  }

  async update(
    id: number,
    updateTournamentsPlayerDto: UpdateTournamentsPlayerDto,
  ) {
    try {
      const { affected } = await this.tournamentPlayerRepository.update(
        id,
        updateTournamentsPlayerDto,
      );
      if (affected == 0) {
        throw new manageError({
          type: 'NOT_FOUND',
          message: 'FAILED TO UPDATE',
        });
      }
      return 'PERFECT UPDATE';
    } catch (err: any) {
      throw manageError.signedError(err.message);
    }
  }

  async remove(id: number) {
    try {
      const { affected } = await this.tournamentPlayerRepository.delete(id);
      if (affected == 0) {
        throw new manageError({
          type: 'NOT_FOUND',
          message: 'FAILED TO DELETED',
        });
      }
      return 'PERFECT DELETED';
    } catch (err: any) {
      throw manageError.signedError(err.message);
    }
  }

  async returnPlayersOfTournament(idTournament: number) {
    try {
      const data = await this.tournamentPlayerRepository.find({
        where: { tournamentId: idTournament },
      });
      if (data.length == 0) {
        throw new manageError({
          type: 'NOT_FOUND',
          message: 'THERE ARE NO PLAYERS',
        });
      }
      return data;
    } catch (err: any) {
      throw manageError.signedError(err.message);
    }
  }
}
