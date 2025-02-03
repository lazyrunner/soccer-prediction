"use client"; // Mark this as a Client Component

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      await fetch("/api/logout", { method: "POST" });
      router.push("/login"); // Redirect to login page
    };

    logout();
  }, [router]);

  return <p>Logging out...</p>;
}