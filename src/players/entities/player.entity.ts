import { Tournament } from "src/tournaments/entities/tournament.entity";
import { Winner } from "src/winners/entities/winner.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("players")
export class Player {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    namePlayer:string;

    @Column()
    age:number;

    @Column()
    winners:number;

    @ManyToMany(()=>Tournament,tournament=>tournament.player)
    @JoinTable()
    tournament:Tournament[];

    @OneToMany(()=>Winner,winner=>winner.player)
    winner:Winner[];
}
