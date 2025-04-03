"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useUser } from "@/lib/AuthProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const noteSchema = z.object({
  title: z.string().min(1, "Note title is required"),
  description: z.string().min(1, "Note is required"),
});

const AddNote = ({ refetch }: { refetch: any }) => {
  const { user, accessToken } = useUser();
  const [open, setOpen] = useState(false);
  const { id } = useParams();

  const form = useForm<{
    title: string;
    description: string;
  }>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (data: { title: string; description: string }) => {
    try {
      const noteObject = {
        title: data.title,
        description: data.description,
        userId: user?.id,
        projectId: Number(id),
      };

      const res = await fetch(`http://localhost:3333/project/${id}/note`, {
        method: "POST",
        body: JSON.stringify(noteObject),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to create note");
      }

      form.reset();
      setOpen(false);
      refetch();
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Add Note</Button>
        </DialogTrigger>
        <DialogContent className="w-full max-w-[90%] sm:max-w-[425px] p-4 sm:p-6 rounded-xl z-[100000]">
          <DialogHeader>
            <DialogTitle>Create a Note</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Note </FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter className="flex flex-col gap-4">
                <Label>
                  Your note will be visible for all members of your project
                </Label>
                <Button type="submit">Create Note</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNote;
