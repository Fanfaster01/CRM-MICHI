import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    // Crear el cliente de Supabase en el servidor
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: any) {
            cookieStore.set({ name, value: '', ...options });
          },
        },
      }
    );

    // Verificar la sesión del usuario
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    // Obtener parámetros de consulta
    const { searchParams } = new URL(request.url);
    const restaurantId = searchParams.get('restaurantId');
    
    // Consultar gastos
    let query = supabase
      .from('expenses')
      .select(`
        *,
        restaurant:restaurants(name),
        created_by:users(full_name)
      `)
      .order('date', { ascending: false });
      
    // Filtrar por restaurante si se proporciona
    if (restaurantId) {
      query = query.eq('restaurant_id', restaurantId);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error al obtener gastos:', error);
      return NextResponse.json(
        { error: 'Error al obtener gastos' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error inesperado:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Crear el cliente de Supabase en el servidor
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: any) {
            cookieStore.set({ name, value: '', ...options });
          },
        },
      }
    );

    // Verificar la sesión del usuario
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    // Obtener datos del cuerpo de la solicitud
    const body = await request.json();
    
    // Validar datos requeridos
    if (!body.restaurant_id || !body.category || !body.amount || !body.description || !body.date) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      );
    }
    
    // Insertar nuevo gasto
    const { data, error } = await supabase
      .from('expenses')
      .insert({
        restaurant_id: body.restaurant_id,
        category: body.category,
        amount: body.amount,
        description: body.description,
        date: body.date,
        payment_method: body.payment_method,
        status: body.status,
        notes: body.notes || null,
        created_by: session.user.id
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error al insertar gasto:', error);
      return NextResponse.json(
        { error: 'Error al crear el gasto' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error('Error inesperado:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}