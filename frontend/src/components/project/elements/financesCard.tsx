"use client";

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
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { SquareArrowOutUpRight } from "lucide-react";

const data = {
  labels: ["Unfinished", "Done"],
  datasets: [
    {
      data: [12, 29],
      backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
      borderWidth: 1,
    },
  ],
};
const Member = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  return (
    <>
      <Pie data={data} />
    </>
  );
};

const FinancesCard = () => {
  return (
    <>
      <Card className="w-64 m-2">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Finances</CardTitle>
          <Button variant="ghost">
            <SquareArrowOutUpRight className="w-6 h-6" />
          </Button>
        </CardHeader>
        <CardContent>
          <ul>
            <Member />
          </ul>
        </CardContent>
      </Card>
    </>
  );
};

export default FinancesCard;
