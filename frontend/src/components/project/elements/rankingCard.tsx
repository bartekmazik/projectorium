import React, { useEffect, useState } from "react";
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
import { Pencil } from "lucide-react";
import { useUser } from "@/lib/AuthProvider";
import { useParams } from "next/navigation";
import { Label } from "@/components/ui/label";

const RankingUser = ({ user, points }: { user: any; points: number }) => {
  return (
    <>
      <Button
        variant="ghost"
        className="flex flex-row cursor-default justify-between border-t rounded-none py-7"
      >
        <p>{`${user.firstName} ${user.lastName.split("")[0]}.`}</p>
        <div>Points: {points}</div>
      </Button>
    </>
  );
};

const RankingCard = () => {
  const [ranking, setRanking] = useState<any>();
  const { accessToken } = useUser();
  const { id } = useParams();

  useEffect(() => {
    const fetchRanking = async () => {
      const res = await fetch(`http://localhost:3333/project/${id}/ranking`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const json = await res.json();

      setRanking(json);
    };

    fetchRanking();
  }, [accessToken, id]);
  return (
    <>
      <Card className="w-full m-2 flex flex-col justify-between items-start">
        <div className="w-full">
          <CardHeader>
            <CardTitle>Ranking 🏆</CardTitle>
          </CardHeader>
          <CardContent className="p-1">
            <ul className="flex flex-col border-b">
              {ranking && ranking.length > 0 ? (
                ranking.map((rankingUser: any, i: number) => (
                  <RankingUser
                    user={rankingUser.user}
                    points={rankingUser.pointsCount}
                    key={i}
                  />
                ))
              ) : (
                <div>Brak rankingu</div>
              )}
            </ul>
          </CardContent>
        </div>
        <CardFooter className="w-full flex flex-row justify-center my-4">
          <Label>Complete tasks to get more points! 🎯</Label>
        </CardFooter>
      </Card>
    </>
  );
};

export default RankingCard;
