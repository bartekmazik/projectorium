"use client";
import React, { useEffect, useState } from "react";
import ProjectCard from "@/components/project/ProjectCard";
import Toolbar from "@/app/Dashboard/toolbar";
import { useUser } from "@/lib/AuthProvider";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import LoadingSpinner from "@/components/LoadingSpinner";

interface ProjectButton {
  name: string;
  description: string;
  milestones: any;
  id: number;
}

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState<ProjectButton[]>([]);
  const { accessToken } = useUser();
  const router = useRouter();

  const GetProjects = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/project/projects`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken} ` || "",
          },
        }
      );

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const json = await res.json();

      setProjects(json);
      setTimeout(() => setIsLoading(false), 1000);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      setProjects([]);
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  useEffect(() => {
    GetProjects();
  }, [router]);

  return (
    <>
      <Toolbar refetch={GetProjects} />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="h-full flex flex-col flex-wrap sm:flex-row sm:p-4 gap-4">
          {projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                name={project.name}
                description={project.description}
                milestone={project.milestones[0]}
              />
            ))
          ) : (
            <div className="pt-12 w-full flex flex-col justify-start items-center gap-4">
              <Label className="font-semibold text-2xl">
                No projects found, create one!
              </Label>
              <div className="relative w-full h-40 sm:h-1/4 ">
                <Image
                  src="/noprojects.svg"
                  fill={true}
                  alt="not found"
                  priority={true}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Page;
