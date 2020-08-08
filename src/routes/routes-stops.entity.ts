import {
  Entity,
  BaseEntity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Route } from './routes.entity';
import { RouteStopType } from './routes.constants';
import { Destination } from '../destinations/destinations.entity';

@Entity()
export class RouteStop extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: RouteStopType, nullable: false })
  type: RouteStopType;

  @ManyToOne(() => Destination, { nullable: false, eager: true })
  destination: Destination;

  @ManyToOne(() => Route, route => route.stops, { nullable: false }) // prettier-ignore
  route: Route;

  @Column()
  waypointIndex: number;

  @Column({ nullable: true })
  started: Date | null;

  @Column({ nullable: true })
  completed: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
