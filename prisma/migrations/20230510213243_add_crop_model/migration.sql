-- CreateEnum
CREATE TYPE "CropType" AS ENUM ('VEGETABLE', 'FRUIT', 'GRAIN', 'LEGUME', 'NUT', 'SPICE', 'FLOWER', 'HERB', 'FUNGUS', 'SEAWEED', 'ALGAE', 'OTHER');

-- CreateTable
CREATE TABLE "Crop" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nameEng" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "cropType" "CropType" NOT NULL,
    "avgYearTemp" DOUBLE PRECISION[],
    "availGrowthTemp" DOUBLE PRECISION[],
    "lowestLiveTemp" DOUBLE PRECISION NOT NULL,
    "highestLiveTemp" DOUBLE PRECISION NOT NULL,
    "goodSunshine" INTEGER NOT NULL,
    "goodRainfall" INTEGER NOT NULL,
    "growhtStartMonth" INTEGER,
    "growthEndMonth" INTEGER,
    "harvestMonth" INTEGER,
    "growthPeriodInMonth" INTEGER NOT NULL,
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Crop_id_key" ON "Crop"("id");
