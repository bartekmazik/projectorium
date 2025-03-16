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
import { CheckCircle } from "lucide-react";
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

const MilestonesCard = ({ milestones }: { milestones: Milestone[] }) => {
  const [currentStage, setCurrentStage] = useState<Milestone>();
  const [completedStages, setCompletedStages] = useState<Milestone[]>([]);
  const [newMilestone, setNewMilestone] = useState("");
  const { accessToken } = useUser();
  const { id } = useParams();

  async function addMilestone() {
    console.log(newMilestone);
    if (!newMilestone) return;
    const milestoneData = { title: newMilestone };
    try {
      await fetch(`http://localhost:3333/project/${id}/milestone/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(milestoneData),
      });
      toast.success("Milestone added successfully", {
        description: `The milestone "${newMilestone}" was added.`,
      });
      setNewMilestone("");
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
    <Card className="w-full max-w-md">
      <CardHeader className="border-b pb-3 flex flex-row justify-between items-center">
        <CardTitle className="text-2xl">Current Stage</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost">+</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Milestone</DialogTitle>
            </DialogHeader>
            <Input
              placeholder="Milestone title"
              value={newMilestone}
              onChange={(e) => setNewMilestone(e.target.value)}
            />
            <DialogClose>
              <Button onClick={addMilestone}>Add</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="p-3 bg-primary/10 rounded-md mb-6">
          {currentStage ? (
            <p className="font-medium text-primary">{currentStage?.title}</p>
          ) : (
            <div>Dodaj milestone</div>
          )}
        </div>
        <>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            Completed Stages
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                {completedStages.length > 0 &&
                  completedStages.map((stage) => (
                    <p key={stage.id} className="font-medium">
                      {stage.title}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </>
      </CardContent>
    </Card>
  );
};

export default MilestonesCard;
