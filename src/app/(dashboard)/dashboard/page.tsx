"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { ArrowUpRight, Settings } from "lucide-react";
import Link from "next/link";
import Image from 'next/image';

interface Profile {
  id: string;
  display_name: string | null;
  email: string;
  created_at: string;
  avatar_url?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
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
    const getProfile = async () => {
      if (session?.user?.id) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          return;
        }

        if (data) {
          setProfile(data);
        }
      }
    };

    getProfile();
  }, [session, supabase]);

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="p-4">
      </div>

      <div className="max-w-[600px] mx-auto px-4 py-8">
        <main className="space-y-6">
          {/* Profile Section */}
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-[#7C96FF] to-[#4DBAFF] flex items-center justify-center">
              {profile?.avatar_url ? (
                <Image
                  src={profile.avatar_url}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-4xl text-white">
                  {(profile?.display_name || session.user.email)?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <h1 className="text-xl font-medium text-white mb-1">
              {profile?.display_name || session.user.email}
            </h1>
            <p className="text-sm text-white/50 mb-4">
              Joined {new Date(profile?.created_at || Date.now()).toLocaleDateString()}
            </p>
          </div>

          {/* Usage Section */}
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-sm text-white/75">0 of 25 tracks used</p>
            <div className="w-full h-1 bg-white/10 rounded-full mt-2">
              <div className="w-[1%] h-full bg-[#4DBAFF] rounded-full" />
            </div>
          </div>

          {/* My Projects Button */}
          <Link
            href="/dashboard/projects"
            className="block bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/75">My Projects</span>
              <ArrowUpRight className="h-4 w-4 text-white/50" />
            </div>
          </Link>

          {/* Settings Button */}
          <Link
            href="/dashboard/settings"
            className="block bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/75">Settings</span>
              <Settings className="h-4 w-4 text-white/50" />
            </div>
          </Link>

          {/* Footer Links */}
          <div className="space-y-2">
            <Link 
              href="/trust-and-security" 
              className="block bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/75">Trust and Security</span>
                <ArrowUpRight className="h-4 w-4 text-white/50" />
              </div>
            </Link>

            <Link 
              href="/terms" 
              className="block bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/75">Terms of Use</span>
                <ArrowUpRight className="h-4 w-4 text-white/50" />
              </div>
            </Link>

            <Link 
              href="/licenses" 
              className="block bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/75">Third-Party Licenses</span>
                <ArrowUpRight className="h-4 w-4 text-white/50" />
              </div>
            </Link>

            <Link 
              href="/privacy" 
              className="block bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/75">Privacy Policy</span>
                <ArrowUpRight className="h-4 w-4 text-white/50" />
              </div>
            </Link>

            <Link 
              href="/contact" 
              className="block bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/75">Contact us</span>
                <ArrowUpRight className="h-4 w-4 text-white/50" />
              </div>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
} 