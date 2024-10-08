import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTournamentDto {
  @ApiProperty({ example: 'codigo' })
  @IsNotEmpty()
  @IsString()
  nameTournament: string;

  @IsNotEmpty()
  @IsString()
  currentNumberPlayer: number;

  @IsNotEmpty()
  @IsString()
  TotalPlayers: number;

  @IsNotEmpty()
  @IsString()
  endDate: Date;

  @IsNotEmpty()
  @IsNumber()
  moneyFinal: number;
}
