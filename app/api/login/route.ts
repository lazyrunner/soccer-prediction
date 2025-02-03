import { NextResponse } from "next/server";
import { UserRepository } from '@/lib/db/users'

const userRepo = new UserRepository()
export async function POST(request: Request) {
  const { email, password } = await request.json();
  console.log(email,password)

  // Simulate authentication (replace with real logic)
  if (email.trim() != "" && password.trim() !== "") {
    var user = await userRepo.findByEmail(email);
    if(!user){
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    if (user.password === password){
      const response = NextResponse.json({ message: "Login successful" });
      response.cookies.set("user_id", user.user_id.toString(), { path: "/", maxAge: 3600 }); // 1 hour expiry
      response.cookies.set("name", user.name, { path: "/", maxAge: 3600 }); // 1 hour expiry
      return response;
    }
  }
  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

}