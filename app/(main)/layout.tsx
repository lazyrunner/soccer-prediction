import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";
import { UserProvider } from "./context/UserContext"; // Adjust path if needed

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Soccer Prediction",
  description: "Can you believe I used this to also learn nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <NavBar />
          <div className="flex">
            <div className="hidden md:block h-[100vh] w-[300px]">
              <Sidebar />
            </div>
            <div className="p-5 w-full md:max-w-[1140px]">{children}</div>
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
