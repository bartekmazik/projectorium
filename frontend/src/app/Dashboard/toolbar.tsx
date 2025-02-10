import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const JoinProject = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Join project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter project code</DialogTitle>
        </DialogHeader>
        <div>
          <Input />
        </div>
        <div>TUTAJ BEDIZE PREVIEW PROJEKTU O ILE WYSZUKA</div>
        <DialogFooter>
          <Button type="submit">Join</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const Toolbar = () => {
  return (
    <div className="w-full h-16 dark:border-border border-b-primary-foreground border-b shadow-md">
      <div className="flex items-center justify-start gap-6 h-full px-6">
        <Link href="/Dashboard/ProjectCreator">
          <Button>Create new project</Button>
        </Link>
        <JoinProject />
        <Button variant={"destructive"}>Delete project</Button>
      </div>
    </div>
  );
};

export default Toolbar;
