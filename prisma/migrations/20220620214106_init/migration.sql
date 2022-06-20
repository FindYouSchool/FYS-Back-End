-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT,
    "valid" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "student" TEXT[],
    "company" TEXT NOT NULL,
    "speaker" TEXT NOT NULL,
    "employee" TEXT NOT NULL,
    "teacher" JSONB,
    "guest" TEXT NOT NULL,
    "ecoleExp" TEXT NOT NULL,
    "userId" INTEGER,
    "valid" BOOLEAN NOT NULL DEFAULT false,
    "imageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notice" (
    "id" SERIAL NOT NULL,
    "comment" TEXT NOT NULL,
    "profileId" INTEGER,
    "schoolId" INTEGER,
    "authorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "School" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "trainingType" TEXT[],
    "pointsForts" TEXT[],
    "pointsFaibles" TEXT[],
    "location" TEXT NOT NULL,
    "notoriety" TEXT NOT NULL,
    "schoolVision" TEXT NOT NULL,
    "outlets" TEXT[],
    "diplomaIssued" TEXT[],
    "campus" TEXT[],
    "lifeSchool" TEXT[],
    "prices" TEXT[],
    "RegistrationFees" TEXT[],
    "capaciteAcceuil" INTEGER NOT NULL,
    "conditionAdmission" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imageId" TEXT NOT NULL,

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "School_Domain" (
    "id" SERIAL NOT NULL,
    "schoolId" INTEGER,
    "domainId" INTEGER,

    CONSTRAINT "School_Domain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Domain" (
    "id" SERIAL NOT NULL,
    "name" TEXT[],
    "description" TEXT NOT NULL,
    "domainId" INTEGER,

    CONSTRAINT "Domain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sector" (
    "id" SERIAL NOT NULL,
    "name" TEXT[],
    "description" TEXT NOT NULL,
    "schoolId" INTEGER,

    CONSTRAINT "Sector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sector_Tag" (
    "id" SERIAL NOT NULL,
    "sectorId" INTEGER,
    "tagId" INTEGER,

    CONSTRAINT "Sector_Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT[],

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Criteria" (
    "id" SERIAL NOT NULL,
    "name" TEXT[],
    "description" TEXT NOT NULL,

    CONSTRAINT "Criteria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Criteria_Mark" (
    "id" SERIAL NOT NULL,
    "noticeId" INTEGER,
    "criteriaId" INTEGER,
    "value" INTEGER DEFAULT 0,

    CONSTRAINT "Criteria_Mark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "version" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_password_key" ON "User"("password");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_imageId_key" ON "Profile"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "Notice_schoolId_key" ON "Notice"("schoolId");

-- CreateIndex
CREATE UNIQUE INDEX "School_imageId_key" ON "School"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "School_Domain_schoolId_key" ON "School_Domain"("schoolId");

-- CreateIndex
CREATE UNIQUE INDEX "School_Domain_domainId_key" ON "School_Domain"("domainId");

-- CreateIndex
CREATE UNIQUE INDEX "Domain_domainId_key" ON "Domain"("domainId");

-- CreateIndex
CREATE UNIQUE INDEX "Sector_schoolId_key" ON "Sector"("schoolId");

-- CreateIndex
CREATE UNIQUE INDEX "Sector_Tag_sectorId_key" ON "Sector_Tag"("sectorId");

-- CreateIndex
CREATE UNIQUE INDEX "Sector_Tag_tagId_key" ON "Sector_Tag"("tagId");

-- CreateIndex
CREATE UNIQUE INDEX "Criteria_Mark_noticeId_key" ON "Criteria_Mark"("noticeId");

-- CreateIndex
CREATE UNIQUE INDEX "Criteria_Mark_criteriaId_key" ON "Criteria_Mark"("criteriaId");

-- CreateIndex
CREATE UNIQUE INDEX "Image_publicId_key" ON "Image"("publicId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notice" ADD CONSTRAINT "Notice_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notice" ADD CONSTRAINT "Notice_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notice" ADD CONSTRAINT "Notice_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "School" ADD CONSTRAINT "School_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "School_Domain" ADD CONSTRAINT "School_Domain_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "School_Domain" ADD CONSTRAINT "School_Domain_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sector" ADD CONSTRAINT "Sector_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sector_Tag" ADD CONSTRAINT "Sector_Tag_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "Sector"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sector_Tag" ADD CONSTRAINT "Sector_Tag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Criteria_Mark" ADD CONSTRAINT "Criteria_Mark_noticeId_fkey" FOREIGN KEY ("noticeId") REFERENCES "Notice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Criteria_Mark" ADD CONSTRAINT "Criteria_Mark_criteriaId_fkey" FOREIGN KEY ("criteriaId") REFERENCES "Criteria"("id") ON DELETE SET NULL ON UPDATE CASCADE;
