"use client"; // Required for client-side components

import { Button } from "@/components/ui/button";
import { useUser } from "../context/UserContext";

export default function Home() {
  const { userId, name } = useUser();
  return (
    <h2>
      <div>Welcome, {userId ? `${name}` : "Guest"}!</div>
    </h2>
  );
}
