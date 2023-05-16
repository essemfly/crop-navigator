import type { SoilRecord, ClimateRecord } from "./nature.server";

export interface LatLng {
  lat: number;
  lng: number;
}

export interface Location {
  name: string;
  latLng: LatLng;
  soilRecords: SoilRecord[];
  climateRecords: ClimateRecord[];
}

export interface Score {}

export interface LocationScore {
  location: Location;
  soilScore: Score;
}
