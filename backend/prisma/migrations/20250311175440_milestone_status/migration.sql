-- CreateEnum
CREATE TYPE "MilestoneStatus" AS ENUM ('FINISHED', 'WORKING', 'UPCOMING');

-- AlterTable
ALTER TABLE "Milestone" ADD COLUMN     "status" "MilestoneStatus" NOT NULL DEFAULT 'WORKING';
