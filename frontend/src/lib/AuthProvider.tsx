"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  experience: number;
  level: number;
  league: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [accessToken, setAccessTokenState] = useState<string | null>(() =>
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null
  );
  const router = useRouter();
  const pathname = usePathname();
  const publicRoutes = ["/", "/auth/login", "/auth/register"];

  const setAccessToken = (token: string | null) => {
    setAccessTokenState(token);
    if (token) {
      localStorage.setItem("accessToken", token);
    } else {
      localStorage.removeItem("accessToken");
      setUser(null);
    }
  };

  const logout = () => {
    router.push("/");
    setAccessToken(null);
  };
  useEffect(() => {
    if (!user && !publicRoutes.includes(pathname)) {
      router.push("/");
    }
  }, [accessToken, pathname, router]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!accessToken) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:3333/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch user");

        const json = await res.json();

        setUser(json);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [accessToken]);

  return (
    <UserContext.Provider
      value={{ user, setUser, loading, accessToken, setAccessToken, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
