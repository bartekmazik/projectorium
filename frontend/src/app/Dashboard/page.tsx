import React from "react";
import Sidebar from "@/components/sidebar";
import ProjectCard from "@/components/project/ProjectCard";
import Toolbar from "@/app/Dashboard/toolbar";

const page = () => {
  return (
    <>
      <Toolbar />
      <div className="h-screen w-full flex flex-row p-4">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </>
  );
};

export default page;
