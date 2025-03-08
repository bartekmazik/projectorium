"use client";
import ProjectCard from "@/components/project/ProjectCard";
import React, { useEffect, useState } from "react";
import TeamCard from "@/components/project/elements/teamCard";
import TasksCard from "@/components/project/elements/tasksCard";
import CalendarCard from "@/components/project/elements/calendarCard";
import LinksCard from "@/components/project/elements/linksCard";
import NotesCard from "@/components/project/elements/notesCard";
import FinancesCard from "@/components/project/elements/financesCard";
import { useParams } from "next/navigation";
import { useUser } from "@/lib/AuthProvider";
import RankingCard from "@/components/project/elements/rankingCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MentorCard from "@/components/project/elements/mentorCard";
import ProfileCard from "@/components/project/elements/profileCard";
import LoadingSpinner from "@/components/LoadingSpinner";

interface Project {
  name: string;
  description: string;
  projectCode: string;
  users: User[];
}
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
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { accessToken } = useUser();
  const [project, setProject] = useState<Project>();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`http://localhost:3333/project/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}` || "",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch project");

        const json = await res.json();

        setProject(json.project);

        setTimeout(() => setIsLoading(false), 1000);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchData();
  }, [id]);

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

      <div className="flex flex-row flex-wrap p-5 overflow-visible gap-3">
        <ProfileCard />
        <TeamCard users={project?.users || []} code={project?.projectCode} />
        <TasksCard id={id as string} />
        <RankingCard />
        <NotesCard />
        <MentorCard />
        {/* <CalendarCard />
        <LinksCard />
        <FinancesCard /> */}
      </div>
    </>
  );
};

export default Page;
