import { json, redirect } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { createServerClient } from "@supabase/auth-helpers-remix";
import { Bell, User, Search } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  created_at: string;
}

export const loader: LoaderFunction = async ({ request }) => {
  const response = new Response();
  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    { request, response }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/auth/login");
  }

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  return json(
    { projects, session },
    {
      headers: response.headers,
    }
  );
};

export default function Dashboard() {
  const { projects, session } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="absolute top-4 right-6 flex items-center gap-3">
        <button 
          className="w-10 h-10 rounded-full bg-[#181818] hover:bg-[#282828] transition-colors flex items-center justify-center"
          aria-label="Notifications"
        >
          <Bell className="w-[18px] h-[18px] text-[#A7A7A7]" />
        </button>
        <button 
          className="w-10 h-10 rounded-full bg-[#181818] hover:bg-[#282828] transition-colors flex items-center justify-center"
          aria-label="Profile"
        >
          <User className="w-[18px] h-[18px] text-[#A7A7A7]" />
        </button>
        <button 
          className="w-10 h-10 rounded-full bg-[#181818] hover:bg-[#282828] transition-colors flex items-center justify-center"
          aria-label="Search"
        >
          <Search className="w-[18px] h-[18px] text-[#A7A7A7]" />
        </button>
      </div>
      <main className="container mx-auto py-6">
        <div className="grid gap-6">
          {projects?.map((project: Project) => (
            <div
              key={project.id}
              className="p-4 bg-[#181818] rounded-lg hover:bg-[#282828] transition-colors"
            >
              <h2 className="text-lg font-semibold">{project.title}</h2>
              <p className="text-sm text-[#A7A7A7] mt-1">
                Created {new Date(project.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 