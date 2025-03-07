"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { useUser } from "@/lib/AuthProvider";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Homepage() {
  const { user } = useUser();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div className="flex flex-col items-center gap-10 py-8">
      <h1 className="font-extrabold text-4xl">
        Projectorium - simple way to manage your projects!
      </h1>
      <div>Create your account and start managing your projects today!</div>
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
  );
}
