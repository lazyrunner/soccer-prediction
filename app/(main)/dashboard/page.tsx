"use client"; // Required for client-side components

import { LiveStandings } from "@/components/LiveStandings/LiveStandings";
import { useUser } from "../context/UserContext";

export default function Home() {
  const { userId, name } = useUser();
  return (
    <>
      <h1>
        <div>Welcome, {userId ? `${name}` : "Guest"}!</div>
      </h1>
      <LiveStandings />
    </>
  );
}
