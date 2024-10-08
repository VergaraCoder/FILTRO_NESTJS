import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateWinnerDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    playerId:number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    tournamentId:number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    moneyEarned:number;
}
