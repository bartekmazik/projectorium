/*
  Warnings:

  - A unique constraint covering the columns `[projectCode]` on the table `projects` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `projectCode` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "projectCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "projects_projectCode_key" ON "projects"("projectCode");
