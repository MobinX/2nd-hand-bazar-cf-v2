/*
  Warnings:

  - A unique constraint covering the columns `[uploaderId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_uploaderId_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "uploaderId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_uploaderId_key" ON "Product"("uploaderId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_uploaderId_fkey" FOREIGN KEY ("uploaderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
