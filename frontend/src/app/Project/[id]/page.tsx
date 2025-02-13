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

const Page = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const projectId = Number(id);
      try {
        const res = await fetch("http://localhost:3333/project/getproject", {
          method: "POST",
          body: JSON.stringify({ id: projectId }),
          headers: {
            "Content-Type": "application/json",
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
      <div className="p-5 text-3xl font-bold">
        {project?.project.name || "Loading..."}
      </div>
      <div className="flex flex-row flex-wrap p-5 overflow-visible gap-3">
        <TeamCard users={project?.members || []} />
        <TasksCard />
        {/* <CalendarCard />
        <LinksCard />
        <NotesCard />
        <FinancesCard /> */}
      </div>
    </>
  );
};

export default Page;
