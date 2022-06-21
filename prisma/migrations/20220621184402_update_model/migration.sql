/*
  Warnings:

  - The primary key for the `SectorTrainingTypeImpact` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `schoolId` on the `SectorTrainingTypeImpact` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "SectorTrainingTypeImpact" DROP CONSTRAINT "SectorTrainingTypeImpact_schoolId_fkey";

-- AlterTable
ALTER TABLE "SectorTrainingTypeImpact" DROP CONSTRAINT "SectorTrainingTypeImpact_pkey",
DROP COLUMN "schoolId",
ADD CONSTRAINT "SectorTrainingTypeImpact_pkey" PRIMARY KEY ("sectorId", "trainingTypeId");
