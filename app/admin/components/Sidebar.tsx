"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Image as ImageIcon, BarChart3, Settings, LogOut } from "lucide-react";

const routes = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/media", label: "Media Library", icon: ImageIcon },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 bg-zinc-950 border-r border-zinc-800 h-screen sticky top-0 left-0 p-4">
      <div className="flex items-center gap-3 px-2 mb-10 mt-4">
        <div className="w-8 h-8 rounded bg-amber-500 flex items-center justify-center font-bold text-black font-serif">
          H&S
        </div>
        <span className="text-xl font-bold tracking-tight text-white">Admin Panel</span>
      </div>

      <nav className="flex-1 space-y-1">
        {routes.map((route) => {
          const isActive = pathname === route.href || (route.href === "/admin/dashboard" && pathname === "/admin");
          const Icon = route.icon;

          return (
            <Link
              key={route.href}
              href={route.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-amber-500/10 text-amber-500"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
              }`}
            >
              <Icon className="w-4 h-4" />
              {route.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-zinc-800 pt-4 space-y-1">
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50">
          <Settings className="w-4 h-4" />
          Site Settings
        </Link>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-950/30">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
