import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateDestinationDTO {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  references?: string;

  @IsNumber()
  longitude: number;

  @IsNumber()
  latitude: number;

  @IsOptional()
  @IsBoolean()
  isOwnCompany?: boolean;
}

export class UpdateDestinationDTO extends PartialType(CreateDestinationDTO) {}
