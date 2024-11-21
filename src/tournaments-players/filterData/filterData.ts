import { Inject, Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { operatorsSql } from 'src/common/operators/operators.sql';
import { manageError } from 'src/common/errors/custom/manage.error';
import { TournamentsPlayer } from '../entities/tournaments-player.entity';

@Injectable()
export class FilterDataTournamentService {
  async returnResults(
    repoTournament: Repository<TournamentsPlayer>,
    querys: any,
  ) {
    const creationBuilder =
      repoTournament.createQueryBuilder('tournamentsPlayer');
    return await this.FilterData(creationBuilder, querys);
  }

  private async FilterData(
    builder: SelectQueryBuilder<TournamentsPlayer>,
    querys: any,
  ) {
    try {
      console.log(querys.tournament);

      const keys = Object.keys(querys);
      querys.tournament !== undefined
        ? builder
            .innerJoinAndSelect('tournamentsPlayer.tournament', 'tournaments')
            .andWhere('tournaments.id=:tournament', {
              tournament: querys.tournament,
            })
        : null;

      for (const key of keys) {
        if (querys[key] !== undefined) {
          const resources = this.returnPropertiesAndOperator(key);

          if (resources !== undefined) {
            console.log(resources);
            builder.innerJoinAndSelect('tournamentsPlayer.player', 'players');
            builder.andWhere(`${resources[1]} ${resources[0]} ${querys[key]}`);
          }
        }
      }
      const result = await builder.getMany();

      return this.returnErrorIfNothing(result);
    } catch (err: any) {
      throw err;
    }
  }

  private returnPropertiesAndOperator(query: any) {
    const conincidentials = query.match(/_(gt|gte|lt|lte)$/);
    if (conincidentials) {
      console.log(conincidentials);

      const operator = operatorsSql[conincidentials[0]];
      const propertie = conincidentials.input.split('_')[0];
      return [operator, propertie];
    }
  }

  private returnErrorIfNothing(results: any) {
    try {
      if (results.length == 0) {
        throw new manageError({
          type: 'NOT_FOUND',
          message: 'THERE ARE NO RECORDS WITH THOSE FILTERS',
        });
      }
      return results;
    } catch (err: any) {
      throw manageError.signedError(err.message);
    }
  }
}
