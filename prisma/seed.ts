import * as fs from "fs";
import { parse } from "csv-parse";

import type { Crop } from "@prisma/client";
import { CropType } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  const fileContents = fs.readFileSync("prisma/crop_mocks.csv", "utf8");

  parse(
    fileContents,
    {
      columns: true,
      skip_empty_lines: true,
    },
    (err: Error | undefined, data: any) => {
      if (err) {
        console.error(err);
        return;
      }

      const crops: Crop[] = data.map((row: any) => ({
        name: row.name,
        nameEng: row.nameEng,
        imageUrl: row.imageUrl,
        cropType: CropType.VEGETABLE,
        avgYearTemp: [10, 20],
        availGrowthTemp: [10, 30],
        lowestLiveTemp: parseFloat(row.lowestLiveTemp),
        highestLiveTemp: parseFloat(row.highestLiveTemp),
        goodSunshine: parseInt(row.goodSunshine),
        goodRainfall: parseInt(row.goodRainfall),
        growthStartMonth: parseInt(row.growthStartMonth),
        growthEndMonth: parseInt(row.growthEndMonth),
        harvestMonth: parseInt(row.harvestMonth),
        growthPeriodInMonth: parseInt(row.growthPeriodInMonth),
        cropApiCode: row.cropApiCode,
      }));

      prisma.crop
        .createMany({ data: crops })
        .then(() => {
          console.log("Crops created successfully!");
        })
        .catch((error) => {
          console.error("Error creating crops:", error);
        });
    }
  );

  console.log(`Database has been seeded. 🌱`);
}

// Read the CSV file

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
