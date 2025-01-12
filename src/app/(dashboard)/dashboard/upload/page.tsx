"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import type { Session } from "@supabase/supabase-js";

export default function UploadPage() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [error, setError] = useState<string | null>(null);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: projectName }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create project");
      }

      const project = await response.json();
      router.push(`/dashboard/upload/${project.id}`);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to create project");
    }
  };

  if (!session) {
    return null;
  }

  return (
    <div className="mx-auto max-w-[600px] px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Upload</h1>
      </div>

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border/60 bg-background p-8 text-muted-foreground hover:bg-accent/40"
        >
          <Plus className="h-5 w-5" />
          Create Project
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Project Name
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full rounded-md border bg-background px-3 py-2"
              placeholder="Enter project name"
            />
          </div>

          {error && (
            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-md border px-4 py-2 hover:bg-accent/40"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
            >
              Create
            </button>
          </div>
        </form>
      )}
    </div>
  );
} 