import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto } from './auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signIn')
  async signIn(@Body() data: SignInDto) {
    return await this.authService.signIn(data);
  }

  @Get('/verifyAccessToken')
  @UseGuards(AuthGuard)
  async verifyAccessToken() {
    return 'ok';
  }
}
