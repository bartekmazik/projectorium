"use client";
import { ReactNode, useState } from "react";
import { Navbar } from "@/components/navbar";

import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/sidebar";
import { wrapper, store } from "../store/store";
import { Provider } from "react-redux";

import "@/styles/globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

function Layout({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  return (
    <html lang="en">
      <body className={`${isDark === true ? "dark" : ""}`}>
        <main className="flex flex-col w-full">
          <Provider store={store}>
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
          </Provider>
        </main>
      </body>
    </html>
  );
}

export default wrapper.withRedux(Layout);
