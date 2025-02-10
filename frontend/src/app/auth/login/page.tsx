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

const mySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  rememberMe: z.boolean(),
});
export default function Login() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(mySchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
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
            <CardFooter className="flex justify-between">
              <div className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          name={field.name}
                          onCheckedChange={(e) =>
                            field.onChange(
                              transformOutput(e.valueOf() as boolean)
                            )
                          }
                          value={field.value ? "" : 0}
                        />
                      </FormControl>
                      <FormLabel className="!m-0">Zapamiętaj mnie</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit">Zaloguj się</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </main>
  );
}
