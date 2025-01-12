"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { ArrowLeft, Plus, ArrowUpRight, MoreVertical, FolderInput, Download, Trash2 } from "lucide-react";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  created_at: string;
  user_id: string;
  cover_url?: string;
}

export default function ProjectsPage() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const supabase = createClientComponentClient();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

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
    const getProjects = async () => {
      if (session?.user?.id) {
        const { data } = await supabase
          .from('projects')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false });
        
        if (data) {
          setProjects(data);
        }
      }
    };

    getProjects();
  }, [session, supabase]);

  const handleCreateProject = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([{ 
          name: "Untitled Project", 
          user_id: session?.user?.id 
        }])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        router.push(`/dashboard/projects/${data.id}`);
      }
    } catch (error: any) {
      console.error("Error creating project:", error.message);
    }
  };

  const handleMenuClick = (e: React.MouseEvent, projectId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenMenuId(openMenuId === projectId ? null : projectId);
  };

  const handleMoveProject = (e: React.MouseEvent, projectId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenMenuId(null);
    // Implementar mover proyecto
  };

  const handleExportProject = (e: React.MouseEvent, projectId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenMenuId(null);
    // Implementar exportar proyecto
  };

  const handleDeleteProject = async (e: React.MouseEvent, projectId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenMenuId(null);

    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;

      setProjects(projects.filter(p => p.id !== projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project');
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (openMenuId) {
        const target = e.target as HTMLElement;
        if (!target.closest('.project-menu')) {
          setOpenMenuId(null);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [openMenuId]);

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="p-4">
        <Link href="/dashboard" className="inline-flex items-center text-sm text-white/75 hover:text-white">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Link>
      </div>

      <div className="max-w-[600px] mx-auto px-4 py-8">
        <main className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-xl font-medium text-white">My Projects</h1>
            <p className="text-sm text-white/50">Create and manage your music projects</p>
          </div>

          {/* Projects List */}
          <div className="space-y-2">
            {projects.map((project) => (
              <div key={project.id} className="relative">
                <Link
                  href={`/dashboard/projects/${project.id}`}
                  className="block bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-md overflow-hidden">
                        {project.cover_url ? (
                          <img 
                            src={project.cover_url} 
                            alt={project.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#7C96FF] to-[#4DBAFF] flex items-center justify-center text-sm text-white">
                            {project.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-sm text-white">{project.name}</h3>
                        <p className="text-xs text-white/50">
                          {new Date(project.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleMenuClick(e, project.id)}
                        className="project-menu p-1 rounded-md hover:bg-white/10 transition-colors"
                      >
                        <MoreVertical className="h-4 w-4 text-white/50" />
                      </button>
                    </div>
                  </div>
                </Link>

                {/* Project Menu */}
                {openMenuId === project.id && (
                  <div className="project-menu absolute right-0 top-12 z-10 w-48 bg-[#1A1A1A] rounded-lg shadow-lg py-1 text-sm">
                    <button
                      onClick={(e) => handleMoveProject(e, project.id)}
                      className="w-full px-4 py-2 flex items-center gap-2 text-white hover:bg-white/5"
                    >
                      <FolderInput className="h-4 w-4" />
                      Move project
                    </button>
                    <button
                      onClick={(e) => handleExportProject(e, project.id)}
                      className="w-full px-4 py-2 flex items-center gap-2 text-white hover:bg-white/5"
                    >
                      <Download className="h-4 w-4" />
                      Export project
                    </button>
                    <button
                      onClick={(e) => handleDeleteProject(e, project.id)}
                      className="w-full px-4 py-2 flex items-center gap-2 text-red-500 hover:bg-white/5"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete project
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* Create Project Button */}
            <button
              onClick={handleCreateProject}
              className="w-full bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors text-left"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/75">Create new project</span>
                <Plus className="h-4 w-4 text-white/50" />
              </div>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
} 