import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AuthToken } from './auth-tokens.entity';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthToken]),
    forwardRef(() => UsersModule),
  ],
  providers: [AuthService, AuthGuard],
  exports: [AuthService, AuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
