import { prisma } from "~/db.server";
import type { Crop } from "@prisma/client";

export interface WaterRequired {
  amount: number;
  frequency: number;
}

export interface SoilRequired {
  ph: number;
  electricalConductivity: number;

  nightTemp: number;
  dayTemp: number;
  sunHours: number;
  sunAmount: number;
  humidity: number;
}

export interface ClimateRequired {
  nightTemp: number;
  dayTemp: number;
  sunHours: number;
  sunAmount: number;
  humidity: number;
}

export interface GrowthStage {
  name: string;
  duration: number;
  soil: SoilRequired;
  water: WaterRequired;
  climate: ClimateRequired;
  crop: Crop;
  order: number;
}

export async function getRandomCrops(numCrops: number): Promise<Crop[]> {
  const totalCrops = await prisma.crop.count();
  //   const skipCount = Math.floor(Math.random() * totalCrops);
  const skipCount = 0;

  const crops = await prisma.crop.findMany({
    take: numCrops,
    skip: skipCount,
  });

  return crops;
}
