import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Homepage() {
  return (
    <div className="flex flex-col items-center gap-10 py-8">
      <h1 className="font-extrabold text-4xl">
        Projectorium - simple way to manage your projects!
      </h1>
      <div>Create your account and start managing your projects today!</div>
      <div className="flex gap-2">
        <Link href="/auth/login">
          <Button>Login</Button>
        </Link>
        <Link href="/auth/register">
          <Button>Sign up</Button>
        </Link>
        <Link href="/Dashboard">
          <Button>Go to dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
