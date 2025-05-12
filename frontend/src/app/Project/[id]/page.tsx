"use client";
import ProjectCard from "@/components/project/ProjectCard";
import React, { useEffect, useState } from "react";
import TeamCard from "@/components/project/elements/teamCard";
import TasksCard from "@/components/project/elements/tasksCard";
import CalendarCard from "@/components/project/elements/calendarCard";
import LinksCard from "@/components/project/elements/linksCard";
import NotesCard from "@/components/project/elements/notesCard";

import { useParams } from "next/navigation";
import { useUser } from "@/lib/AuthProvider";
import RankingCard from "@/components/project/elements/rankingCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MentorCard from "@/components/project/elements/mentorCard";
import ProfileCard from "@/components/project/elements/profileCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import MilestonesCard from "@/components/project/elements/milestonesCard";
import useProject from "@/app/hooks/useProject";

export interface User {
  user: {
    email: string;
    firstName: string;
    lastName: string;
    id: number;
  };
  role: string;
}
const Page = () => {
  const { project, isLoading, refetch } = useProject();

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <div className="p-5 text-3xl font-bold flex flex-row items-center justify-start gap-2">
        <Link href="/Dashboard">
          <ArrowLeft />
        </Link>
        {project?.name}
      </div>

      <div className="flex flex-col sm:grid sm:grid-cols-3 p-5 overflow-visible gap-3">
        <ProfileCard />
        <TeamCard
          users={project?.users || []}
          code={project?.projectCode || "0"}
        />
        <TasksCard tasks={project?.tasks || []} />
        <RankingCard />
        <NotesCard />
        <MentorCard />
        <MilestonesCard
          milestones={project?.milestones || []}
          refetch={refetch}
        />
        {/* <CalendarCard />
        <LinksCard />
        <FinancesCard /> */}
      </div>
    </>
  );
};

export default Page;
