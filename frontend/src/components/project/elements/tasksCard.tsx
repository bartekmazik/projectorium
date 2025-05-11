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
import { Label } from "@/components/ui/label";
import type { Task as TaskType } from "@/app/Project/[id]/Tasks/page";

const Task = ({
  title,
  points,
  date,
}: {
  title: string;
  points: number;
  date: Date;
}) => {
  const taskDate = new Date(date);
  const today = new Date();

  const timeLeft = Math.ceil(
    (taskDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <>
      <Button
        variant="ghost"
        className="flex flex-row justify-between cursor-default  rounded-none py-7 border-b "
      >
        <div className="flex flex-col items-start overflow-hidden truncate w-2/3">
          <p>{title}</p>

          <CardDescription>{timeLeft} days left</CardDescription>
        </div>
        <div>Points: {points}</div>
      </Button>
    </>
  );
};

const TasksCard = ({ tasks = [] }: { tasks?: TaskType[] }) => {
  const [completedTasks, setCompletedTasks] = useState<number>();
  const { accessToken } = useUser();
  const { id } = useParams();

  return (
    <>
      <Card className="w-full m-2 flex flex-col justify-between">
        <CardHeader className="flex flex-row justify-between items-center ">
          <CardTitle>Tasks 📝</CardTitle>
          <Link href={`/Project/${id}/Tasks`}>
            <SquareArrowOutUpRight className="w-6 h-6" />
          </Link>
        </CardHeader>
        <CardContent className="p-1">
          <ul className="flex flex-col border-t">
            {tasks.length > 0 ? (
              tasks.map((task: TaskType) => (
                <Task
                  title={task.title}
                  points={task.points}
                  date={task.dueDate}
                  key={task.id}
                />
              ))
            ) : (
              <Label className="flex justify-center items-center text-gray-500">
                No active tasks
              </Label>
            )}
          </ul>
        </CardContent>
        <CardFooter className="w-full flex flex-row justify-center my-4">
          <Label>Completed tasks: {completedTasks}</Label>
        </CardFooter>
      </Card>
    </>
  );
};

export default TasksCard;
