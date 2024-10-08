import { Player } from 'src/players/entities/player.entity';
import { Tournament } from 'src/tournaments/entities/tournament.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('winners')
export class Winner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  playerId: number;

  @Column()
  tournamentId: number;

  @Column()
  moneyEarned: number;

  @ManyToOne(() => Player, (player) => player.winner)
  player: Player;

  @ManyToOne(() => Tournament, (tournament) => tournament.winner)
  tournament: Tournament;
}
