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

const Page = () => {
  const { id } = useParams();
  const { accessToken } = useUser();
  const [project, setProject] = useState(null);

  useEffect(() => {
    // if (!id) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3333/project/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}` || "",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch project");

        const json = await res.json();

        setProject(json);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <div className="p-5 text-3xl font-bold flex flex-row items-center justify-start gap-2">
        <Link href="/Dashboard">
          <ArrowLeft />
        </Link>
        {project?.project.name || "Loading..."}
      </div>
      <div className="flex flex-row flex-wrap p-5 overflow-visible gap-3">
        <TeamCard
          users={project?.members || []}
          code={project?.project.projectCode}
        />
        <TasksCard id={id as string} />
        <RankingCard />
        <NotesCard />
        <MentorCard />
        <ProfileCard />
        {/* <CalendarCard />
        <LinksCard />
        
        <FinancesCard /> */}
      </div>
    </>
  );
};

export default Page;
