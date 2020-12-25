import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashSync } from 'bcryptjs';
import { ConfigService } from '../config/config.service';
import { CreateUserDTO, UpdateUserDTO } from './users.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  onApplicationBootstrap() {
    this.checkAdminUser();
  }

  async getAll() {
    const users = await this.usersRepository.find({});
    return users;
  }

  async get(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    return user;
  }

  async getByUsername(username: string) {
    const user = await this.usersRepository.findOne({ where: { username } });
    return user;
  }

  async create(data: CreateUserDTO) {
    const user = new User();
    Object.assign(user, data);
    user.password = hashSync(data.password, 10);
    await this.usersRepository.save(user);
    return user;
  }

  async update(id: number, data: UpdateUserDTO) {
    const user = await this.get(id);
    Object.assign(user, data);

    if (data.password) {
      user.password = hashSync(data.password, 10);
    }

    await this.usersRepository.save(user);
    return user;
  }

  /**
   * Ensure the default admin user configured
   * always exists in the database.
   */
  async checkAdminUser() {
    const adminUsername = this.configService.get('ADMIN_USERNAME');
    const adminPassword = this.configService.get('ADMIN_PASSWORD');

    const adminUser = await this.usersRepository.findOne({
      username: adminUsername,
    });

    if (adminUser) {
      adminUser.password = hashSync(adminPassword, 10);
      adminUser.roles = { ...adminUser.roles, admin: true };
      adminUser.save();
    } else {
      this.usersRepository.insert({
        username: adminUsername,
        password: hashSync(adminPassword, 10),
        displayName: 'Super Admin',
        roles: { admin: true },
      });
    }
  }
}
