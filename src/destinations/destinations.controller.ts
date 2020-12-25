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
import { DestinationsService } from './destinations.service';
import { CreateDestinationDTO, UpdateDestinationDTO } from './destinations.dto';
import { AuthGuard } from '../auth/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Destinations')
@Controller('destinations')
export class DestinationsController {
  constructor(private destinationsService: DestinationsService) {}

  @ApiOperation({ operationId: 'getDestinations' })
  @Get()
  async getAll() {
    return this.destinationsService.getAll();
  }

  @ApiOperation({ operationId: 'getDestination' })
  @Get('/:id')
  async getOne(@Param('id') id: number) {
    return this.destinationsService.getOne(id);
  }

  @ApiOperation({ operationId: 'createDestination' })
  @Post()
  async create(@Body() args: CreateDestinationDTO) {
    return this.destinationsService.create(args);
  }

  @ApiOperation({ operationId: 'updateDestination' })
  @Patch('/:id')
  async update(@Param('id') id: number, @Body() data: UpdateDestinationDTO) {
    return this.destinationsService.update(id, data);
  }

  @ApiOperation({ operationId: 'removeDestination' })
  @Delete('/:id')
  async destroy(@Param('id') id: number) {
    return this.destinationsService.remove(id);
  }
}
