import { RouteStop } from '../routes/routes-stops.entity';

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
  routeStops: RouteStop[];
}

export class CalculateRouteResponse {
  distance: number;
  duration: number;
  durationWithLoadTime: number;
  geometry: RouteGeometry;
  optimizedRouteStops: RouteStop[];
}
