import jwt from 'jsonwebtoken';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const PUBLIC_ROUTES = ['/login', '/register', '/auth/magic-link'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;

  const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route));

  const isAuthenticated = validateJWT(token);

  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!isPublicRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

function validateJWT(token: string | undefined): boolean {
  if (!token) return false;

  try {
    jwt.verify(token, process.env.JWT_SECRET ?? '');
    return true;
  } catch (error) {
    return false;
  }
}

// 🔍 Define onde o middleware atua
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
