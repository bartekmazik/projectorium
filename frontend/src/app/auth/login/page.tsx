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
import { ChangeEvent, ChangeEventHandler, useContext, useState } from "react";
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
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/AuthProvider";

const mySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  rememberMe: z.boolean(),
});
export default function Login() {
  const router = useRouter();
  const { setAccessToken } = useUser();
  const [error, setError] = useState<string>();

  const form = useForm({
    resolver: zodResolver(mySchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (prop: any) => {
    const object = { email: prop.email, password: prop.password };
    const res = await fetch("http://localhost:3333/auth/signin", {
      method: "POST",
      body: JSON.stringify(object),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      return setError("Niepoprawne dane");
    }

    const json = await res.json();
    setAccessToken(json.access_token);
    //authContext.setAuthToken(json.data.jwtToken);
    toast.success("Signed in successfuly!", {
      className:
        "!border-primary !bg-gradient-to-t !from-[#00ff0006] !to-[#00ff0002]",
      duration: 5 * 1000,
    });
    router.push("/");
  };

  const transformOutput = (e: boolean) => {
    return e;
  };

  return (
    <main className="flex justify-center pt-12 w-full max-h-screen p-4">
      <Card className="min-w-[300px]  sm:max-w-[560px] w-full sm:w-[560px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Logowanie</CardTitle>
              <CardDescription>Zaloguj się do Projektorium</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
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
                <Link
                  href="/auth/recovery/"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  Zapomniałeś hasła?
                </Link>
              </div>
            </CardContent>
            <CardFooter
              className={`flex ${error ? "justify-between" : "justify-end"}`}
            >
              {error && <Label>{error}</Label>}
              <Button type="submit">Zaloguj się</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </main>
  );
}
