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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";

const ProfileCard = () => {
  return (
    <>
      <Card className="w-64 m-2">
        <CardHeader>
          <CardTitle>You</CardTitle>
        </CardHeader>
        <CardContent className="p-1 flex flex-col justify-center items-center">
          <CircleUserRound className="w-12 h-12 " />
          <Label>Level: 1</Label>
        </CardContent>
      </Card>
    </>
  );
};

export default ProfileCard;
