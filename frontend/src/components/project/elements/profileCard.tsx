import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";
import UserAvatar from "@/components/UserAvatar";
import { useUser } from "@/lib/AuthProvider";
const ProfileCard = () => {
  // This would typically come from your user data
  const { user } = useUser();
  const [profile, setProfile] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    level: user?.level,
    currentPoints: user?.experience,
    pointsToNextLevel: 10 + user?.level * 5,
    rank: "Diamond",
  });

  // Calculate progress percentage
  const progressPercentage =
    (profile.currentPoints / profile.pointsToNextLevel) * 100;

  return (
    <>
      {/* " w-96 m-2 flex flex-col justify-start items-start gap-4" */}
      <Card className="w-96 m-2 overflow-hidden ">
        <CardHeader className="p-6 pb-0 flex flex-row items-center gap-4">
          <UserAvatar
            firstName={user?.firstName}
            lastName={user?.lastName}
            size="big"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{profile.firstName}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge
                variant="outline"
                className="bg-primary/10 text-primary border-primary/20"
              >
                Level {profile.level}
              </Badge>
              <Badge className="flex items-center gap-1 bg-amber-500">
                <Trophy className="h-3 w-3" />
                {profile.rank}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Progress to Level {profile.level + 1}
                </span>
                <span className="font-medium">
                  {profile.currentPoints} / {profile.pointsToNextLevel}
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            <div className="pt-2 border-t">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Current Rank
                </span>
                <span className="font-semibold flex items-center gap-1.5">
                  <Trophy className="h-4 w-4 text-amber-500" />
                  {profile.rank}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ProfileCard;
