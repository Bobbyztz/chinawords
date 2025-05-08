/*
  Warnings:

  - You are about to drop the column `altText` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Asset` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "altText",
DROP COLUMN "description";
