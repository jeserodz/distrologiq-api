import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { Route } from './routes.entity';
import { RouteStop } from './routes-stops.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Route, RouteStop])],
  providers: [RoutesService],
  controllers: [RoutesController],
  exports: [RoutesService],
})
export class RoutesModule {}
