import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SignInDto, SignInResponseDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ operationId: 'signIn' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/signIn')
  async signIn(@Body() data: SignInDto): Promise<SignInResponseDTO> {
    return await this.authService.signIn(data);
  }

  @ApiOperation({ operationId: 'verifyToken ' })
  @UseGuards(AuthGuard)
  @Get('/verifyToken')
  async verifyAccessToken() {
    return 'ok';
  }
}
