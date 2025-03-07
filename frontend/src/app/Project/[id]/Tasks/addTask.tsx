"use client";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUser } from "@/lib/AuthProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const taskSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  description: z.string().min(1, "Task description is required"),
  points: z.string(),
  dueDate: z.date({ required_error: "Due date is required" }),
  assignedToIds: z
    .array(z.number())
    .nonempty("At least one user must be selected"),
});

const AddTask = ({ refetch }: { refetch: any }) => {
  const [users, setUsers] = useState([]);
  const { user, accessToken } = useUser();
  const [open, setOpen] = useState(false);
  const { id } = useParams();

  const form = useForm<{
    title: string;
    description: string;
    points: string;
    dueDate: Date;
    assignedToIds: number[];
  }>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: new Date(),
      points: "0",
      assignedToIds: [],
    },
  });

  useEffect(() => {
    const GetUsers = async () => {
      try {
        const res = await fetch(`http://localhost:3333/project/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}` || "",
          },
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const json = await res.json();
        setUsers(json.members);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    if (user?.id) {
      GetUsers();
    }
  }, [user]);

  const { setValue, watch } = form;
  const selectedUsers = watch("assignedToIds");

  const handleCheckboxChange = (userId: number) => {
    setValue(
      "assignedToIds",
      selectedUsers.includes(userId)
        ? selectedUsers.filter((id) => id !== userId)
        : [...selectedUsers, userId]
    );
  };

  const onSubmit = async (data: {
    title: string;
    description: string;
    points: string;
    dueDate: Date;
    assignedToIds: number[];
  }) => {
    try {
      const taskObject = {
        title: data.title,
        description: data.description,
        points: parseInt(data.points),
        status: "TODO",
        projectId: Number(id),
        assignedToIds: data.assignedToIds,
        dueDate: data.dueDate.toISOString(),
      };

      const res = await fetch("http://localhost:3333/task/create", {
        method: "POST",
        body: JSON.stringify(taskObject),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to create task");
      }

      form.reset();
      setOpen(false);
      //refetch tasks
      refetch();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Add Task</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] z-[10000]">
          <DialogHeader>
            <DialogTitle>Create a Task</DialogTitle>
            <DialogDescription>
              Give us simple information about task
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Task Title</FormLabel>
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
                      <FormLabel>Task Description</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="points"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Points</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          inputMode="numeric"
                          min={1}
                          max={10}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Calendar Component */}
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>Due Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline">
                            {field.value
                              ? format(field.value, "PPP")
                              : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0 z-[100001]"
                          align="start"
                          side="bottom"
                        >
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) =>
                              date && setValue("dueDate", date)
                            }
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel>Assign to</FormLabel>
                  <div className="flex flex-col gap-2 mt-2">
                    {users.length > 0 ? (
                      users.map((user) => (
                        <label
                          key={user.id}
                          className="flex items-center gap-2"
                        >
                          <Checkbox
                            checked={selectedUsers.includes(user.id)}
                            onCheckedChange={() =>
                              handleCheckboxChange(user.id)
                            }
                          />
                          {user.email}
                        </label>
                      ))
                    ) : (
                      <p>No users available</p>
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Task</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddTask;
