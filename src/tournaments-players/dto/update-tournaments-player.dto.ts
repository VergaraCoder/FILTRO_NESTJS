import { PartialType } from '@nestjs/mapped-types';
import { CreateTournamentsPlayerDto } from './create-tournaments-player.dto';

export class UpdateTournamentsPlayerDto extends PartialType(CreateTournamentsPlayerDto) {}
