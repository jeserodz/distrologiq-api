import { RouteStop } from '../routes/routes-stops.entity';
import { IsArray } from 'class-validator';

export class RouteGeometry {
  type: string;
  coordinates: string;
}

export class Waypoint {
  coordinates: [number, number];
}

export class Place {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

export class SearchPlacesDTO {
  query: string;
}

export class SearchPlacesResponse {
  places: Place[];
}

export class CalculateRouteDTO {
  routeStops: Partial<RouteStop>[];
  estimatedStartDate: Date | null;
  avgLoadTime: number;
}

export class CalculateRouteResponse {
  estimatedStartDate: Date | null;
  estimatedEndDate: Date | null;
  avgLoadTime: number;
  distance: number;
  duration: number;
  durationWithLoadTime: number;
  geometry: RouteGeometry;
  optimizedRouteStops: Partial<RouteStop>[];
}
