"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ArrowLeft, MoreVertical, Upload } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Session } from "@supabase/supabase-js";

interface UploadClientProps {
  projectId: string;
}

export default function UploadClient({ projectId }: UploadClientProps) {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
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
        router.push('/auth/login');
        return;
      }

      setSession(currentSession);
    };

    getSession();
  }, [router, supabase]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);

    const files = Array.from(e.dataTransfer.files).filter(
      file => file.type.startsWith('audio/')
    );

    if (files.length === 0) {
      setError("Please drop audio files only");
      return;
    }

    await handleFiles(files);
  };

  const handleFiles = async (files: File[]) => {
    try {
      setIsUploading(true);
      setError(null);

      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('projectId', projectId);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(errorData || 'Failed to upload file');
        }
      }

      router.refresh();
    } catch (error) {
      console.error('Upload error:', error);
      setError(error instanceof Error ? error.message : 'Failed to upload files');
    } finally {
      setIsUploading(false);
    }
  };

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#111111]">
      <header className="flex h-14 items-center justify-between border-b border-white/10 px-4">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm text-white/60 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-white/60 hover:text-white">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center px-4 py-20">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`w-full max-w-md rounded-xl border-2 border-dashed p-12 text-center transition-colors ${
            isDragging
              ? 'border-white/40 bg-white/5'
              : 'border-white/10 hover:border-white/20'
          }`}
        >
          {error && (
            <div className="mb-6 rounded-md bg-red-500/10 p-3 text-sm text-red-500">
              {error}
            </div>
          )}
          <div className="mb-4 flex justify-center">
            <Upload
              className={`h-8 w-8 ${
                isDragging ? 'text-white' : 'text-white/60'
              }`}
            />
          </div>
          <p className="mb-2 text-sm text-white/60">
            Drag and drop your audio files here
          </p>
          <p className="text-xs text-white/40">
            Supported formats: MP3, WAV, FLAC
          </p>
          {isUploading && (
            <div className="mt-4 text-sm text-white/60">Uploading...</div>
          )}
        </div>
      </main>
    </div>
  );
} 