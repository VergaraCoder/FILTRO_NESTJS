import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('roles')
@Unique(['nameRole'])
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nameRole: string;

  @OneToMany(() => User, (user) => user.role)
  user: User[];
}
