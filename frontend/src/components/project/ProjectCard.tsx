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
}: {
  id: number;
  name: string;
  description: string;
}) => {
  return (
    <>
      <Card className="h-64 w-64 m-2">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Status: active</p>
        </CardContent>
        <CardFooter>
          <Link href={`/Project/${id}`}>
            <Button variant="ghost">Go to project</Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};

export default ProjectCard;
