import { Controller, Get, Query, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { MapsService } from './maps.service';
import { CalculateRouteDTO } from './maps.dto';
import { AuthGuard } from '../auth/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Maps')
@Controller('maps')
export class MapsController {
  constructor(private mapsService: MapsService) {}

  @ApiOperation({ operationId: 'searchPlaces' })
  @Get('/searchPlaces')
  searchPlaces(@Query('search') search: string) {
    return this.mapsService.searchPlaces(search);
  }

  @ApiOperation({ operationId: 'calculateRoute' })
  @Post('/calculateRoute')
  calculateRoute(@Body() data: CalculateRouteDTO) {
    return this.mapsService.calculateRoute(data);
  }
}
