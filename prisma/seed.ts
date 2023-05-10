import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  await prisma.crop.createMany({
    data: [
      {
        name: "Tomato",
        nameEng: "Tomdata",
        cropType: "VEGETABLE",
        avgYearTemp: [20.0, 30.0],
        availGrowthTemp: [],
        lowestLiveTemp: 15,
        highestLiveTemp: 13,
        goodSunshine: 80,
        goodRainfall: 300,
        growhtStartMonth: 3,
        growthEndMonth: 10,
        harvestMonth: 10,
        growthPeriodInMonth: 12,
      },
    ],
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
