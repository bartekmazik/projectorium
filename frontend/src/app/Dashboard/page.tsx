"use client";
import React, { useEffect, useState } from "react";
import ProjectCard from "@/components/project/ProjectCard";
import Toolbar from "@/app/Dashboard/toolbar";
import { useUser } from "@/lib/AuthProvider";

const Page = () => {
  const [projects, setProjects] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const GetProjects = async () => {
      if (!user) {
        console.log("Login before getting projects");
        return;
      }

      try {
        const res = await fetch("http://localhost:3333/project/projects", {
          method: "POST",
          body: JSON.stringify({ userid: user.id }),
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const json = await res.json();
        setProjects(json);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setProjects([]);
      }
    };

    if (user?.id) {
      GetProjects();
    }
  }, [user]);

  return (
    <>
      <Toolbar />
      <div className="h-screen w-full flex flex-row p-4 gap-4">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard
              key={project.id} // Always provide a unique key
              id={project.id}
              name={project.name}
              description={project.description}
            />
          ))
        ) : (
          <p>No projects found</p>
        )}
      </div>
    </>
  );
};

export default Page;
