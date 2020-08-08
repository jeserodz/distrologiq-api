import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  username: string;

  @Column()
  displayName: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ type: 'json' })
  roles: UserRoles = {
    admin: true,
    driver: true,
  };

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export interface UserRoles {
  admin: boolean;
  driver: boolean;
}
