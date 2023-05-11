/*
  Warnings:

  - You are about to drop the column `growhtStartMonth` on the `Crop` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Crop" DROP COLUMN "growhtStartMonth",
ADD COLUMN     "growthStartMonth" INTEGER;
