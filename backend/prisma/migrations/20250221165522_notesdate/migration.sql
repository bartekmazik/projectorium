/*
  Warnings:

  - You are about to drop the column `points` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `notes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "notes" DROP COLUMN "points",
DROP COLUMN "status",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
