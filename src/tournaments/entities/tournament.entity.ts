import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("tournaments")
export class Tournament {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nameEvent:string;

    //@
}
