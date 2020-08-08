import { Controller, Get, Patch, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SettingsService } from './settings.service';
import { SetSettingsDTO } from './settings.dto';

@ApiTags('Settings')
@Controller('settings')
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @Get()
  index() {
    return this.settingsService.get();
  }

  @Patch()
  setSettings(@Body() data: SetSettingsDTO) {
    return this.settingsService.set(data);
  }
}
