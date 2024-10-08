import { Injectable } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { Repository } from 'typeorm';
import { manageError } from 'src/common/errors/custom/manage.error';
import { TournamentsPlayersService } from 'src/tournaments-players/tournaments-players.service';

@Injectable()
export class TournamentsService {
  constructor(
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,
    private tourPlayerService: TournamentsPlayersService,
  ) {}

  async create(createTournamentDto: any) {
    const dataTournament =
      this.tournamentRepository.create(createTournamentDto);
    await this.tournamentRepository.save(dataTournament);
    return dataTournament;
  }

  async findAll(querys?: any) {
    try {
      const tournaments = await this.tournamentRepository.find();
      if (tournaments.length == 0) {
        throw new manageError({
          type: 'NOT_FOUND',
          message: 'DOES THERE ARE NOT REGISTERS',
        });
      }
      return tournaments;
    } catch (err: any) {
      throw manageError.signedError(err.message);
    }
  }

  async findOne(id: number) {
    try {
      const tournament = await this.tournamentRepository.findOneBy({ id: id });
      if (!tournament) {
        throw new manageError({
          type: 'NOT_FOUND',
          message: 'THAT TOURNAMENT NOT EXIST',
        });
      }
      return tournament;
    } catch (err: any) {
      throw manageError.signedError(err.message);
    }
  }

  async update(id: number, updateTournamentDto: any) {
    try {
      const { affected } = await this.tournamentRepository.update(
        id,
        updateTournamentDto,
      );
      if (affected == 0) {
        throw new manageError({
          type: 'NOT_FOUND',
          message:
            'THE TOURNAMENT COULD NOT BE UPDATED BECAUSE IT DOES NOT EXIST.',
        });
      }
      return 'perfect update';
    } catch (err: any) {
      throw manageError.signedError(err.message);
    }
  }

  async remove(id: number) {
    try {
      const { affected } = await this.tournamentRepository.delete(id);
      if (affected == 0) {
        throw new manageError({
          type: 'NOT_FOUND',
          message:
            'THE TOURNAMENT COULD NOT BE DELETED BECAUSE IT DOES NOT EXIST.',
        });
      }
      return 'perfect delete';
    } catch (err: any) {
      throw manageError.signedError(err.message);
    }
  }

  async returnAllPlayerOfTournament(idTournament: number) {
    try {
      const data =
        await this.tourPlayerService.returnPlayersOfTournament(idTournament);
      return data;
    } catch (err: any) {
      throw err;
    }
  }

  async createPlayersOfTournament(data: any) {
    // const
  }
}
