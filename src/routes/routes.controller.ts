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
import { RoutesService } from './routes.service';
import {
  CreateRouteDTO,
  UpdateRouteDTO,
  StartRouteStopDTO,
  CompleteRouteStopDTO,
} from './routes.dto';

@ApiTags('Routes')
@Controller('routes')
export class RoutesController {
  constructor(private routesService: RoutesService) {}

  @Post()
  async create(@Body() data: CreateRouteDTO) {
    return this.routesService.create(data);
  }

  @Get()
  async index() {
    return this.routesService.getAll();
  }

  @Get('/:id')
  async show(@Param('id') id: number) {
    return this.routesService.get(id);
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() data: UpdateRouteDTO) {
    return this.routesService.update(id, data);
  }

  @Delete('/:id')
  async destroy(@Param('id') id: number) {
    return this.routesService.remove(id);
  }

  // @Authorized()
  @Get('/assigned_to_user/:userId')
  async assignedRoutes(@Param('userId') userId: number) {
    return await this.routesService.getAssignedRoutes(userId);
  }

  @Get('/stops/:id')
  async getRouteStop(@Param('id') id: number) {
    return this.routesService.getRouteStop(id);
  }

  @Post('/stops/:id/start')
  async startRouteStop(
    @Param('id') id: number,
    @Body() data: StartRouteStopDTO,
  ) {
    return this.routesService.startRouteStop(id, data);
  }

  @Post('/stops/:id/complete')
  async completeRouteStop(
    @Param('id') id: number,
    @Body() data: CompleteRouteStopDTO,
  ) {
    return await this.routesService.completeRouteStop(id, data);
  }
}
