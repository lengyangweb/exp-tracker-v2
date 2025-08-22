import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const token = cookies().get('access-token');

    if (!token) {
      if (request.url.includes('login')) return NextResponse.next()
      if (!request.url.includes('login')) return NextResponse.redirect(new URL('/login', request.url));
    }

    // const tokenIsValid = verifyToken(token.value); // verify if token is not valid or is expire
    // if (!tokenIsValid) return NextResponse.redirect(new URL('/login', request.url));

    if (token && request.url.includes('login')) return NextResponse.redirect(new URL('/', request.url));
    return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/about',
    '/tracker',
    '/tracker/:path*',
    '/user-profile',
    '/admin-config'
  ],
}