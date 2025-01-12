"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import type { Session } from "@supabase/supabase-js";
import { User, LogOut, Settings } from 'lucide-react';
import { NotificationCenter } from '@/components/notifications/notification-center';
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (!session) {
        router.push("/auth/login");
      }
    };

    getSession();
  }, [router, supabase.auth]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="absolute top-4 right-6 flex items-center gap-3">
        <NotificationCenter />
        <div className="relative" ref={menuRef}>
          <button 
            className="w-10 h-10 rounded-full bg-[#181818] hover:bg-[#282828] transition-colors flex items-center justify-center"
            aria-label="Profile"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <User className="w-[18px] h-[18px] text-[#A7A7A7]" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#282828] rounded-lg shadow-lg border border-white/10 overflow-hidden">
              <div className="p-2">
                <div className="px-3 py-2 text-sm text-white/60">
                  {session.user.email}
                </div>
                <Link 
                  href="/dashboard/settings" 
                  className="flex items-center gap-2 px-3 py-2 text-sm text-white hover:bg-[#323232] rounded-md"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <Settings className="w-4 h-4" />
                  Configuración
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-white hover:bg-[#323232] rounded-md"
                >
                  <LogOut className="w-4 h-4" />
                  Cerrar sesión
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
} 