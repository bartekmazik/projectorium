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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import LoadingSpinner from "@/components/LoadingSpinner";

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

export interface Task {
  id: number;
  title: string;
  dueDate: Date;
  description: string;
  assignedTo: TaskMember[];
  project: TaskRole;
  status: "TODO" | "SUBMITED" | "COMPLETED";
}

function Task({
  task,
  refetch,
  setLoading,
}: {
  task: Task;
  refetch: any;
  setLoading: any;
}) {
  const { id } = useParams();
  const { accessToken } = useUser();
  const [taskStatus, setTaskStatus] = useState<string>(task.status);

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
    setLoading(true);
    try {
      const object = { status: newStatus, taskid: task.id };

      const res = await fetch(
        `http://localhost:3333/project/${id}/changetaskstatus`,
        {
          method: "POST",
          body: JSON.stringify(object),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to change task status");
      }
      setTaskStatus(newStatus);
      refetch();
      setTimeout(() => setLoading(false), 500);
    } catch (error) {
      console.error("Error joining project:", error);
      setLoading(false);
    }
  };

  function ActionButton() {
    switch (taskStatus) {
      case "TODO": {
        return <Button onClick={() => handleTask("SUBMITED")}>Hand-in</Button>;
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
    <Card className="w-full my-2 p-4 md:p-6 overflow-hidden ">
      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
        <div className="space-y-4">
          <div className="w-2/3 text-wrap">
            <h3 className="w-[70vw]  font-semibold break-words line-clamp-3">
              {task.title}
            </h3>
            <p className="w-[70vw] text-sm text-muted-foreground mt-2 break-words line-clamp-10 ">
              {task.description}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex -space-x-2 ">
              {task.assignedTo.map((member, index) => (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Avatar className="border-2 border-background h-8 w-8">
                        <AvatarFallback>
                          {member.user.firstName[0]}
                        </AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>
                      <Label>
                        {member.user.firstName} {member.user.lastName}
                      </Label>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
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
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const { accessToken } = useUser();

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:3333/project/${id}/task`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}` || "",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch tasks");

      const json = await res.json();

      setTasks(json.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  useEffect(() => {
    if (!id || !accessToken) return;
    fetchData();
  }, [id, accessToken]);

  return (
    <div className="p-6 ">
      <div className="flex justify-between items-center font-bold text-3xl">
        <div className="flex flex-row justify-center items-center gap-2">
          <Link href={`/Project/${id}`}>
            <Button variant={"ghost"}>
              <ArrowLeft />
            </Button>
          </Link>
          Tasks 📝{" "}
        </div>
        <AddTask refetch={fetchData} />
      </div>
      <div className="pt-8 w-full h-full">
        {loading ? (
          <LoadingSpinner />
        ) : tasks && tasks?.length > 0 ? (
          tasks
            .reverse()
            .map((task, i) => (
              <Task
                task={task}
                refetch={fetchData}
                setLoading={setLoading}
                key={i}
              />
            ))
        ) : (
          <div className="pt-4 w-full flex flex-col justify-start items-center gap-4">
            <Label className="font-semibold text-xl">
              Such empty here! Add task or wait for your leader to add one!
            </Label>
            <div className="relative w-64 h-64">
              <Image src="/notasks.svg" fill={true} alt="no tasks" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
