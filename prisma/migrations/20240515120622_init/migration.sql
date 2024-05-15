-- CreateTable
CREATE TABLE "UploadedFiles" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "delete" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UploadedFiles_pkey" PRIMARY KEY ("id")
);
