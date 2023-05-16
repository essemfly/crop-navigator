import { getRandomCrops } from "./crop.server";
import type { Crop } from "@prisma/client";
import type { Location } from "~/models/location.server";
import type { SoilRecord, ClimateRecord } from "~/models/nature.server";

export interface Score {
  grade: string;
  score: number;
  crop: Crop;
  location: Location;
  SoilRecords: SoilRecord[];
  ClimateRecords: ClimateRecord[];
}

export interface SearchResult {
  id: number;
  crop: Crop;
  expectedProfit: number;
  fitness: number;
}

export async function getAvailableCrops(lat: number, lng: number) {
  const crops = await getRandomCrops(6);
  const results: SearchResult[] = [
    {
      id: 1,
      crop: crops[0],
      expectedProfit: 6500,
      fitness: 0.885,
    },
    {
      id: 2,
      crop: crops[1],
      expectedProfit: 8800,
      fitness: 0.81,
    },
    {
      id: 3,
      crop: crops[2],
      expectedProfit: 100000,
      fitness: 0.66,
    },
    {
      id: 4,
      crop: crops[3],
      expectedProfit: 33000,
      fitness: 0.48,
    },
    {
      id: 5,
      crop: crops[4],
      expectedProfit: 6800,
      fitness: 0.42,
    },
  ];
  return results;
}
