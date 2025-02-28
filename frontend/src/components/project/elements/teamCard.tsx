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

const Member = ({ user }: any) => {
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
          {user.role === "ADMIN" ? <Label>(Admin)</Label> : <></>}
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
  const copycode = (e: any) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <>
      <Card className=" w-64 m-2 flex flex-col justify-between">
        <div>
          <CardHeader className="flex flex-row justify-between">
            <CardTitle>Team 🙎</CardTitle>
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
