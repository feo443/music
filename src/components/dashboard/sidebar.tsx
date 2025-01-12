"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Music, Upload, Users, Settings } from "lucide-react";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: Home },
  { name: "My Tracks", href: "/dashboard/tracks", icon: Music },
  { name: "Upload", href: "/dashboard/upload", icon: Upload },
  { name: "Community", href: "/dashboard/community", icon: Users },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-[220px] flex-col border-r border-border/40 bg-background px-3 py-4">
      <Link href="/" className="mb-8 px-3 text-lg font-semibold">
        MusicPro
      </Link>
      <nav className="space-y-0.5">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
} 