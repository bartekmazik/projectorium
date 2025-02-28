import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { Button } from "./ui/button";
import { Moon, Sun, Bell } from "lucide-react";
import { useUser } from "@/lib/AuthProvider";

function Dropdown() {
  const { user, logout } = useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{user?.firstName}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Button variant={"ghost"} onClick={logout}>
            Log out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Navbar({
  setIsDark,
  isDark,
}: {
  setIsDark: any;
  isDark: boolean;
}) {
  const { user } = useUser();

  const handleDarkMode = () => {
    setIsDark(!isDark);
  };
  return (
    <div className="fixed w-full z-[999] bg-background">
      <div className="flex w-full h-16 items-center dark:border-border border-b-primary-foreground border-b shadow-md">
        <div className="flex max-w-screen-2xl p-4 w-full mx-auto items-center">
          <Link href="/" className="py-2 pl-4 lg:mr-12 md:mr-2 lg:text-xl">
            Projektorium
          </Link>

          <div className="ml-auto flex items-center flex-grow justify-end gap-1">
            <Button variant="ghost" onClick={handleDarkMode}>
              {isDark ? (
                <Sun
                  fill=""
                  stroke=""
                  className="fill-primary stroke-primary"
                  size={20}
                />
              ) : (
                <Moon fill="" stroke="" className="fill-primary" size={20} />
              )}
            </Button>
            {user ? (
              <div className="flex flex-row justify-center items-center gap-2">
                <Link href="/notifications">
                  <Button variant={"ghost"}>
                    <Bell
                      fill=""
                      stroke=""
                      className="fill-primary"
                      size={20}
                    />
                  </Button>
                </Link>
                <Dropdown />
              </div>
            ) : (
              <Link href="/auth/login">
                <Button variant="ghost">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
