/*
  Warnings:

  - Added the required column `cropApiCode` to the `Crop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Crop" ADD COLUMN     "cropApiCode" TEXT NOT NULL;
