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
import { error } from "console";
const mySchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.coerce.string().email().min(5),
    password: z.string().min(8, "Zbyt krótkie!"),
    passwordRepeat: z.string().min(8),
  })
  .superRefine(({ password, passwordRepeat }, ctx) => {
    if (password !== passwordRepeat) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Podane hasła nie zgadzają się",
        path: ["passwordRepeat"],
      });
    }
  });

export default function Login() {
  const router = useRouter();

  const form = useForm<z.infer<typeof mySchema>>({
    resolver: zodResolver(mySchema),
    defaultValues: {
      email: "",
      password: "",
      passwordRepeat: "",
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = async (prop: any) => {
    const object = {
      email: prop.email,
      password: prop.password,
      firstName: prop.firstName,
      lastName: prop.lastName,
    };
    const res = await fetch("http://localhost:3333/auth/signup", {
      method: "POST",
      body: JSON.stringify(object),
      headers: {
        "Content-Type": "application/json",
      },
    });

    //authContext.setAuthToken(json.data.jwtToken);
    toast.success("Zarenestrowano", {
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
          <form
            onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}
          >
            <CardHeader>
              <CardTitle>Rejestracja</CardTitle>
              <CardDescription>
                Zarejestruj się w serwisie Projektorium
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
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
                  name="passwordRepeat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Powtórz Hasło</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <Link
                  href="/panel/recovery/"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  Zapomniałeś hasła?
                </Link> */}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="submit">Zarejestruj się</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </main>
  );
}
