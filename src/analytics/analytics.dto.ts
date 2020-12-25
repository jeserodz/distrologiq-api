import { ApiProperty } from '@nestjs/swagger';

class PerformanceHistoryChartItem {
  routeName: string;
  duration: number;
  completedDuration: number;
  performance: number;
}

export class UserAnalyticsDTO {
  assignedRoutesCount: number;
  completedRoutesCount: number;
  pendingRoutesCount: number;
  averagePerformance: number;
  averageVisits: number;
  averageRouteDuration: number;
  accumulatedDistance: number;

  // @ApiProperty({ type: [PerformanceHistoryChartItem] })
  performanceHistoryChart: PerformanceHistoryChartItem[];

  user: {
    id: number;
    displayName: string;
  };
}
