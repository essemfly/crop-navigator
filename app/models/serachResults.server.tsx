import { CropType } from "@prisma/client";
import type { SearchResult } from "~/components/searchResultCard";

export async function getAvailableCrops(lat: number, lng: number) {
  const crops: SearchResult[] = [
    {
      id: 1,
      crop: {
        id: 1,
        name: "사과",
        nameEng: "Apple",
        imageUrl:
          "https://src.hidoc.co.kr/image/lib/2021/9/17/1631863503853_0.jpg",
        cropType: CropType.FRUIT,
        avgYearTemp: [18, 25],
        availGrowthTemp: [21, 25],
        lowestLiveTemp: 10,
        highestLiveTemp: 30,
        goodSunshine: 1000,
        goodRainfall: 1200,
        growhtStartMonth: 3,
        growthEndMonth: 10,
        harvestMonth: 11,
        growthPeriodInMonth: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
        registeredAt: new Date(),
      },
      expectedProfit: 6500,
      fitness: 0.885,
    },
    {
      id: 2,
      crop: {
        id: 2,
        name: "딸기",
        nameEng: "Cabbage",
        imageUrl:
          "https://www.dailimseed.co.kr/modules/shop/files/2017/09/21/4616_1.jpg?v=20221012085545",
        cropType: CropType.FRUIT,
        avgYearTemp: [18, 25],
        availGrowthTemp: [21, 25],
        lowestLiveTemp: 10,
        highestLiveTemp: 30,
        goodSunshine: 1000,
        goodRainfall: 1200,
        growhtStartMonth: 3,
        growthEndMonth: 10,
        harvestMonth: 11,
        growthPeriodInMonth: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
        registeredAt: new Date(),
      },
      expectedProfit: 8800,
      fitness: 0.81,
    },
    {
      id: 3,
      crop: {
        id: 3,
        name: "배추",
        nameEng: "Cabbage",
        imageUrl:
          "https://www.newsfm.kr/data/photos/20220729/art_16584064005093_83c05c.jpg",
        cropType: CropType.VEGETABLE,
        avgYearTemp: [18, 25],
        availGrowthTemp: [21, 25],
        lowestLiveTemp: 10,
        highestLiveTemp: 30,
        goodSunshine: 1000,
        goodRainfall: 1200,
        growhtStartMonth: 3,
        growthEndMonth: 10,
        harvestMonth: 11,
        growthPeriodInMonth: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
        registeredAt: new Date(),
      },
      expectedProfit: 100000,
      fitness: 0.66,
    },
  ];
  return crops;
}
