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
import Link from "next/link";
import { CircleUserRound, SquareArrowOutUpRight } from "lucide-react";
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
          <Card className="w-96 min-h-48  hover:cursor-pointer">
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
              <CardDescription>{noteDate}</CardDescription>
            </CardHeader>
            <CardContent>{note.description}</CardContent>
          </Card>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw]  max-w-4xl">
        <DialogHeader>
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

  useEffect(() => {
    if (!id) return;

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
  }, [id]);

  return (
    <div className="m-8 flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between ">
        <Label className="text-3xl">Notes</Label>
        <AddNote />
      </div>
      <div className="flex flex-row justify-start items-center gap-2">
        {notes && notes.length > 0 ? (
          notes.map((note: Note, i) => {
            return <Note key={note.id} note={note} />;
          })
        ) : (
          <div>No notes yet</div>
        )}
      </div>
    </div>
  );
};

export default Notes;
