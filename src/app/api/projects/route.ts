import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ 
      cookies: () => cookieStore
    });
    
    // Obtener la sesión actual
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      console.error('Session error:', sessionError);
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { name } = await req.json();
    console.log('Creating project with name:', name, 'for user:', session.user.id);
    
    // Crear una carpeta (proyecto) con el ID del usuario
    const { data, error } = await supabase
      .from("projects")
      .insert({ 
        name, 
        user_id: session.user.id 
      })
      .select()
      .single();

    if (error) {
      console.error('Project creation error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: "Error inesperado" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ 
      cookies: () => cookieStore
    });
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("projects")
      .select()
      .eq('user_id', session.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Error inesperado" }, { status: 500 });
  }
} 