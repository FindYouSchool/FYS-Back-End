-- CreateTable
CREATE TABLE "SectorTrainingTypeImpact" (
    "sectorId" INTEGER NOT NULL,
    "schoolId" INTEGER NOT NULL,
    "trainingTypeId" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SectorTrainingTypeImpact_pkey" PRIMARY KEY ("sectorId","schoolId","trainingTypeId")
);

-- AddForeignKey
ALTER TABLE "SectorTrainingTypeImpact" ADD CONSTRAINT "SectorTrainingTypeImpact_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "Sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectorTrainingTypeImpact" ADD CONSTRAINT "SectorTrainingTypeImpact_trainingTypeId_fkey" FOREIGN KEY ("trainingTypeId") REFERENCES "TrainingType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectorTrainingTypeImpact" ADD CONSTRAINT "SectorTrainingTypeImpact_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
