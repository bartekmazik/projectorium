import Link from "next/link";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUser } from "@/lib/AuthProvider";

const mySchema = z.object({
  code: z.string().min(1, "Code is required"),
});

const JoinProject = () => {
  const { user, accessToken } = useUser();
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(mySchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: { code: string }) => {
    try {
      const object = { userid: user?.id, code: data.code };
      const res = await fetch("http://localhost:3333/project/join", {
        method: "POST",
        body: JSON.stringify(object),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to join project");
      }

      form.reset(); // Reset the form
      setOpen(false); // Close the dialog
    } catch (error) {
      console.error("Error joining project:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Join project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter project code</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Join project</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

const Toolbar = () => {
  return (
    <div className="w-full h-16 ">
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
