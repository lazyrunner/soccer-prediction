"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";

const MobileMenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="block md:hidden text-white p-1"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer panel */}
          <div className="absolute left-0 top-0 h-full w-[300px] bg-background shadow-xl flex flex-col">
            <div className="flex items-center justify-end p-2">
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
                className="p-1 rounded hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto" onClick={() => setIsOpen(false)}>
              <Sidebar />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenuButton;
