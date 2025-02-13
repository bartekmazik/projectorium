import React from "react";
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
import { CircleUserRound } from "lucide-react";

const Task = () => {
  return (
    <>
      <Button
        variant="ghost"
        className="flex flex-row justify-between border-t rounded-none py-7"
      >
        <div className="flex flex-col items-start">
          <p>Przeniesc cegly na dach</p>
          <CardDescription>Status: aktywny</CardDescription>
        </div>
        <div>Go to task</div>
      </Button>
    </>
  );
};

const TasksCard = () => {
  return (
    <>
      <Card className=" w-96 m-2">
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
        </CardHeader>
        <CardContent className="p-1">
          <ul className="flex flex-col border-b">
            <Task />
            <Task />
            <Task />
          </ul>
        </CardContent>
      </Card>
    </>
  );
};

export default TasksCard;
