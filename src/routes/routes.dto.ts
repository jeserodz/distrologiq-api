import { RouteGeometry } from '../maps/maps.dto';
import { RouteStop } from './routes-stops.entity';
import { User } from '../users/users.entity';

export class CreateRouteDTO {
  name: string;
  distance: number;
  duration: number;
  durationWithLoadTime: number;
  geometry: RouteGeometry;
  stops: RouteStop[];
  driver?: User;
}

export class UpdateRouteDTO {
  id: number;
  name: string;
  distance: number;
  duration: number;
  durationWithLoadTime: number;
  geometry: RouteGeometry;
  started: Date;
  completed: Date;
  completedDuration: number;
  stops: RouteStop[];
  driver: User;
}

export class GetRouteStopDTO {
  id: number;
}

export class StartRouteStopDTO {
  id: number;
  startDatetime: Date;
}

export class CompleteRouteStopDTO {
  id: number;
  completionDatetime: Date;
}
