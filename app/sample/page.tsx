"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface user {
  user_id: number;
  name: string;
  email: string;
  password?: string;
}

export default function UserDisplay() {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState<user | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    if (!userId) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      setUser(data);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>User Lookup</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              type="number"
              placeholder="Enter user ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="flex-1"
            />
            <Button onClick={fetchUser} disabled={loading || !userId}>
              {loading ? "Loading..." : "Fetch User"}
            </Button>
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          {user && (
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
