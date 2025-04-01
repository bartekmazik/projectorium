"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@/lib/AuthProvider";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Homepage() {
  const { user } = useUser();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex flex-row items-start justify-between py-6">
      <div className="flex flex-col  items-start gap-8 w-full sm:w-1/2 py-8 sm:py-16">
        <div className="flex flex-col items-start justify-center font-extrabold text-5xl sm:text-5xl">
          <h1>Projectorium</h1>
          <h2 className="hidden sm:flex flex-row text-3xl">
            <p className="text-green-400 mr-2">gamify </p> your team project!
          </h2>
        </div>
        <p className="text-xl sm:text-base sm:w-2/3 ">
          It's simple! Create your account and start managing your projects
          today! 🤩
        </p>
        <div className="flex gap-2">
          {isClient && !user && (
            <>
              <Link href="/auth/login">
                <Button>Login</Button>
              </Link>
              <Link href="/auth/register">
                <Button>Sign up</Button>
              </Link>
            </>
          )}
          {isClient && user && (
            <Link href="/Dashboard">
              <Button>Go to dashboard</Button>
            </Link>
          )}
        </div>
      </div>

      <div className="relative hidden sm:block w-1/2 h-[500px]">
        <Image src="/heroimg.svg" alt="hero" fill className="object-contain" />
      </div>
    </div>
  );
}
