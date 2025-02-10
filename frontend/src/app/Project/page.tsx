import ProjectCard from "@/components/project/ProjectCard";
import React from "react";
import TeamCard from "@/components/project/elements/teamCard";
import TasksCard from "@/components/project/elements/tasksCard";
import CalendarCard from "@/components/project/elements/calendarCard";
import LinksCard from "@/components/project/elements/linksCard";
import NotesCard from "@/components/project/elements/notesCard";
import FinancesCard from "@/components/project/elements/financesCard";

const page = () => {
  return (
    <>
      <div className="flex flex-row flex-wrap p-5 overflow-visible gap-3">
        <TeamCard />
        <TasksCard />
        <CalendarCard />
        <LinksCard />
        <NotesCard />
        <FinancesCard />
      </div>
    </>
  );
};

export default page;
