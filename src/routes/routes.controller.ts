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
import { RoutesService } from './routes.service';
import {
  CreateRouteDTO,
  UpdateRouteDTO,
  StartRouteStopDTO,
  CompleteRouteStopDTO,
} from './routes.dto';
import { AuthGuard } from '../auth/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Routes')
@Controller('routes')
export class RoutesController {
  constructor(private routesService: RoutesService) {}

  @ApiOperation({ operationId: 'getRoutes' })
  @Get()
  async index() {
    return this.routesService.getAll();
  }

  @ApiOperation({ operationId: 'getRoute' })
  @Get('/:id')
  async show(@Param('id') id: number) {
    return this.routesService.get(id);
  }

  @ApiOperation({ operationId: 'createRoute' })
  @Post()
  async create(@Body() data: CreateRouteDTO) {
    return this.routesService.create(data);
  }

  @ApiOperation({ operationId: 'updateRoute' })
  @Patch('/:id')
  async update(@Param('id') id: number, @Body() data: UpdateRouteDTO) {
    return this.routesService.update(id, data);
  }

  @ApiOperation({ operationId: 'removeRoute' })
  @Delete('/:id')
  async destroy(@Param('id') id: number) {
    return this.routesService.remove(id);
  }

  @ApiOperation({ operationId: 'getRoutesAssignedToUser' })
  @Get('/assigned_to_user/:userId')
  async assignedRoutes(@Param('userId') userId: number) {
    return await this.routesService.getAssignedRoutes(userId);
  }

  @ApiOperation({ operationId: 'getRouteStop' })
  @Get('/stops/:id')
  async getRouteStop(@Param('id') id: number) {
    return this.routesService.getRouteStop(id);
  }

  @ApiOperation({ operationId: 'startRouteStop' })
  @Post('/stops/:id/start')
  async startRouteStop(
    @Param('id') id: number,
    @Body() data: StartRouteStopDTO,
  ) {
    return this.routesService.startRouteStop(id, data);
  }

  @ApiOperation({ operationId: 'completeRouteStop' })
  @Post('/stops/:id/complete')
  async completeRouteStop(
    @Param('id') id: number,
    @Body() data: CompleteRouteStopDTO,
  ) {
    return await this.routesService.completeRouteStop(id, data);
  }
}
