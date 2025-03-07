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
import { Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";
import { useUser } from "@/lib/AuthProvider";
import { Label } from "@/components/ui/label";
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

function Note({ note }: { note: Note }) {
  const noteDate = new Date(note.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return (
    <>
      <Button
        variant="ghost"
        className="flex flex-row justify-between border-t rounded-none py-7"
      >
        <div className="flex flex-col items-start">
          <p>{note.title}</p>
          <CardDescription>{noteDate}</CardDescription>
        </div>
      </Button>
    </>
  );
}

const NotesCard = () => {
  const { id } = useParams();
  const { accessToken } = useUser();
  const [notes, setNotes] = useState<Note[]>([]);

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
    <>
      <Card className="w-96 m-2 flex flex-col justify-between items-start">
        <div className="w-full">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Notes 🗒️</CardTitle>
            <Link href={`/Project/${id}/Notes`}>
              <SquareArrowOutUpRight className="w-6 h-6" />
            </Link>
          </CardHeader>
          <CardContent className="p-1">
            <ul
              className={`flex flex-col h-full ${
                notes?.length > 0 ? "border-b" : ""
              }`}
            >
              {notes && notes.length > 0 ? (
                notes.map((note: Note, i) => <Note note={note} key={i} />)
              ) : (
                <Label className="flex  justify-center items-center text-gray-500">
                  No notes
                </Label>
              )}
            </ul>
          </CardContent>
        </div>
      </Card>
    </>
  );
};

export default NotesCard;
