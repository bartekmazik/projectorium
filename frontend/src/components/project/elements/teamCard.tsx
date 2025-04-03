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
  Copy,
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
import { Label } from "@/components/ui/label";
import UserAvatar from "@/components/UserAvatar";
import { User } from "@/app/Project/[id]/page";

const Member = ({ user, role }: any) => {
  return (
    <>
      <div className="flex flex-row items-center justify-between  py-1 ">
        <div className="flex flex-row items-center gap-1 ">
          <UserAvatar
            firstName={user.firstName}
            lastName={user.lastName}
            size="small"
          />
          <Label>{`${user.firstName} ${user.lastName}`}</Label>
          {role === "ADMIN" ? <Label>(Admin)</Label> : <></>}
        </div>
      </div>
    </>
  );
};

interface TeamCardProps {
  users: User[];
  code: string;
}

const TeamCard = ({ users, code }: TeamCardProps) => {
  const [open, setOpen] = useState(false);
  const copycode = (e: any) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <>
      <Card className=" w-full m-2 flex flex-col justify-between">
        <div>
          <CardHeader className="flex flex-row justify-between">
            <CardTitle>Team 🙎</CardTitle>
          </CardHeader>
          <CardContent>
            {users.map((user: any, i: number) => {
              return <Member user={user.user} role={user.role} key={i} />;
            })}
          </CardContent>
        </div>
        <CardFooter className="flex flex-row justify-center">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Add members</Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-[90%] sm:max-w-[425px] min-h-36 p-4 sm:p-6 rounded-xl">
              <DialogHeader>
                <DialogTitle className="w-4/5 text-start">
                  Share this code with people you want to join your project
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-row items-center justify-start gap-2">
                Code: <p className="font-semibold">{code}</p>
                <Button
                  variant={"ghost"}
                  className="flex justify-center items-center"
                >
                  <Copy onClick={copycode} width={16} />
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </>
  );
};

export default TeamCard;
