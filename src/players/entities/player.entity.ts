import { TournamentsPlayer } from 'src/tournaments-players/entities/tournaments-player.entity';
import { Tournament } from 'src/tournaments/entities/tournament.entity';
import { Winner } from 'src/winners/entities/winner.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  namePlayer: string;

  @Column()
  age: number;

  @Column()
  winners: number;

  @OneToMany(() => TournamentsPlayer, (tournament) => tournament.player)
  tournamentPlayer: TournamentsPlayer[];

  @OneToMany(() => Winner, (winner) => winner.player)
  winner: Winner[];
}
