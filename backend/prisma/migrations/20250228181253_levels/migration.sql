/*
  Warnings:

  - Added the required column `league` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "League" AS ENUM ('BRONZE', 'SILVER', 'GOLD', 'DIAMOND');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "experience" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "league" "League" NOT NULL,
ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 1;
