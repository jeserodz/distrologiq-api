import { RouteGeometry } from '../maps/maps.dto';
import { RouteStop } from './routes-stops.entity';
import { User } from '../users/users.entity';

export class CreateRouteDTO {
  name: string;
  distance: number;
  avgLoadTime: number;
  duration: number;
  durationWithLoadTime: number;
  estimatedStartDate: Date | null;
  estimatedEndDate: Date | null;
  geometry: RouteGeometry;
  stops: RouteStop[];
  driver?: User;
}

export class UpdateRouteDTO {
  name: string;
  distance: number;
  avgLoadTime: number;
  duration: number;
  durationWithLoadTime: number;
  estimatedStartDate: Date | null;
  estimatedEndDate: Date | null;
  geometry: RouteGeometry;
  stops: RouteStop[];
  driver: User;
  started: Date;
  completed: Date;
  completedDuration: number;
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
