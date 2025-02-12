import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { EditIcon, User2 } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function Navbar({
  setIsDark,
  isDark,
}: {
  setIsDark: any;
  isDark: boolean;
}) {
  const [isLogged, setIsLogged] = useState(false);

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

            {isLogged ? (
              <Link href="/login">
                <Button variant="ghost">
                  <User2 fill="" stroke="" className="fill-primary" size={20} />
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="ghost">
                  <User2 fill="" stroke="" className="fill-primary" size={20} />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
