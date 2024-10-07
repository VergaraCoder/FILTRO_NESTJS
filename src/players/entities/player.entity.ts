import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("players")
export class Player {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    namePlayer:string;

    @Column()
    age:number;

    @Column()
    level:string;
}
