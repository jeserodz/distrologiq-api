import {
  Entity,
  BaseEntity,
  Column,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RouteStop } from './routes-stops.entity';
import { RouteGeometry } from '../maps/maps.dto';
import { User } from '../users/users.entity';

@Entity()
export class Route extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  distance: number;

  @Column()
  duration: number;

  @Column()
  durationWithLoadTime: number;

  @Column({ type: 'json' })
  geometry: RouteGeometry;

  @Column({ nullable: true })
  started: Date;

  @Column({ nullable: true })
  completed: Date;

  @Column({ nullable: true })
  completedDuration: number;

  @OneToMany(() => RouteStop, routeStop => routeStop.route, { eager: true }) // prettier-ignore
  stops: RouteStop[];

  @ManyToOne(() => User, user => user.id, { eager: true }) // prettier-ignore
  driver: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
