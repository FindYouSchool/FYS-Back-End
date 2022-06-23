/*
  Warnings:

  - The primary key for the `CriteriaMark` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `noticeId` on the `CriteriaMark` table. All the data in the column will be lost.
  - The primary key for the `Notice` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Notice` table. All the data in the column will be lost.
  - Added the required column `noticeAuthorId` to the `CriteriaMark` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noticeSchoolId` to the `CriteriaMark` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CriteriaMark" DROP CONSTRAINT "CriteriaMark_noticeId_fkey";

-- AlterTable
ALTER TABLE "CriteriaMark" DROP CONSTRAINT "CriteriaMark_pkey",
DROP COLUMN "noticeId",
ADD COLUMN     "noticeAuthorId" INTEGER NOT NULL,
ADD COLUMN     "noticeSchoolId" INTEGER NOT NULL,
ADD CONSTRAINT "CriteriaMark_pkey" PRIMARY KEY ("noticeAuthorId", "noticeSchoolId", "criteriaId");

-- AlterTable
ALTER TABLE "Notice" DROP CONSTRAINT "Notice_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Notice_pkey" PRIMARY KEY ("authorId", "schoolId");

-- AddForeignKey
ALTER TABLE "CriteriaMark" ADD CONSTRAINT "CriteriaMark_noticeAuthorId_noticeSchoolId_fkey" FOREIGN KEY ("noticeAuthorId", "noticeSchoolId") REFERENCES "Notice"("authorId", "schoolId") ON DELETE RESTRICT ON UPDATE CASCADE;
