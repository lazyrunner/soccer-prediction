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
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full overflow-hidden`}>
        <UserProvider>
          {/* Main layout container with fixed height */}
          <div className="flex flex-col h-full">
            {/* Fixed navigation bar */}
            <NavBar />
            
            {/* Remaining height with sidebar and content */}
            <div className="flex flex-1 overflow-hidden">
              {/* Fixed sidebar */}
              <div className="hidden md:block w-[300px] h-full overflow-y-auto">
                <Sidebar />
              </div>
              
              {/* Scrollable content area */}
              <div className="flex-1 overflow-y-auto p-5">
                {children}
              </div>
            </div>
          </div>
        </UserProvider>
      </body>
    </html>
  );
}