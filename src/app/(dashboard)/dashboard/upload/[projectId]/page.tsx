"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { Session } from "@supabase/supabase-js";
import { useParams } from "next/navigation";

export default function ProjectPage() {
  const router = useRouter();
  const params = useParams();
  const [session, setSession] = useState<Session | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const uploadFiles = async (files: File[]) => {
    setIsUploading(true);
    const newProgress = { ...uploadProgress };

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("projectId", params.projectId as string);

        newProgress[file.name] = 0;
        setUploadProgress(newProgress);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Error uploading ${file.name}`);
        }

        newProgress[file.name] = 100;
        setUploadProgress(newProgress);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Error uploading files. Please try again.");
    } finally {
      setIsUploading(false);
      setTimeout(() => {
        setUploadProgress({});
      }, 2000);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('audio/')
    );

    if (files.length === 0) {
      alert('Please drop audio files only');
      return;
    }

    await uploadFiles(files);
  };

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-[600px] items-center justify-between px-4">
          <Link 
            href="/dashboard/upload"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Upload
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-[600px] px-4 py-8">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center ${
            isDragging ? 'border-primary bg-primary/10' : 'border-border/60'
          }`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center">
              <Loader2 className="mb-4 h-8 w-8 animate-spin text-muted-foreground" />
              <p className="mb-2 text-sm text-muted-foreground">
                Uploading files...
              </p>
              {Object.entries(uploadProgress).map(([fileName, progress]) => (
                <div key={fileName} className="mt-2 w-64">
                  <p className="mb-1 text-xs text-muted-foreground">{fileName}</p>
                  <div className="h-1 w-full rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <Upload className="mb-4 h-8 w-8 text-muted-foreground" />
              <p className="mb-2 text-sm text-muted-foreground">
                Drag and drop your audio files here
              </p>
              <p className="text-xs text-muted-foreground">
                or click to browse
              </p>
              <input
                type="file"
                accept="audio/*"
                className="absolute inset-0 cursor-pointer opacity-0"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  if (files.length > 0) {
                    uploadFiles(files);
                  }
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
} 