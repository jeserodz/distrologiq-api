import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDTO } from './users.dto';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  // @UseGuards(AuthGuard)
  @ApiBearerAuth()
  index() {
    return this.usersService.getAll();
  }

  @Post()
  @ApiOperation({ operationId: 'create' })
  create(@Body() data: CreateUserDTO) {
    return this.usersService.create(data);
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  show(@Param('id') id: number) {
    return this.usersService.get(id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: number, @Body() data: any) {
    return data;
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  destroy(@Param('id') id: number) {
    return `DELETE: ${id} - WIP`;
  }
}
