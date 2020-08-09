import { IsString, IsUrl, IsIn, IsNumber, IsBoolean } from 'class-validator';

export class ConfigSchema {
  @IsIn(['development', 'staging', 'production'])
  NODE_ENV: string;

  @IsNumber()
  PORT?: number;

  @IsUrl()
  DB_HOST: string;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_USER: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_NAME: string;

  @IsBoolean()
  DB_LOGGING: boolean;

  @IsString()
  MAPBOX_TOKEN: string;
}

export type ConfigKeys = keyof ConfigSchema;
