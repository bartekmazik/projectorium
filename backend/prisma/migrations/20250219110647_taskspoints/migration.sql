-- AlterTable
ALTER TABLE "project_users" ADD COLUMN     "pointsCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "points" INTEGER NOT NULL DEFAULT 0;
