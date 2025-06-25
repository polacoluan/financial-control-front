import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value;

  const unprotectedRoutes = ['/auth/signin', '/auth/signup'];
  const isUnprotectedRoute = unprotectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route),
  );

  if (isUnprotectedRoute) {
    return NextResponse.next();
  }

  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.startsWith('/api')
  ) {
    return NextResponse.next();
  }

  if (!token) {
    const signInUrl = new URL('/auth/signin', req.url);
    signInUrl.searchParams.set('redirect', req.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};
