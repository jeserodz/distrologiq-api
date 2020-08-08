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
import { DestinationsService } from './destinations.service';
import { CreateDestinationDTO, UpdateDestinationDTO } from './destinations.dto';

@ApiTags('Destinations')
@Controller('destinations')
export class DestinationsController {
  constructor(private destinationsService: DestinationsService) {}

  @Post()
  async create(@Body() args: CreateDestinationDTO) {
    return this.destinationsService.create(args);
  }

  @Get()
  async index() {
    return this.destinationsService.getAll();
  }

  @Get('/:id')
  async show(@Param('id') id: number) {
    return this.destinationsService.get(id);
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() data: UpdateDestinationDTO) {
    return this.destinationsService.update(id, data);
  }

  @Delete('/:id')
  async destroy(@Param('id') id: number) {
    return this.destinationsService.remove(id);
  }
}
