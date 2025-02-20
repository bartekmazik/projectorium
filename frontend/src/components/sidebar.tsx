import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Sidebar = () => {
  return (
    <>
      <div className="hidden md:block fixed top-16 w-48 h-full z-[2] bg-background dark:border-border border-b-primary-foreground border-b shadow-md">
        <div className="flex flex-col gap-4  items-center font-semibold">
          <Link
            href="/Dashboard"
            className="w-full flex flex-row justify-center border border-transparent hover:border-primary-foreground dark:hover:border-primary-foreground px-2 pt-4 "
          >
            Projects
          </Link>
          <Link
            href="/Dashboard"
            className="w-full flex flex-row justify-center border border-transparent hover:border-primary-foreground dark:hover:border-primary-foreground px-2 "
          >
            Chat
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
