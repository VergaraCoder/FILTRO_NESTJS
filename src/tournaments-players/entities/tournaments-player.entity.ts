import { Player } from 'src/players/entities/player.entity';
import { Tournament } from 'src/tournaments/entities/tournament.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tournamentsPlayer')
export class TournamentsPlayer {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  playerId: number;

  @Column()
  tournamentId: number;

  @Column()
  score: number;

  @ManyToOne(() => Player, (player) => player.tournamentPlayer, { eager: true })
  player: Player;

  @ManyToOne(() => Tournament, (tournament) => tournament.tournamentPlayer, {
    eager: true,
  })
  tournament: Tournament;
}
