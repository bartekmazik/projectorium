"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUser } from "@/lib/AuthProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Message {
  role: string;
  content: string;
}
const mySchema = z.object({
  message: z.string().min(1, "Message is required"),
});

const Message = React.forwardRef<
  HTMLDivElement,
  { role: string; content: string }
>(({ role, content }, ref) => {
  function aligment() {
    if (role === "USER") {
      return "justify-self-end bg-primary text-secondary";
    } else {
      return "justify-self-start bg-secondary text-primary";
    }
  }
  aligment();
  return (
    <Card
      ref={ref}
      className={`w-3/4 my-2 sm:w-2/5 text-sm ${aligment()} px-4 py-2`}
    >
      <Label>{content}</Label>
    </Card>
  );
});

const Chat = () => {
  const { user, accessToken } = useUser();
  const [messages, setMessages] = useState<Message[]>();
  const chatRef = useRef(null);
  const { id } = useParams();
  const form = useForm({
    resolver: zodResolver(mySchema),
    defaultValues: {
      message: "",
    },
  });

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:3333/project/${id}/chat`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}` || "",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch project");

      const json = await res.json();

      setMessages(json.chat);
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);
  useEffect(() => {
    if (messages?.length > 0) {
      chatRef.current.scrollIntoView({ behavior: "smooth" }); //Use scrollIntoView to automatically scroll to my ref
    }
  }, [messages?.length]);

  const onSubmit = async (data: { message: string }) => {
    try {
      const object = { userid: user?.id, question: data.message };
      const res = await fetch(`http://localhost:3333/project/${id}/chat`, {
        method: "POST",
        body: JSON.stringify(object),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const json = await res.json();
      console.log(json.message);
      fetchData();
      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      form.reset();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col h-[80vh] w-full justify-between items-start p-4">
      <div className="flex flex-row justify-center items-center gap-2 text-3xl font-semibold">
        <Link href={`/Project/${id}`}>
          <Button variant={"ghost"}>
            <ArrowLeft />
          </Button>
        </Link>
        Project Mentor 🧠
      </div>
      <ScrollArea className="w-full h-full my-4 flex flex-col-reverse ">
        {messages &&
          messages.map((message, i, row) => {
            return (
              <Message
                role={message.role}
                content={message.content}
                key={i}
                ref={i + 1 === row.length ? chatRef : null}
              />
            );
          })}
      </ScrollArea>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full gap-4"
        >
          <div className="flex-grow">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full"
                      placeholder="Your question"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-32">
            Send
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Chat;
