/*
  Warnings:

  - You are about to drop the column `delete` on the `UploadedFiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UploadedFiles" DROP COLUMN "delete",
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;
