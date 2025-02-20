"use client";

import { useUser } from "@/lib/AuthProvider";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import AddTask from "./addTask";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";

enum TaskStatus {
  TODO,
  SUBMITED,
  COMPLETED,
  DELETED,
}

interface TaskMember {
  user: {
    email: string;
  };
}
interface TaskRole {
  users: {
    role: string;
  }[];
}

export interface Task {
  id: number;
  title: string;
  description: string;
  assignedTo: TaskMember[];
  project: TaskRole;
  status: "TODO" | "SUBMITED" | "COMPLETED";
}

function Task({ task }: { task: Task }) {
  const { id } = useParams();
  const { accessToken } = useUser();
  const [taskStatus, setTaskStatus] = useState<string>(task.status);
  const router = useRouter();
  const getStatusColor = (status: string) => {
    switch (status) {
      case "TODO":
        return "bg-muted text-muted-foreground";
      case "SUBMITED":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "COMPLETED":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-muted text-muted-foreground";
    }
  };
  const handleTask = async (newStatus: string) => {
    try {
      const object = { status: newStatus, taskid: task.id };

      const res = await fetch(`http://localhost:3333/task/${id}/changestatus`, {
        method: "POST",
        body: JSON.stringify(object),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to change task status");
      }
      setTaskStatus(newStatus);
      router.refresh();
    } catch (error) {
      console.error("Error joining project:", error);
    }
  };

  function ActionButton() {
    switch (taskStatus) {
      case "TODO": {
        return <Button onClick={() => handleTask("SUBMITED")}>Return</Button>;
      }
      case "SUBMITED": {
        switch (task.project.users[0].role) {
          case "ADMIN": {
            return (
              <div className="flex flex-row justify-center items-center gap-2">
                <Button onClick={() => handleTask("COMPLETED")}>Accept</Button>
                <Button onClick={() => handleTask("TODO")}>Return</Button>
              </div>
            );
          }
          case "MEMBER": {
            return <Badge variant={"secondary"}>Handed-in</Badge>;
          }
        }
      }
      case "COMPLETED": {
        switch (task.project.users[0].role) {
          case "ADMIN": {
            return (
              <Button
                variant={"destructive"}
                onClick={() => handleTask("DELETED")}
              >
                <Trash2 />
              </Button>
            );
          }
          case "MEMBER": {
            return <Badge variant={"secondary"}>Completed</Badge>;
          }
        }
      }
    }
  }

  return (
    <Card className="w-full p-4 md:p-6">
      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold leading-none tracking-tight">
              {task.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              {task.description}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex -space-x-2">
              {task.assignedTo.map((member, index) => (
                <Avatar
                  key={index}
                  className="border-2 border-background h-8 w-8"
                >
                  <AvatarFallback>
                    {member.user.email
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <Badge
              variant="secondary"
              className={`${getStatusColor(taskStatus)} capitalize`}
            >
              {taskStatus.replace("-", " ")}
            </Badge>
          </div>
        </div>
        <div className="flex items-start justify-end">
          <ActionButton />
        </div>
      </div>
    </Card>
  );
}

const page = () => {
  const [tasks, setTasks] = useState<Task[]>();

  const { id } = useParams();
  const accessToken = useUser().accessToken;

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const projectId = Number(id);
      try {
        const res = await fetch(`http://localhost:3333/task/get/${projectId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}` || "",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch project");

        const json = await res.json();

        setTasks(json.tasks);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center font-bold text-3xl">
        <div className="flex flex-row justify-center items-center gap-2">
          <Link href={`/Project/${id}`}>
            <Button variant={"ghost"}>
              <ArrowLeft />
            </Button>
          </Link>
          Tasks 📝{" "}
        </div>
        <AddTask />
      </div>
      <div className="pt-8">
        {tasks && tasks.length > 0 ? (
          tasks.map((task, i) => <Task task={task} key={i} />)
        ) : (
          <div>No tasks yet </div>
        )}
      </div>
    </div>
  );
};

export default page;
