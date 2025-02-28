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
import { SquareArrowOutUpRight } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
const MentorCard = () => {
  const { id } = useParams();
  return (
    <>
      <Card className=" w-96 m-2 flex flex-col justify-start items-start gap-4">
        <CardHeader>
          <CardTitle>Your Mentor 🧠</CardTitle>
          <CardDescription>Get help from your AI Assistant</CardDescription>
        </CardHeader>

        <CardContent className="self-center ">
          <Button>
            <Link href={`/Project/${id}/Chat`}>Start chat</Link>
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default MentorCard;
