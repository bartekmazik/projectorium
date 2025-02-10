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

interface Month {
  month: string;
}
interface Task {
  description: string;
  date: string;
}

const Task = (props: Task) => {
  return (
    <>
      <Button
        variant="ghost"
        className="flex flex-row justify-between rounded-none w-full"
      >
        <div>{props.description}</div>
        <div>{props.date}</div>
      </Button>
    </>
  );
};

const MonthList = (props: Month) => {
  return (
    <>
      <CardTitle className="px-6">{props.month}</CardTitle>
      <CardContent className="p-2">
        <ul>
          <Task description={"Cos tam"} date={"20.12.2024"} />
          <Task description={"Cos jeszcze"} date={"20.12.2024"} />
        </ul>
      </CardContent>
    </>
  );
};

const CalendarCard = () => {
  return (
    <>
      <Card className=" w-96 m-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Calendar</CardTitle>
          <Button variant="ghost">
            <SquareArrowOutUpRight className="w-6 h-6" />
          </Button>
        </CardHeader>
        <MonthList month={"December"} />
        <MonthList month={"January"} />
        <MonthList month={"February"} />
      </Card>
    </>
  );
};

export default CalendarCard;
