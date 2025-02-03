"use client"; // Required for client-side components

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

type UserContextType = { userId: string | null, name: string | null };

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    setUserId(Cookies.get("user_id") || null); // Read from cookies on load
    setName(Cookies.get("name") || null); // Read from cookies on load
  }, []);

  return (
    <UserContext.Provider value={{ userId, name}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};