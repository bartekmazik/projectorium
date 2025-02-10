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
import { ChangeEvent, ChangeEventHandler, useContext } from "react";
//import { AuthContext } from "@/components/panel/authProvider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage /*FormRootError*/,
} from "@/components/ui/form";
//import { toast } from "sonner";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

const mySchema = z
  .object({
    newPassword: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .superRefine(({ newPassword, confirmPassword }, ctx) => {
    if (newPassword !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Podane hasła nie zgadzają się",
        path: ["passwordRepeat"],
      });
    }
  });
export default function Login() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(mySchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (prop: any) => {
    const res = await fetch("/api/panel/auth", {
      method: "POST",
      body: JSON.stringify(prop),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();
    if (!json.success) {
      form.setError("root", {
        type: "custom",
        message: json.errors._errors.join(", "),
      });
      return;
    }

    //authContext.setAuthToken(json.data.jwtToken);
    toast.success("Zalogowano", {
      className:
        "!border-green-200 !bg-gradient-to-t !from-[#00ff0006] !to-[#00ff0002]",
      duration: 7 * 1000,
    });
    router.push("/");
  };

  const transformOutput = (e: boolean) => {
    return e;
  };

  return (
    <main className="flex justify-center items-center w-full h-screen p-4">
      <Card className="min-w-[300px] max-w-[560px] w-[560px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Ustaw nowe hasło</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hasło</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Powtórz hasło</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="submit">Zaloguj się</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </main>
  );
}
