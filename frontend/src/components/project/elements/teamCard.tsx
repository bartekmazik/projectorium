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
import { UserPlus } from "lucide-react";

interface Member {
  username: string;
  id: number;
}

const Member = (props: Member) => {
  return (
    <>
      <div className="flex flex-row items-center justify-between  py-1 ">
        <div className="flex flex-row items-center">
          <CircleUserRound className="w-8 h-8 mr-2" />
          {props.username}
        </div>
      </div>
    </>
  );
};

const TeamCard = () => {
  return (
    <>
      <Card className=" w-64 m-2 flex flex-col justify-between">
        <div>
          <CardHeader className="flex flex-row justify-between">
            <CardTitle>Team Members</CardTitle>
            <Button variant="ghost">Edit</Button>
          </CardHeader>
          <CardContent>
            <ul>
              <Member username={"John Dohea"} id={32} />
              <Member username={"Jack Willow"} id={33} />
              <Member username={"Dwayne Johnson"} id={32} />
              <Member username={"Robert Pick"} id={32} />
            </ul>
          </CardContent>
        </div>
        <CardFooter className="flex flex-row justify-center">
          <Button
            variant="ghost"
            className="flex flex-row justify-center items-center gap-1"
          >
            <UserPlus />
            Add new
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default TeamCard;
