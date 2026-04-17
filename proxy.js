import { NextResponse } from 'next/server';

export function proxy(request) {
  // Only protect routes that start with /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Exclude the login page entirely from being protected (so they can actually login)
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    const adminCookie = request.cookies.get('admin_token');

    // If no valid cookie, redirect them to /admin/login
    if (!adminCookie || adminCookie.value !== process.env.ADMIN_SECRET_COOKIE) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
