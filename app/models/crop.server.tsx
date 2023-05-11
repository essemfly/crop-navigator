import { prisma } from "~/db.server";
import type { Crop } from "@prisma/client";

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
