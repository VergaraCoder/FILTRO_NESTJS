import { PartialType } from '@nestjs/mapped-types';
import { CreateTournamentLogicDto } from './create-tournament-logic.dto';

export class UpdateTournamentLogicDto extends PartialType(CreateTournamentLogicDto) {}
