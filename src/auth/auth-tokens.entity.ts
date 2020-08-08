// prettier-ignore
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from "typeorm";
import { User } from '../users/users.entity';

@Entity()
export class AuthToken extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  jwt: string;

  @ManyToOne(() => User)
  user: User;

  @CreateDateColumn()
  createdAt: string;
}
