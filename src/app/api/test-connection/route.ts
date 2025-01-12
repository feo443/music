import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase.from("users").select("*").limit(1);
    
    if (error) {
      throw error;
    }

    return NextResponse.json({ message: "Connection successful", data });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to connect to Supabase" },
      { status: 500 }
    );
  }
} 