import { Injectable } from '@nestjs/common';
import { SetSettingsDTO } from './settings.dto';
import { Repository } from 'typeorm';
import { Settings } from './settings.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Destination } from '../destinations/destinations.entity';
import { DestinationsService } from '../destinations/destinations.service';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Settings)
    private settingsRepository: Repository<Settings>,
    private destinationsService: DestinationsService,
  ) {}

  async set(data: SetSettingsDTO) {
    let settings = await this.settingsRepository.findOne({
      where: { uuid: 'settings' },
    });

    let destination = await this.destinationsService.getOwnCompany();

    if (!settings) settings = new Settings();

    if (!destination) destination = new Destination();

    settings.uuid = 'settings';
    settings.name = data.name;
    settings.avgLoadTime = data.avgLoadTime;
    destination.isOwnCompany = true;
    destination.name = data.name;
    destination.latitude = data.latitude;
    destination.longitude = data.longitude;
    settings.destination = destination;
    await this.settingsRepository.save(settings);

    return settings;
  }

  async get() {
    return await this.settingsRepository.findOne({
      where: { uuid: 'settings' },
    });
  }
}
