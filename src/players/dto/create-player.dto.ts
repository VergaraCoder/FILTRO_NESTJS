import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlayerDto {
  @IsNotEmpty()
  @IsString()
  namePlayer: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsNumber()
  winners: number;
}
