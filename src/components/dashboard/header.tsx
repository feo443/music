"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Bell, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";

export function Header() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    getSession();
  }, [supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  };

  return (
    <header className="border-b">
      <div className="mx-auto flex h-16 max-w-[600px] items-center justify-between px-4">
        <Link href="/dashboard" className="text-xl font-bold">
          Music Platform
        </Link>

        <div className="flex items-center gap-4">
          <button className="rounded-full p-2 hover:bg-accent">
            <Bell className="h-5 w-5" />
          </button>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 rounded-full p-2 hover:bg-accent"
          >
            <User className="h-5 w-5" />
            <span className="text-sm font-medium">
              {session?.user?.email}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
} 