import {
  Injectable,
  ForbiddenException,
  MethodNotAllowedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Route } from './routes.entity';
import { Repository } from 'typeorm';
import { RouteStop } from './routes-stops.entity';
import {
  CreateRouteDTO,
  UpdateRouteDTO,
  StartRouteStopDTO,
  CompleteRouteStopDTO,
} from './routes.dto';

@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(Route)
    private routesRepository: Repository<Route>,

    @InjectRepository(RouteStop)
    private routesStopsRepository: Repository<RouteStop>,
  ) {}

  async create(data: CreateRouteDTO) {
    const route = new Route();

    Object.assign(route, data);

    route.stops = [];

    await route.save();

    for (const stopData of data.stops) {
      const stop = new RouteStop();
      await RouteStop.merge(stop, stopData, { route }).save();
      route.stops.push(stop);
    }

    return route;
  }

  async getAll() {
    return await this.routesRepository.find({});
  }

  async get(id: number) {
    return await this.routesRepository.findOne({ where: { id } });
  }

  async update(id: number, data: UpdateRouteDTO) {
    let route = await this.routesRepository.findOne({ where: { id } });

    if (data.stops) {
      const removedStops = route.stops.filter(stop => {
        return !data.stops.find(s => s.id === stop.id);
      });

      const addedStops = data.stops.filter(stop => {
        return !route.stops.find(s => s.id === stop.id);
      });

      const updatedStops = route.stops.filter(stop => {
        return data.stops.find(s => s.id === stop.id);
      });

      for (const removedStop of removedStops) {
        await removedStop.remove();
      }

      for (const addedStop of addedStops) {
        const stop = new RouteStop();
        RouteStop.merge(stop, addedStop, { route });
        await stop.save();
      }

      for (const updatedStop of updatedStops) {
        const stopData = data.stops.find(stop => stop.id === updatedStop.id);
        RouteStop.merge(updatedStop, stopData);
        await updatedStop.save();
      }
    }

    route = await this.routesRepository.findOne({ where: { id } });

    Route.merge(route, data, { stops: route.stops });

    return this.routesRepository.save(route);
  }

  async remove(id: number) {
    const route = await this.get(id);

    if (route.started) {
      throw new MethodNotAllowedException('Esta ruta ha sido iniciada.');
    }

    return this.routesRepository.delete(id);
  }

  async getAssignedRoutes(userId: number) {
    return this.routesRepository
      .createQueryBuilder('route')
      .leftJoinAndSelect('route.driver', 'driver')
      .leftJoinAndSelect('route.stops', 'stops')
      .leftJoinAndSelect('stops.destination', 'destination')
      .where('route.driver.id = :id', { id: userId })
      .getMany();
  }

  async getRouteStop(id: number) {
    return this.routesStopsRepository.findOne({
      where: { id },
    });
  }

  async startRouteStop(id: number, data: StartRouteStopDTO) {
    const routeStop = await RouteStop.findOne({
      where: { id },
      relations: ['route'],
    });

    await this.preventMultipleIncompleteRouteStops(routeStop);

    routeStop.started = new Date(data.startDatetime);
    await this.routesStopsRepository.save(routeStop);
    await this.setRouteStarted(routeStop);
    return routeStop;
  }

  async completeRouteStop(id: number, data: CompleteRouteStopDTO) {
    const routeStop = await this.routesStopsRepository.findOne({
      where: { id },
      relations: ['route'],
    });

    routeStop.completed = new Date(data.completionDatetime);

    await routeStop.save();
    await this.setRouteCompleted(routeStop);
    return routeStop;
  }

  /**
   * Only one routeStop should be active at any given time to ensure
   * the driver completes all the routeStops.
   */
  async preventMultipleIncompleteRouteStops(routeStop: RouteStop) {
    const route = await this.routesRepository.findOne(routeStop.route.id);

    const incompleteRouteStops = route.stops.filter(stop => {
      return stop.started && !stop.completed;
    });

    if (incompleteRouteStops.length > 0) {
      throw new ForbiddenException(
        `Tiene un recorrido activo sin completar hacia "${incompleteRouteStops[0].destination.name}". ` +
          `Por favor, complete el recorrido anterior antes de iniciar uno nuevo.`,
      );
    }
  }

  /**
   * Sets the parent route as started when the 1st routeStop starts
   */
  async setRouteStarted(routeStop: RouteStop) {
    if (!routeStop.route.started) {
      routeStop.route.started = routeStop.started;
      await routeStop.route.save();
    }
  }

  /**
   * Sets the parent route as completed when the last routeStop completes
   */
  async setRouteCompleted(routeStop: RouteStop) {
    const route = await this.routesRepository.findOne(routeStop.route.id);

    const incompleteRouteStops = route.stops.filter(stop => {
      return !stop.completed;
    });

    if (incompleteRouteStops.length === 0) {
      route.completed = routeStop.completed;
      route.completedDuration =
        (route.completed.getTime() - route.started.getTime()) / 1000;
      this.routesRepository.save(route);
    }
  }
}
