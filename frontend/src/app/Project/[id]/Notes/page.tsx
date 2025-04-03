"use client";
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
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CircleUserRound,
  SquareArrowOutUpRight,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useUser } from "@/lib/AuthProvider";
import AddNote from "./addNote";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
interface Note {
  id: number;
  createdAt: Date;
  createdBy: {
    firstName: string;
    lastName: string;
    id: number;
  };
  title: string;
  description: string;
}

const Note = ({ note }: { note: Note }) => {
  const [open, setOpen] = useState(false);

  const noteDate = new Date(note.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          asChild
          variant={"ghost"}
          className="flex flex-col justify-start items-start"
        >
          <Card className="w-full sm:min-w-96 min-h-48  hover:cursor-pointer">
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
              <CardDescription>{noteDate}</CardDescription>
            </CardHeader>
            <CardContent>{note.description}</CardContent>
          </Card>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[90%] p-4 sm:p-6 rounded-xl z-[10000] sm:w-[90vw]  sm:max-w-4xl">
        <DialogHeader className="flex flex-col items-start">
          <DialogTitle>{note.title}</DialogTitle>
          <DialogDescription>
            {noteDate} by {note.createdBy.firstName} {note.createdBy.lastName}
          </DialogDescription>
        </DialogHeader>
        <Label className="min-h-[30vh]">{note.description}</Label>
      </DialogContent>
    </Dialog>
  );
};

const Notes = () => {
  const { id } = useParams();
  const { accessToken } = useUser();
  const [notes, setNotes] = useState<Note[]>();

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:3333/project/${id}/note`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}` || "",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch notes");

      const json = await res.json();
      setNotes(json.notes);
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };
  fetchData();

  return (
    <div className="my-4 sm:my-8 flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between ">
        <div className="flex flex-row justify-center items-center gap-2 text-3xl font-semibold">
          <Link href={`/Project/${id}`}>
            <Button variant={"ghost"}>
              <ArrowLeft />
            </Button>
          </Link>
          Notes 🗒️
        </div>
        <AddNote refetch={fetchData} />
      </div>
      <div className="flex flex-col sm:flex-row justify-start items-center gap-2">
        {notes && notes.length > 0 ? (
          notes.map((note: Note, i) => {
            return <Note key={note.id} note={note} />;
          })
        ) : (
          <div className="pt-4 w-full flex flex-col justify-start items-center gap-4">
            <Label className="font-semibold text-xl">
              Such empty here! Try adding some notes!
            </Label>
            <div className="relative w-64 h-64">
              <Image src="/nonotes.svg" fill={true} alt="no tasks" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
