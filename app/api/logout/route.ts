import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const response = NextResponse.json({ message: "Logout successful" });
  response.cookies.delete("user_id"); // Clear the user_id cookie
  return response;
}