import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MapsService } from './maps.service';
import { CalculateRouteDTO } from './maps.dto';

@ApiTags('Maps')
@Controller('maps')
export class MapsController {
  constructor(private mapsService: MapsService) {}

  @Get('/searchPlaces')
  searchPlaces(@Query('search') search: string) {
    return this.mapsService.searchPlaces(search);
  }

  @Post('/calculateRoute')
  calculateRoute(@Body() data: CalculateRouteDTO) {
    return this.mapsService.calculateRoute(data);
  }
}
