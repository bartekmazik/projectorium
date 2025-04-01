"use client";
//import { authRequestSchema, AuthResponseData } from "@/common/dto/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
//import { ApiResponse } from "@/common/objects/apiResponse";
import { ChangeEvent, ChangeEventHandler, useContext, useEffect } from "react";
//import { AuthContext } from "@/components/panel/authProvider";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage /*FormRootError*/,
} from "@/components/ui/form";
import { toast } from "sonner";
import ImageSelect from "./ImageSelect";

import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Ghost } from "lucide-react";
import { useUser } from "@/lib/AuthProvider";

const mySchema = z.object({
  name: z.string(),
  description: z.string(),

  // teamMembers: z.array(z.string()).optional(),
  // projectType: z.string().optional(),
  // projectStatus: z.string().optional(),
  // projectStartDate: z.string().optional(),
  // projectEndDate: z.string().optional(),
  // projectImage: z.string().optional(),
});
export default function CreateProject() {
  const router = useRouter();
  const { accessToken } = useUser();

  const form = useForm({
    resolver: zodResolver(mySchema),
    defaultValues: {
      name: "",
      description: "",

      // projectType: "",
      // projectStatus: "",
      // projectStartDate: "",
      // projectEndDate: "",
      // projectImage: "",
    },
  });

  const onSubmit = async (prop: any) => {
    const res = await fetch("http://localhost:3333/project/create", {
      method: "POST",
      body: JSON.stringify(prop),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken} ` || "",
      },
    });

    toast.success("Projekt utworzony", {
      className:
        "!border-green-200 !bg-gradient-to-t !from-[#00ff0006] !to-[#00ff0002]",
      duration: 7 * 1000,
    });
    router.push("/Dashboard");
  };

  return (
    <main className=" w-full h-screen p-4">
      <Link href="/Dashboard">
        <Button variant="ghost">Go back</Button>
      </Link>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Create new project</CardTitle>
            <CardDescription>
              Give us some information about your project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="flex flex-row">
                <div className="w-full sm:w-1/2 flex flex-col gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="sm:w-4/5">
                        <FormLabel>Project name</FormLabel>
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
                        <FormLabel>Description of your project</FormLabel>
                        <FormControl>
                          <Textarea
                            className="sm:w-4/5 h-32 max-h-64"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {/*<FormField
                    control={form.control}
                    name="projectType"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex flex-col gap-4 justify-start">
                          <FormLabel>Type of your project</FormLabel>
                          <FormControl>
                            <Select>
                              <SelectTrigger className="w-[240px]">
                                <SelectValue placeholder="Theme" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="projectImage"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center">
                      <FormLabel>Set image for your project</FormLabel>
                      <FormControl>
                        <button className="w-64 h-64 border rounded-sm flex items-center justify-center ">
                          <ImageSelect />
                        </button>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="projectStartDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Starting date</FormLabel>
                    <FormControl>
                      <DatePicker />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectEndDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End date</FormLabel>
                    <FormControl>
                      <DatePicker />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </div>
          </CardContent>
          <CardFooter className="flex  justify-between">
            <Button type="submit" className="w-full sm:w-auto">
              Create project
            </Button>
          </CardFooter>
        </form>
      </Form>
    </main>
  );
}
