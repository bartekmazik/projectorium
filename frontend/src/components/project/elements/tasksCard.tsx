import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CircleUserRound, SquareArrowOutUpRight } from "lucide-react";
import { useParams } from "next/navigation";
import { useUser } from "@/lib/AuthProvider";

const Task = ({ title }: { title: string }) => {
  return (
    <>
      <Button
        variant="ghost"
        className="flex flex-row justify-between border-t rounded-none py-7"
      >
        <div className="flex flex-col items-start">
          <p>{title}</p>

          <CardDescription>Status: aktywny</CardDescription>
        </div>
        <div>Go to task</div>
      </Button>
    </>
  );
};

const TasksCard = ({ id }: { id: string }) => {
  const [tasks, setTasks] = useState([]);
  const { accessToken } = useUser();
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
    <>
      <Card className=" w-96 m-2">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Tasks</CardTitle>
          <Link href={`/Project/${id}/Tasks`}>
            <SquareArrowOutUpRight className="w-6 h-6" />
          </Link>
        </CardHeader>
        <CardContent className="p-1">
          <ul className="flex flex-col border-b">
            {tasks ? (
              tasks.map((task) => <Task title={task.title} key={task.id} />)
            ) : (
              <div>Not found tasks</div>
            )}
          </ul>
        </CardContent>
      </Card>
    </>
  );
};

export default TasksCard;
