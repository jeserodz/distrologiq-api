import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, UseInterceptors, ClassSerializerInterceptor} from '@nestjs/common'; // prettier-ignore
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDTO, UpdateUserDTO } from './users.dto';
import { CurrentUser } from './users.decorator';
import { User } from './users.entity';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ operationId: 'getUsers' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  index() {
    return this.usersService.getAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ operationId: 'getCurrentUser' })
  @Get('/me')
  me(@CurrentUser() user: User) {
    return user;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ operationId: 'getUser' })
  @Get('/:id')
  show(@Param('id') id: number) {
    return this.usersService.get(id);
  }

  @ApiOperation({ operationId: 'createUser' })
  @Post()
  create(@Body() data: CreateUserDTO) {
    return this.usersService.create(data);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ operationId: 'updateUser' })
  @Patch('/:id')
  update(@Param('id') id: number, @Body() data: UpdateUserDTO) {
    return this.usersService.update(id, data);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ operationId: 'removeUser' })
  @Delete('/:id')
  destroy(@Param('id') id: number) {
    return `DELETE: ${id} - WIP`;
  }
}
