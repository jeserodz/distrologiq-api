import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AuthGuard } from '../auth/auth.guard';
import { UserAnalyticsDTO } from './analytics.dto';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @ApiOperation({ operationId: 'getUserAnalytics' })
  @Get('/users/:id')
  getUserAnalytics(@Param('id') userId: number): Promise<UserAnalyticsDTO> {
    return this.analyticsService.getUserAnalytics(userId);
  }
}
