import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDTO } from './users.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
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
  @ApiBearerAuth()
  show(@Param('id') id: number) {
    return this.usersService.get(id);
  }

  @Patch('/:id')
  @ApiBearerAuth()
  update(@Param('id') id: number, @Body() data: any) {
    return data;
  }

  @Delete('/:id')
  @ApiBearerAuth()
  destroy(@Param('id') id: number) {
    return `DELETE: ${id} - WIP`;
  }
}
