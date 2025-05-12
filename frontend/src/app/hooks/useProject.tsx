import { useState, useEffect, useCallback } from "react";
import { useUser } from "@/lib/AuthProvider";
import { useParams } from "next/navigation";

interface Milestone {
  id: number;
  title: string;
  completedOn: Date;
  projectId: number;
  status: string;
}

interface User {
  user: {
    email: string;
    firstName: string;
    lastName: string;
    id: number;
  };
  role: string;
}
enum TaskStatus {
  TODO,
  SUBMITED,
  COMPLETED,
  DELETED,
}

interface TaskMember {
  user: {
    firstName: string;
    lastName: string;
  };
}
interface TaskRole {
  users: {
    role: string;
  }[];
}

interface Task {
  id: number;
  title: string;
  dueDate: Date;
  points: number;
  description: string;
  assignedTo: TaskMember[];
  project: TaskRole;
  status: "TODO" | "SUBMITED" | "COMPLETED";
}

interface Project {
  name: string;
  description: string;
  projectCode: string;
  users: User[];
  milestones: Milestone[];
  tasks: Task[];
}

const useProject = () => {
  const { id } = useParams();
  const { accessToken } = useUser();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProject = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/project/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}` || "",
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch project");

      const json = await res.json();

      setProject(json.project);
    } catch (error) {
      console.error("Error fetching project:", error);
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  }, [id, accessToken]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  return { project, isLoading, refetch: fetchProject };
};

export default useProject;
