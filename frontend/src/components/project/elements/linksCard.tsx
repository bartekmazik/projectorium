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

const ServiceLink = () => {
  return (
    <>
      <Button
        variant="ghost"
        className="flex flex-row justify-between border-t rounded-none py-7"
      >
        <div className="flex flex-row items-center justify-center gap-2">
          <Image
            src="/googledrive.svg"
            alt="Google Drive"
            width={32}
            height={32}
          />
          <p>Dysk Google</p>
        </div>
        <div>
          <Button variant="ghost">
            <SquareArrowOutUpRight />
          </Button>
        </div>
      </Button>
    </>
  );
};

const LinksCard = () => {
  return (
    <>
      <Card className=" w-96 m-2">
        <CardHeader>
          <CardTitle>Services</CardTitle>
        </CardHeader>
        <CardContent className="p-1">
          <ul className="flex flex-col border-b">
            <ServiceLink />
            <ServiceLink />
            <ServiceLink />
            <ServiceLink />
            <ServiceLink />
          </ul>
        </CardContent>
      </Card>
    </>
  );
};

export default LinksCard;
