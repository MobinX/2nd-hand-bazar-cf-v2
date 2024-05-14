/*
  Warnings:

  - A unique constraint covering the columns `[bannerId]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryId` to the `Banner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Banner" ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "bannerId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Category_bannerId_key" ON "Category"("bannerId");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_bannerId_fkey" FOREIGN KEY ("bannerId") REFERENCES "Banner"("id") ON DELETE SET NULL ON UPDATE CASCADE;
