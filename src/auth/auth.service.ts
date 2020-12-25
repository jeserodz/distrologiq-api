import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthToken } from './auth-tokens.entity';
import { Repository } from 'typeorm';
import { SignInDto, SignInResponseDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthToken)
    private tokensRepository: Repository<AuthToken>,
    private usersService: UsersService,
  ) {}

  async signIn(data: SignInDto) {
    return this.createAccessToken(data);
  }

  async createAccessToken(data: SignInDto) {
    const user = await this.usersService.getByUsername(data.username);

    if (!user) {
      throw new UnauthorizedException('Usuario o contraseña inválidos.');
    }

    const matchedPassword = await bcrypt.compare(data.password, user?.password);

    if (!matchedPassword) {
      throw new UnauthorizedException('Usuario o contraseña inválidos.');
    }

    const accessToken = jwt.sign({ username: data.username }, 'secret', {
      expiresIn: '1d',
    });

    await this.tokensRepository.save({
      jwt: accessToken,
      user,
    });

    return { accessToken };
  }

  async verifyAccessToken(accessToken: string): Promise<AuthToken | undefined> {
    jwt.verify(accessToken, 'secret', { ignoreExpiration: false });

    return this.tokensRepository.findOne({
      where: { jwt: accessToken },
      relations: ['user'],
    });
  }
}
