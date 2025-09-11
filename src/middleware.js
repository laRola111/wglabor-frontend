// src/middleware.js
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  // Creamos una respuesta y un cliente de Supabase adaptado al middleware
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Refrescamos la sesión del usuario. Es importante para mantenerlo logueado.
  const { data: { session } } = await supabase.auth.getSession();

  const { pathname } = req.nextUrl;

  // Si el usuario NO está autenticado y intenta acceder a una ruta protegida (que empieza con /dashboard)
  if (!session && pathname.startsWith('/dashboard')) {
    // Lo redirigimos a la página de login.
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Si el usuario YA está autenticado y intenta acceder a la página de login
  if (session && pathname === '/login') {
    // Lo redirigimos al dashboard para una mejor experiencia de usuario.
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Si ninguna de las condiciones anteriores se cumple, permitimos que la petición continúe.
  return res;
}

// Configuración del Matcher
export const config = {
  matcher: [
    /*
     * Coincide con todas las rutas de petición excepto las que empiezan por:
     * - api (rutas de API)
     * - _next/static (archivos estáticos)
     * - _next/image (imágenes optimizadas)
     * - favicon.ico (archivo de favicon)
     * Esto evita que el middleware se ejecute en peticiones de assets innecesarias.
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};