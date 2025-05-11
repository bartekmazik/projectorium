import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useUser } from "@/lib/AuthProvider";
import { CheckCircle, Plus, PlusCircle } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import useProject from "@/app/hooks/useProject";

enum Stage {
  COMPLETED,
  WORKING,
  UPCOMING,
}
interface Milestone {
  id: number;
  title: string;
  completedOn: Date;
  projectId: number;
  status: string;
}

const MilestonesCard = ({
  milestones,
  refetch,
}: {
  milestones: Milestone[];
  refetch: any;
}) => {
  const [currentStage, setCurrentStage] = useState<Milestone>();
  const [completedStages, setCompletedStages] = useState<Milestone[]>([]);
  const [newMilestone, setNewMilestone] = useState("");
  const { accessToken } = useUser();
  const { id } = useParams();

  async function addMilestone() {
    if (!newMilestone) return;
    const milestoneData = { title: newMilestone };
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/project/${id}/milestone/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(milestoneData),
        }
      );
      toast.success("Milestone added successfully", {
        description: `The milestone "${newMilestone}" was added.`,
      });
      setNewMilestone("");
      refetch();
    } catch (error: any) {
      toast.error("Error adding milestone", {
        description: error.message || "Something went wrong.",
      });
    }
  }

  useEffect(() => {
    if (milestones?.length) {
      setCurrentStage(
        milestones.find((milestone) => milestone.status === "WORKING")
      );
      setCompletedStages(
        milestones.filter((milestone) => milestone.status === "FINISHED")
      );
    }
  }, [milestones]);

  return (
    <Card className="w-full m-2 max-w-md">
      <CardHeader className="border-b  flex flex-row justify-between items-center">
        <CardTitle className="text-2xl">Current Objective 🎯</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost">
              <PlusCircle />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full flex flex-col max-w-[90%] sm:max-w-[425px] p-4 sm:p-6 rounded-xl z-[10000]">
            <DialogHeader>
              <DialogTitle>Add objective</DialogTitle>
            </DialogHeader>
            <Input
              placeholder="Milestone title"
              value={newMilestone}
              onChange={(e) => setNewMilestone(e.target.value)}
            />
            <DialogClose className="self-end">
              <Button onClick={addMilestone}>Add</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="py-4">
        <div className="p-3 bg-primary/10 rounded-md mb-6">
          {currentStage ? (
            <p className="font-medium text-primary break-words line-clamp-4 ">
              {currentStage?.title}
            </p>
          ) : (
            <div>No objectives yet</div>
          )}
        </div>
        {completedStages.length > 0 && (
          <>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Completed Stages
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="text-wrap overflow-y-scroll">
                  {completedStages.length > 0 &&
                    completedStages.map((stage, i) => (
                      <div className="flex flex-row items-start gap-2" key={i}>
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <p
                          key={stage.id}
                          className="font-medium break-words  w-80 pb-3"
                        >
                          {stage.title}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default MilestonesCard;
