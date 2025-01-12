import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const supabase = createRouteHandlerClient({ 
      cookies: cookies 
    });

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'No estás autorizado' },
        { status: 401 }
      );
    }

    // Insert a test notification
    const { data, error } = await supabase
      .from('notifications')
      .insert([
        {
          title: '¡Nueva notificación!',
          message: 'Esta es una notificación de prueba.',
          user_id: user.id,
          type: 'info',
          is_read: false
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error de Supabase:', error);
      throw error;
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Notificación creada exitosamente',
      data 
    });
  } catch (error) {
    console.error('Error al crear la notificación:', error);
    return NextResponse.json(
      { error: 'Error al crear la notificación' },
      { status: 500 }
    );
  }
} 