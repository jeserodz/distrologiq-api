import * as dotenv from 'dotenv';
import { Injectable, Logger } from '@nestjs/common';
import { validateSync } from 'class-validator';
import { ConfigSchema, ConfigKeys } from './config.schema';

@Injectable()
export class ConfigService {
  logger = new Logger('Config');
  config = new ConfigSchema();

  constructor() {
    dotenv.config();
    this.config = new ConfigSchema();
    this.config.NODE_ENV = process.env.NODE_ENV || 'development';
    this.config.PORT = parseInt(process.env.PORT, 10) || 3000;
    this.config.DB_HOST = process.env.DB_HOST;
    this.config.DB_PORT = parseInt(process.env.DB_PORT, 10);
    this.config.DB_USER = process.env.DB_USER;
    this.config.DB_PASSWORD = process.env.DB_PASSWORD;
    this.config.DB_NAME = process.env.DB_NAME;
    this.config.DB_LOGGING = JSON.parse(process.env.DB_LOGGING || 'false');
    this.config.ADMIN_USERNAME = process.env.ADMIN_USERNAME;
    this.config.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
    this.config.MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
    this.config.GOOGLE_MAPS_KEY = process.env.GOOGLE_MAPS_KEY;
    this.validate();
  }

  get(key: ConfigKeys): any {
    return this.config[key];
  }

  /**
   * Checks that all the environment variables marked
   * as required are available. Uses class-validator.
   */
  validate() {
    const errors = validateSync(this.config);

    if (errors.length === 0) return;

    errors.map(error => {
      for (const message in error.constraints) {
        this.logger.error(error.constraints[message]);
      }
    });

    process.exit(1);
  }
}
