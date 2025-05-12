"use client";
import { ReactNode, useState } from "react";
import { Navbar } from "@/components/navbar";

import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";

import "@/styles/globals.css";
import { UserProvider } from "@/lib/AuthProvider";
import { Toaster } from "sonner";
import Footer from "@/components/footer";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export default function Layout({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  return (
    <html lang="en" className={inter.variable}>
      <body className={`${isDark === true ? "dark" : ""} `}>
        <main className="flex flex-col w-full">
          <UserProvider>
            <Toaster />
            <Navbar setIsDark={setIsDark} isDark={isDark} />
            <div className="flex flex-row items-between min-h-[90vh]">
              <div
                className={cn(
                  "sm:max-w-screen-2xl w-full px-4 sm:mx-28 mt-20",
                  inter.variable
                )}
              >
                {children}
              </div>
            </div>
            <Footer />
          </UserProvider>
        </main>
      </body>
    </html>
  );
}
