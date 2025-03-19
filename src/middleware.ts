import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  // Crear el cliente de Supabase en el servidor
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => req.cookies.get(name)?.value,
        set: (name, value, options) => {
          res.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove: (name, options) => {
          res.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  // Verificar si el usuario está autenticado
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    // Si la ruta actual requiere autenticación, redirigir al login
    const url = req.nextUrl.clone();
    url.pathname = '/auth/login';
    url.searchParams.set('redirectTo', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return res;
}

// Definir las rutas que requieren autenticación
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/finances/:path*',
    '/inventory/:path*',
    '/sales/:path*',
    '/reports/:path*',
    '/staff/:path*',
    '/customers/:path*',
    '/settings/:path*',
  ],
};