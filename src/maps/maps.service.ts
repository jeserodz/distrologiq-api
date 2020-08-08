import { Injectable } from '@nestjs/common';
import { DirectionsRequestWaypoint } from '@mapbox/mapbox-sdk/services/directions';
import * as Optimization from '@mapbox/mapbox-sdk/services/optimization';
import * as Geocoding from '@mapbox/mapbox-sdk/services/geocoding';
import { Client, Status } from '@googlemaps/google-maps-services-js';

import { ConfigService } from '../config/config.service';
import {
  Place,
  CalculateRouteDTO,
  CalculateRouteResponse,
  SearchPlacesResponse,
} from './maps.dto';
import { SettingsService } from '../settings/settings.service';
import { RouteStop } from '../routes/routes-stops.entity';
import { Settings } from '../settings/settings.entity';

@Injectable()
export class MapsService {
  mapboxToken: string;
  googleMapsKey: string;
  googleMaspsClient: Client;

  constructor(
    private configService: ConfigService,
    private settingsService: SettingsService,
  ) {
    this.mapboxToken = this.configService.get('MAPBOX_TOKEN');
    this.googleMapsKey = 'AIzaSyCcs1uIlV8JufBDVmnelW_GN0vYhiCW-Oc';
    this.googleMaspsClient = new Client();
  }

  async searchPlaces(query: string) {
    const client = Geocoding({ accessToken: this.mapboxToken });

    const results = await client
      .forwardGeocode({
        query,
        mode: 'mapbox.places',
        countries: ['DO'],
        autocomplete: true,
      })
      .send();

    const places: Place[] = results.body.features.map((p: any) => ({
      id: p.id,
      name: p.place_name,
      latitude: p.center[1],
      longitude: p.center[0],
    }));

    const googleSearch = await this.googleMaspsClient.placeAutocomplete({
      params: {
        input: query,
        key: this.googleMapsKey,
        components: ['country:do'],
      },
    });

    const googlePlaces = googleSearch.data.predictions.map(prediction => {
      return {
        id: prediction.place_id,
        name: prediction.description,
        latitude: 0,
        longitude: 0,
      } as Place;
    });

    for (const googlePlace of googlePlaces) {
      const details = await this.googleMaspsClient.placeDetails({
        params: { key: this.googleMapsKey, place_id: googlePlace.id },
      });
      googlePlace.latitude = details.data.result.geometry.location.lat;
      googlePlace.longitude = details.data.result.geometry.location.lng;
    }

    console.log({ googlePlaces });

    places.push(...googlePlaces);

    return { places } as SearchPlacesResponse;
  }

  async calculateRoute(params: CalculateRouteDTO) {
    const accessToken = process.env.MAPBOX_TOKEN;
    const client = Optimization({ accessToken });

    const settings = await this.settingsService.get();

    const { companyWaypoint, stopWaypoints } = this.getWaypoints(
      params.routeStops,
      settings,
    );

    const optimizationSettings = {
      profile: 'driving',
      geometries: 'geojson',
      steps: true,
      waypoints: [companyWaypoint, ...stopWaypoints],
      source: 'first',
      destination: 'last',
    };

    const { body: route } = await client
      .getOptimization(optimizationSettings)
      .send();

    this.addAverageTruckLoadTime(route, settings);

    // Serialize coordinates for Firestore
    route.trips[0].geometry.coordinates = JSON.stringify(
      route.trips[0].geometry.coordinates,
    );

    // Re-order routeStops per waypoint_index (excludes owning company)
    const optimizedRouteStops: RouteStop[] = [];
    route.waypoints.slice(1).forEach((waypoint: any, index: number) => {
      const waypointIndex = waypoint.waypoint_index - 1;

      const routeStop = params.routeStops[index];
      routeStop.waypointIndex = waypointIndex;

      optimizedRouteStops[waypointIndex] = routeStop;
      optimizedRouteStops[waypointIndex].waypointIndex = waypointIndex;
    });

    return {
      distance: route.trips[0].distance,
      duration: route.trips[0].duration,
      durationWithLoadTime: route.trips[0].durationWithLoadTime,
      geometry: route.trips[0].geometry,
      optimizedRouteStops,
    } as CalculateRouteResponse;
  }

  /**
   * Get waypoints for company, intermediate stops and final stop
   * @param routeStops
   * @param settings
   */
  getWaypoints(routeStops: RouteStop[], settings: Settings) {
    const companyWaypoint: DirectionsRequestWaypoint = {
      coordinates: [
        settings.destination.longitude,
        settings.destination.latitude,
      ],
    };

    // Move final stop to end of RouteStops
    const finalStopIndex = routeStops.findIndex(s => s.type === 'ARRIVAL');
    routeStops.push(routeStops.splice(finalStopIndex, 1)[0]);

    const stopWaypoints: DirectionsRequestWaypoint[] = routeStops.map(
      routeStop => ({
        coordinates: [
          routeStop.destination.longitude,
          routeStop.destination.latitude,
        ],
      }),
    );

    return { companyWaypoint, stopWaypoints };
  }

  /**
   * Use the company average load time (stored in settings.avgLoadTime),
   * to adjust the time for each leg in the route.
   * @param route
   * @param settings
   */
  addAverageTruckLoadTime(route: any, settings: Settings) {
    route.trips.forEach((trip: any) => {
      trip.durationWithLoadTime = 0;
      trip.legs.forEach((tripLeg: any) => {
        tripLeg.durationWithLoadTime =
          tripLeg.duration + settings.avgLoadTime * 60;
        trip.durationWithLoadTime += tripLeg.durationWithLoadTime;
      });
    });
  }
}
