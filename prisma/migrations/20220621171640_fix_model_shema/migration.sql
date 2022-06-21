/*
  Warnings:

  - You are about to drop the column `domainId` on the `Domain` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `Notice` table. All the data in the column will be lost.
  - You are about to drop the column `company` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `ecoleExp` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `employee` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `guest` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `speaker` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `student` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `teacher` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `valid` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `RegistrationFees` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `campus` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `capaciteAcceuil` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `conditionAdmission` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `diplomaIssued` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `lifeSchool` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `notoriety` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `outlets` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `pointsFaibles` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `pointsForts` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `prices` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `schoolVision` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `trainingType` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `valid` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Criteria_Mark` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `School_Domain` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sector_Tag` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `schoolId` on table `Notice` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `firstName` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `description` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logo` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortDescription` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `domainId` to the `Sector` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Sector` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trainingTypeId` to the `Sector` table without a default value. This is not possible if the table is not empty.
  - Made the column `schoolId` on table `Sector` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `username` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MEN', 'FEMALE', 'OTHER');

-- DropForeignKey
ALTER TABLE "Criteria_Mark" DROP CONSTRAINT "Criteria_Mark_criteriaId_fkey";

-- DropForeignKey
ALTER TABLE "Criteria_Mark" DROP CONSTRAINT "Criteria_Mark_noticeId_fkey";

-- DropForeignKey
ALTER TABLE "Notice" DROP CONSTRAINT "Notice_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Notice" DROP CONSTRAINT "Notice_profileId_fkey";

-- DropForeignKey
ALTER TABLE "Notice" DROP CONSTRAINT "Notice_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_imageId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "School" DROP CONSTRAINT "School_imageId_fkey";

-- DropForeignKey
ALTER TABLE "School_Domain" DROP CONSTRAINT "School_Domain_domainId_fkey";

-- DropForeignKey
ALTER TABLE "School_Domain" DROP CONSTRAINT "School_Domain_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "Sector" DROP CONSTRAINT "Sector_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "Sector_Tag" DROP CONSTRAINT "Sector_Tag_sectorId_fkey";

-- DropForeignKey
ALTER TABLE "Sector_Tag" DROP CONSTRAINT "Sector_Tag_tagId_fkey";

-- DropIndex
DROP INDEX "Domain_domainId_key";

-- DropIndex
DROP INDEX "Notice_schoolId_key";

-- DropIndex
DROP INDEX "Profile_imageId_key";

-- DropIndex
DROP INDEX "School_imageId_key";

-- DropIndex
DROP INDEX "Sector_schoolId_key";

-- DropIndex
DROP INDEX "User_password_key";

-- AlterTable
ALTER TABLE "Criteria" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Domain" DROP COLUMN "domainId",
ADD COLUMN     "parentId" INTEGER,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Notice" DROP COLUMN "profileId",
ALTER COLUMN "schoolId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "company",
DROP COLUMN "ecoleExp",
DROP COLUMN "employee",
DROP COLUMN "guest",
DROP COLUMN "imageId",
DROP COLUMN "speaker",
DROP COLUMN "student",
DROP COLUMN "teacher",
DROP COLUMN "valid",
ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "roleId" INTEGER NOT NULL,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "School" DROP COLUMN "RegistrationFees",
DROP COLUMN "campus",
DROP COLUMN "capaciteAcceuil",
DROP COLUMN "conditionAdmission",
DROP COLUMN "createdAt",
DROP COLUMN "diplomaIssued",
DROP COLUMN "imageId",
DROP COLUMN "lifeSchool",
DROP COLUMN "location",
DROP COLUMN "notoriety",
DROP COLUMN "outlets",
DROP COLUMN "pointsFaibles",
DROP COLUMN "pointsForts",
DROP COLUMN "prices",
DROP COLUMN "schoolVision",
DROP COLUMN "trainingType",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "devise" TEXT,
ADD COLUMN     "logo" TEXT NOT NULL,
ADD COLUMN     "shortDescription" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Sector" ADD COLUMN     "domainId" INTEGER NOT NULL,
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "trainingTypeId" INTEGER NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "schoolId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Tag" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "valid",
ADD COLUMN     "disabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "username" SET NOT NULL;

-- DropTable
DROP TABLE "Criteria_Mark";

-- DropTable
DROP TABLE "Image";

-- DropTable
DROP TABLE "School_Domain";

-- DropTable
DROP TABLE "Sector_Tag";

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proof" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "fileSrc" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "profileId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Proof_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CriteriaMark" (
    "noticeId" INTEGER NOT NULL,
    "criteriaId" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CriteriaMark_pkey" PRIMARY KEY ("noticeId","criteriaId")
);

-- CreateTable
CREATE TABLE "TrainingType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TrainingType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectorTag" (
    "sectorId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "SectorTag_pkey" PRIMARY KEY ("sectorId","tagId")
);

-- CreateTable
CREATE TABLE "SchoolTrainingType" (
    "schoolId" INTEGER NOT NULL,
    "trainingTypeId" INTEGER NOT NULL,

    CONSTRAINT "SchoolTrainingType_pkey" PRIMARY KEY ("schoolId","trainingTypeId")
);

-- CreateTable
CREATE TABLE "SchoolDomain" (
    "schoolId" INTEGER NOT NULL,
    "domainId" INTEGER NOT NULL,

    CONSTRAINT "SchoolDomain_pkey" PRIMARY KEY ("schoolId","domainId")
);

-- CreateTable
CREATE TABLE "Campus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "logo" TEXT,
    "schoolId" INTEGER NOT NULL,
    "adressId" INTEGER NOT NULL,

    CONSTRAINT "Campus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampusGallery" (
    "galleryId" INTEGER NOT NULL,
    "campusId" INTEGER NOT NULL,

    CONSTRAINT "CampusGallery_pkey" PRIMARY KEY ("galleryId","campusId")
);

-- CreateTable
CREATE TABLE "Gallery" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "legend" TEXT NOT NULL,
    "description" TEXT,
    "cover" BOOLEAN NOT NULL DEFAULT false,
    "schoolId" INTEGER NOT NULL,

    CONSTRAINT "Gallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adress" (
    "id" SERIAL NOT NULL,
    "adress" TEXT NOT NULL,
    "adress2" TEXT,
    "zipCode" TEXT NOT NULL,
    "cityId" INTEGER NOT NULL,

    CONSTRAINT "Adress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "department" TEXT,
    "contryId" INTEGER NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contry" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "iso" TEXT NOT NULL,

    CONSTRAINT "Contry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proof" ADD CONSTRAINT "Proof_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notice" ADD CONSTRAINT "Notice_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notice" ADD CONSTRAINT "Notice_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CriteriaMark" ADD CONSTRAINT "CriteriaMark_noticeId_fkey" FOREIGN KEY ("noticeId") REFERENCES "Notice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CriteriaMark" ADD CONSTRAINT "CriteriaMark_criteriaId_fkey" FOREIGN KEY ("criteriaId") REFERENCES "Criteria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Domain" ADD CONSTRAINT "Domain_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Domain"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sector" ADD CONSTRAINT "Sector_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sector" ADD CONSTRAINT "Sector_trainingTypeId_fkey" FOREIGN KEY ("trainingTypeId") REFERENCES "TrainingType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sector" ADD CONSTRAINT "Sector_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectorTag" ADD CONSTRAINT "SectorTag_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "Sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectorTag" ADD CONSTRAINT "SectorTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolTrainingType" ADD CONSTRAINT "SchoolTrainingType_trainingTypeId_fkey" FOREIGN KEY ("trainingTypeId") REFERENCES "TrainingType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolTrainingType" ADD CONSTRAINT "SchoolTrainingType_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolDomain" ADD CONSTRAINT "SchoolDomain_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolDomain" ADD CONSTRAINT "SchoolDomain_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campus" ADD CONSTRAINT "Campus_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campus" ADD CONSTRAINT "Campus_adressId_fkey" FOREIGN KEY ("adressId") REFERENCES "Adress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampusGallery" ADD CONSTRAINT "CampusGallery_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "Campus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampusGallery" ADD CONSTRAINT "CampusGallery_galleryId_fkey" FOREIGN KEY ("galleryId") REFERENCES "Gallery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gallery" ADD CONSTRAINT "Gallery_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adress" ADD CONSTRAINT "Adress_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_contryId_fkey" FOREIGN KEY ("contryId") REFERENCES "Contry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
