"use client";
import { ReactNode, useState } from "react";
import { Navbar } from "@/components/navbar";

import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/sidebar";

import "@/styles/globals.css";
import { UserProvider } from "@/lib/AuthProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function Layout({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  return (
    <html lang="en">
      <body className={`${isDark === true ? "dark" : ""}`}>
        <main className="flex flex-col w-full">
          <UserProvider>
            <Navbar setIsDark={setIsDark} isDark={isDark} />
            <div className="flex flex-row">
              <Sidebar />
              <div
                className={cn(
                  "max-w-screen-2xl w-full md:ml-48 mt-16",
                  fontSans.variable
                )}
              >
                {children}
              </div>
            </div>
            {/* <Footer /> */}
          </UserProvider>
        </main>
      </body>
    </html>
  );
}
