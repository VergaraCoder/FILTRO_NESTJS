import { Player } from "src/players/entities/player.entity";
import { Tournament } from "src/tournaments/entities/tournament.entity";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class TournamentsPlayer {
    @PrimaryGeneratedColumn()
    id:Number;

    @Column()
    playerId:number;

    @Column()
    tournamentId:number;

    @ManyToOne(()=>Player,player=>player.tournamentPlayer)
    player:Player;

    @ManyToOne(()=>Tournament,tournament=>tournament.tournamentPlayer)
    tournament:Tournament;
}
