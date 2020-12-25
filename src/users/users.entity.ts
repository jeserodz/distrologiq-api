import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn,} from 'typeorm'; // prettier-ignore
import { Exclude } from 'class-transformer';
import { UserRoles } from './users.roles';

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
  roles: UserRoles;

  @CreateDateColumn()
  @Exclude()
  createdAt: string;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: string;
}
