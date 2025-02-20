import React, { useState } from "react";
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
import {
  CircleUserRound,
  Crown,
  CrownIcon,
  SquareArrowOutUpRight,
} from "lucide-react";
import { UserPlus } from "lucide-react";
import { useParams } from "next/navigation";
import { DialogDescription } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Member = ({ user }: any) => {
  return (
    <>
      <div className="flex flex-row items-center justify-between  py-1 ">
        <div className="flex flex-row items-center gap-2 ">
          <CircleUserRound className="w-8 h-8 " />
          {`${user.firstName} ${user.lastName}`}
          {user.role === "ADMIN" ? <CrownIcon width={16} height={16} /> : <></>}
        </div>
      </div>
    </>
  );
};

interface TeamCardProps {
  users: any;
  code: string;
}

const TeamCard = ({ users, code }: TeamCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card className=" w-64 m-2 flex flex-col justify-between">
        <div>
          <CardHeader className="flex flex-row justify-between">
            <CardTitle>Team Members 🙎</CardTitle>
            <Button variant="ghost">Edit</Button>
          </CardHeader>
          <CardContent>
            {users.map((user) => {
              return <Member user={user} key={user.id} />;
            })}
          </CardContent>
        </div>
        <CardFooter className="flex flex-row justify-center">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Add members</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  Share this code with people you want to join your project
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-row items-center justify-start gap-2">
                Code: <p className="font-bold">{code}</p>
              </div>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </>
  );
};

export default TeamCard;
