import { Injectable } from '@nestjs/common';
import { hashSync } from 'bcryptjs';
import { CreateUserDTO } from './users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDTO) {
    const user = new User();
    Object.assign(user, data);
    user.password = hashSync(data.password, 10);
    await this.usersRepository.save(user);
    return user;
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
}
