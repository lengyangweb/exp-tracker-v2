import { NextResponse } from 'next/server';
 
export function middleware(request) {
  const token = request.cookies.get('access-token');

  if (!token) {
    // Allow login route without token
    if (request.nextUrl.pathname.startsWith('/login')) {
      return NextResponse.next();
    }
    // Redirect everything else to login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If logged in and tries to visit /login → redirect home
  if (token && request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}
 
export const config = {
  matcher: [
    '/',
    '/manage-expense',
    '/login',
    '/about',
    '/tracker/:path*',
    '/user-profile',
    '/admin-config',
  ],
};
