import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { SettingsService } from './settings.service';
import { SetSettingsDTO } from './settings.dto';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Settings')
@Controller('settings')
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @ApiOperation({ operationId: 'getSettings' })
  @Get()
  index() {
    return this.settingsService.get();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ operationId: 'updateSettings' })
  @Patch()
  setSettings(@Body() data: SetSettingsDTO) {
    return this.settingsService.set(data);
  }
}
