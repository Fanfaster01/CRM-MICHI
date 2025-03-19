import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Obtener ID del gasto
    const id = params.id;
    
    // Consultar gasto
    const { data, error } = await supabase
      .from('expenses')
      .select(`
        *,
        restaurant:restaurants(name),
        created_by:users(full_name)
      `)
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        // Código de error para "no rows returned"
        return NextResponse.json(
          { error: 'Gasto no encontrado' },
          { status: 404 }
        );
      }
      
      console.error('Error al obtener gasto:', error);
      return NextResponse.json(
        { error: 'Error al obtener el gasto' },
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Obtener ID del gasto
    const id = params.id;
    
    // Obtener datos del cuerpo de la solicitud
    const body = await request.json();
    
    // Validar datos requeridos
    if (!body.restaurant_id || !body.category || !body.amount || !body.description || !body.date) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      );
    }
    
    // Verificar si el gasto existe
    const { data: existingExpense, error: existingError } = await supabase
      .from('expenses')
      .select('id')
      .eq('id', id)
      .single();
      
    if (existingError || !existingExpense) {
      return NextResponse.json(
        { error: 'Gasto no encontrado' },
        { status: 404 }
      );
    }
    
    // Actualizar gasto
    const { data, error } = await supabase
      .from('expenses')
      .update({
        restaurant_id: body.restaurant_id,
        category: body.category,
        amount: body.amount,
        description: body.description,
        date: body.date,
        payment_method: body.payment_method,
        status: body.status,
        notes: body.notes || null
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error al actualizar gasto:', error);
      return NextResponse.json(
        { error: 'Error al actualizar el gasto' },
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Obtener ID del gasto
    const id = params.id;
    
    // Verificar si el gasto existe
    const { data: existingExpense, error: existingError } = await supabase
      .from('expenses')
      .select('id')
      .eq('id', id)
      .single();
      
    if (existingError || !existingExpense) {
      return NextResponse.json(
        { error: 'Gasto no encontrado' },
        { status: 404 }
      );
    }
    
    // Eliminar gasto
    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error al eliminar gasto:', error);
      return NextResponse.json(
        { error: 'Error al eliminar el gasto' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error inesperado:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}