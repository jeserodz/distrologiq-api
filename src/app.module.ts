import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { SettingsModule } from './settings/settings.module';
import { DestinationsModule } from './destinations/destinations.module';
import { RoutesModule } from './routes/routes.module';
import { MapsModule } from './maps/maps.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
    SettingsModule,
    DestinationsModule,
    RoutesModule,
    MapsModule,
  ],
})
export class AppModule {}
