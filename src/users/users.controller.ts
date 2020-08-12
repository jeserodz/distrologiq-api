import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDTO } from './users.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  index() {
    return this.usersService.getAll();
  }

  @Post()
  create(@Body() data: CreateUserDTO) {
    return this.usersService.create(data);
  }

  @Get('/:id')
  show(@Param('id') id: number) {
    return this.usersService.get(id);
  }

  @Patch('/:id')
  update(@Param('id') id: number, @Body() data: any) {
    return data;
  }

  @Delete('/:id')
  destroy(@Param('id') id: number) {
    return `DELETE: ${id} - WIP`;
  }
}
