import { Player } from "src/players/entities/player.entity";
import { TournamentsPlayer } from "src/tournaments-players/entities/tournaments-player.entity";
import { Winner } from "src/winners/entities/winner.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity("tournaments")
export class Tournament {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nameTournament:string;

    @Column()
    currentNumberPlayer:string;

    @Column()
    endDate:Date;

    @Column()
    moneyFinal:number;

    @OneToMany(()=>Winner,winners=>winners.tournament)
    winner:Winner[];

    @OneToMany(()=>TournamentsPlayer,tournamentPlayer=>tournamentPlayer.tournament,{eager:true})
    tournamentPlayer:TournamentsPlayer[];
}
