import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Settings } from './settings.entity';
import { DestinationsModule } from '../destinations/destinations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Settings]),
    SettingsModule,
    DestinationsModule,
  ],
  providers: [SettingsService],
  exports: [SettingsService],
  controllers: [SettingsController],
})
export class SettingsModule {}
