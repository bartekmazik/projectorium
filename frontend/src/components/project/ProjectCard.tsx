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
    <Link
      href={`/Project/${id}`}
      className="block w-full sm:min-w-64 sm:max-w-2xl"
    >
      <Card className="h-64 w-full my-2 flex flex-col justify-between transition-colors hover:bg-accent hover:text-accent-foreground">
        <CardHeader>
          <CardTitle className="text-lg">{name}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground line-clamp-3">
            {description}
          </CardDescription>
        </CardHeader>

        <CardFooter className="pt-2 text-sm text-muted-foreground">
          Current stage: {milestone?.title || "No stage yet"}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProjectCard;
