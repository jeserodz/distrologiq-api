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

  /**
   * Name of the route.
   */
  @Column()
  name: string;

  /**
   * Average time spent at each stop (in minutes).
   **/
  @Column({ type: 'double', nullable: true })
  avgLoadTime: number;

  /**
   * Distance of the route (in meters).
   */
  @Column()
  distance: number;

  /**
   * Duration of the route (in seconds).
   **/
  @Column()
  duration: number;

  /**
   * Duration of the route (in seconds),
   * plus the avgLoadTime coming from settings.avgLoadTime
   * or overriden by this route.avgLoadTime.
   */
  @Column()
  durationWithLoadTime: number;

  /**
   * Estimated date and time when the route
   * should be started.
   */
  @Column({ nullable: true })
  estimatedStartDate: Date | null;

  /** Estimated date and time when the route
   * should be completed.
   */
  @Column({ nullable: true })
  estimatedEndDate: Date | null;

  @Column({ type: 'json' })
  geometry: RouteGeometry;

  @Column({ nullable: true })
  started: Date | null;

  @Column({ nullable: true })
  completed: Date | null;

  /**
   * Duration the route has taken to become completed (in seconds).
   */
  @Column({ nullable: true })
  completedDuration: number | null;

  @OneToMany(() => RouteStop, routeStop => routeStop.route, { eager: true }) // prettier-ignore
  stops: RouteStop[];

  @ManyToOne(() => User, user => user.id, { eager: true }) // prettier-ignore
  driver: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
