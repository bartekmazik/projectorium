import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarType {
  firstName: string;
  lastName: string;
  size: "big" | "small";
}

function UserAvatar({ firstName, lastName, size }: AvatarType) {
  return (
    <>
      <Avatar
        className={`h-${size === "big" ? "16" : "8"} w-${
          size === "big" ? "16" : "8"
        } border-2 border-primary z-0`}
      >
        <AvatarFallback
          className={`${size === "big" ? "text-lg" : "text-sm"} font-bold`}
        >{`${firstName[0]}${lastName[0]}`}</AvatarFallback>
      </Avatar>
    </>
  );
}

export default UserAvatar;
