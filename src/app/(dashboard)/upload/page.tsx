"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Plus, MoreVertical } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Session } from "@supabase/supabase-js";

export default function UploadPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session: currentSession }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Session Error:", error);
        router.push('/auth/login');
        return;
      }
      
      if (!currentSession) {
        console.log("No session found, redirecting to login");
        router.push('/auth/login');
        return;
      }

      console.log("Session found for user:", currentSession.user.id);
      setSession(currentSession);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", session ? "logged in" : "logged out");
      setSession(session);
      if (!session) {
        router.push('/auth/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [router, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!projectName.trim()) return;

    try {
      setIsLoading(true);
      console.log("Creating project with name:", projectName);

      const { data: { session: currentSession } } = await supabase.auth.getSession();
      if (!currentSession) {
        throw new Error("No authenticated session found");
      }

      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: projectName }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Project creation failed:", errorData);
        throw new Error(errorData || "Failed to create project");
      }

      const project = await response.json();
      console.log("Project created successfully:", project);
      router.push(`/upload/${project.id}`);
    } catch (error) {
      console.error("Error creating project:", error);
      setError(error instanceof Error ? error.message : "Failed to create project");
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#111111]">
      <header className="flex h-14 items-center justify-between border-b border-white/10 px-4">
        <Link href="/dashboard" className="text-sm text-white/60 hover:text-white">
          [untitled]
        </Link>
        <div className="flex items-center gap-4">
          <button className="text-white/60 hover:text-white">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center px-4 py-20">
        {!showCreateProject ? (
          <div className="text-center">
            <button
              onClick={() => setShowCreateProject(true)}
              className="group flex h-32 w-32 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-colors hover:bg-white/10"
            >
              <Plus className="h-6 w-6 text-white/60 transition-colors group-hover:text-white" />
            </button>
            <p className="mt-4 text-sm text-white/60">Add</p>
          </div>
        ) : (
          <div className="w-full max-w-md">
            <h2 className="mb-6 text-lg font-medium text-white">Create project</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-500">
                  {error}
                </div>
              )}
              <div>
                <label htmlFor="name" className="mb-2 block text-sm text-white/60">
                  Project name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 focus:border-white/20 focus:outline-none focus:ring-0"
                  placeholder="name-project"
                  disabled={isLoading}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowCreateProject(false)}
                  className="mr-2 rounded-md px-3 py-2 text-sm text-white/60 hover:text-white"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/20 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
} 