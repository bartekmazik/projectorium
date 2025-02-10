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

const ProjectCard = () => {
  return (
    <>
      <Card className="h-64 w-64 m-2">
        <CardHeader>
          <CardTitle>Biwak</CardTitle>
          <CardDescription>PANEUROPA</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Status: active</p>
        </CardContent>
        <CardFooter>
          <Link href="/Project">
            <Button variant="ghost">Go to project</Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};

export default ProjectCard;
