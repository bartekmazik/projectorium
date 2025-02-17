"use client";
import React, { useEffect, useState } from "react";
import ProjectCard from "@/components/project/ProjectCard";
import Toolbar from "@/app/Dashboard/toolbar";
import { useUser } from "@/lib/AuthProvider";
import { useRouter } from "next/navigation";

const Page = () => {
  const [projects, setProjects] = useState([]);
  const { user, accessToken } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }

    const GetProjects = async () => {
      try {
        const res = await fetch("http://localhost:3333/project/projects", {
          method: "POST",
          body: JSON.stringify({ userid: user.id }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken} ` || "",
          },
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
  }, [user, router]);

  return (
    <>
      <Toolbar />
      <div className="h-screen w-full flex flex-row p-4 gap-4">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard
              key={project.id}
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
