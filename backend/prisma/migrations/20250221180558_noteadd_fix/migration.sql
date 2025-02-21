/*
  Warnings:

  - You are about to drop the `note_users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `notes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "note_users" DROP CONSTRAINT "note_users_noteId_fkey";

-- DropForeignKey
ALTER TABLE "note_users" DROP CONSTRAINT "note_users_userId_fkey";

-- AlterTable
ALTER TABLE "notes" ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "note_users";

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
