import { IsString, IsOptional, IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';
import { UserRoles } from './users.roles';

export class CreateUserDTO {
  @IsString()
  @Transform((value: string) => value.toLowerCase())
  username: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  displayName?: string;

  @IsEmail()
  @IsOptional()
  @Transform((value: string) => value.toLowerCase())
  email?: string;

  @IsOptional()
  roles?: UserRoles;
}

export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  @Transform((value: string) => value.toLowerCase())
  username?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  displayName?: string;

  @IsEmail()
  @IsOptional()
  @Transform((value: string) => value.toLowerCase())
  email?: string;

  @IsOptional()
  roles?: UserRoles;
}
