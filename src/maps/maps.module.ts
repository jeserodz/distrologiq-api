import { Module } from '@nestjs/common';
import { MapsService } from './maps.service';
import { MapsController } from './maps.controller';
import { ConfigModule } from '../config/config.module';
import { SettingsModule } from '../settings/settings.module';

@Module({
  imports: [ConfigModule, SettingsModule],
  providers: [MapsService],
  controllers: [MapsController],
  exports: [MapsService],
})
export class MapsModule {}
