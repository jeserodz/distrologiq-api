import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SignInDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class SignInResponseDTO {
  @ApiProperty()
  accessToken: string;
}

export class JwtPayloadDto {
  username: string;
}
