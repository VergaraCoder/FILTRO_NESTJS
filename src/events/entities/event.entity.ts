import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Event {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nameEvent:string;

    @Column()
    description:string;
}
