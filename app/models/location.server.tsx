import type { SoilRecord, ClimateRecord } from "./nature.server";

export interface LatLng {
  lat: number;
  lng: number;
}

export interface Location {
  name: string;
  latLng: LatLng;
}

export interface LocationWithRecord {
  location: Location;
  soilRecords: SoilRecord[];
  climateRecords: ClimateRecord[];
}
