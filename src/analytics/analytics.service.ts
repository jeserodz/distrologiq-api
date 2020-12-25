import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';
import { Route } from '../routes/routes.entity';
import { UserAnalyticsDTO } from './analytics.dto';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Route) private routesRespository: Repository<Route>,
  ) {}

  async getUserAnalytics(userId: number): Promise<UserAnalyticsDTO> {
    const routes = await this.routesRespository.find({
      where: { driver: userId },
    });

    const user = await this.usersRepository.findOneOrFail({
      where: { id: userId },
    });

    const completedRoutes = routes.filter(r => r.completed);

    const pendingRoutes = routes.filter(r => !r.completed);

    // const averagePerformance =
    //   completedRoutes.reduce((accumulated, route) => {
    //     return (accumulated +=
    //       route.completedDuration / route.durationWithLoadTime);
    //   }, 0) / completedRoutes.length || 1;
    const averagePerformance =
      completedRoutes.reduce((accumulated, route) => {
        return (accumulated +=
          route.durationWithLoadTime / route.completedDuration);
      }, 0) / completedRoutes.length || 1;

    const averageVisits =
      routes.reduce((accumulated, route) => {
        return (accumulated += route.stops.length);
      }, 0) / routes.length || 1;

    const averageRouteDuration =
      completedRoutes.reduce((accumulated, route) => {
        return (accumulated += route.completedDuration);
      }, 0) / completedRoutes.length || 1;

    const accumulatedDistance =
      routes.reduce((accumulated, route) => {
        return (accumulated += route.distance);
      }, 0) / routes.length || 1;

    const performanceHistoryChart = routes.map(route => ({
      routeName: route.name,
      duration: route.durationWithLoadTime,
      completedDuration: route.completedDuration,
      performance: route.completedDuration / route.durationWithLoadTime,
    }));

    return {
      assignedRoutesCount: routes.length,
      completedRoutesCount: completedRoutes.length,
      pendingRoutesCount: pendingRoutes.length,
      averagePerformance,
      averageVisits,
      averageRouteDuration,
      accumulatedDistance,
      performanceHistoryChart,
      user: {
        id: user.id,
        displayName: user.displayName,
      },
    };
  }
}
