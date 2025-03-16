-- CreateTable
CREATE TABLE "Milestone" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "completedOn" TIMESTAMP(3),
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "Milestone_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Milestone" ADD CONSTRAINT "Milestone_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
