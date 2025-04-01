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

// Destructure props to get `name` and `description`
const ProjectCard = ({
  id,
  name,
  description,
  milestone,
}: {
  id: number;
  name: string;
  description: string;
  milestone: any;
}) => {
  return (
    <>
      <Link href={`/Project/${id}`} className="h-48 w-full sm:w-64">
        <Card className="h-48 w-full sm:w-64 my-2 flex transition-colors hover:bg-accent hover:text-accent-foreground flex-col justify-between">
          <CardHeader>
            <CardTitle>{name}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>

          <CardFooter>
            {milestone ? (
              <div>Stage: {milestone?.title}</div>
            ) : (
              <div>Stage: No stage yet</div>
            )}
          </CardFooter>
        </Card>
      </Link>
    </>
  );
};

export default ProjectCard;
