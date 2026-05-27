"use client";

import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Navbar() {
  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-8">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
          <Input 
            type="search" 
            placeholder="Search media, analytics, users..." 
            className="pl-9 bg-zinc-900 border-zinc-800 focus-visible:ring-amber-500/30 text-sm h-9"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative text-zinc-400 hover:text-zinc-100 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute 0 right-0 w-2 h-2 bg-amber-500 rounded-full border-2 border-zinc-950"></span>
        </button>
        <div className="flex items-center gap-2 pl-4 border-l border-zinc-800">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-white leading-none">Admin User</p>
            <p className="text-xs text-zinc-500 mt-1">admin@hodlandsip.com</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
            <span className="text-xs font-bold text-zinc-300">AU</span>
          </div>
        </div>
      </div>
    </header>
  );
}
