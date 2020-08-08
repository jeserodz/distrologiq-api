import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
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
      user,
      uuid: accessToken,
    });

    return { accessToken } as SignInResponseDTO;
  }

  async verifyAccessToken(accessToken: string) {
    try {
      jwt.verify(accessToken, 'secret', { ignoreExpiration: false });
      this.tokensRepository.findOneOrFail({ where: { uuid: accessToken } });
      return true;
    } catch (error) {
      return false;
    }
  }
}
