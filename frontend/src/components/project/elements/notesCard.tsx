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
import { Pencil } from "lucide-react";
const Note = () => {
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
        <div>
          <Button variant="ghost">Edit</Button>
        </div>
      </Button>
    </>
  );
};

const NotesCard = () => {
  return (
    <>
      <Card className="w-96 m-2 flex flex-col justify-between items-start">
        <div className="w-full">
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent className="p-1">
            <ul className="flex flex-col border-b">
              <Note />
              <Note />
              <Note />
            </ul>
          </CardContent>
        </div>
        <CardFooter className="w-full flex flex-row justify-between">
          <Button
            variant="ghost"
            className="flex flex-row justify-center items-center gap-1"
          >
            <Pencil />
            Add new
          </Button>
          <Button variant="ghost">See all </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default NotesCard;
