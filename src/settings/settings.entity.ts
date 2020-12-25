import {
  Entity,
  BaseEntity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Destination } from '../destinations/destinations.entity';

@Entity()
export class Settings extends BaseEntity {
  @PrimaryColumn()
  uuid: string;

  @Column()
  name: string;

  @Column({ type: 'double' })
  avgLoadTime: number;

  @OneToOne(() => Destination, { cascade: true, eager: true })
  @JoinColumn()
  destination: Destination;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
