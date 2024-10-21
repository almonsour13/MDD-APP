import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const ADMIN_ROLE = 1;
const USER_ROLE = 2;

const routes = {
  publicRoutes: [
    '/signin',
    '/signup',
    '/api/auth/:path*',
  ],
  adminRoutes: [
    '/admin/:path*',
    '/api/admin/:path*',
  ],
  userRoutes: [
    '/user/:path*',
    '/api/user/:path*',
  ],
  protectedApiRoutes: [
    '/api/admin/:path*',
    '/api/user/:path*',
  ],
};

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;
  const token = request.cookies.get('token')?.value;

  // Allow unauthenticated access to public routes
  if (routes.publicRoutes.some((route) => url.startsWith(route))) {
    return NextResponse.next();
  }

  try {
    if (token) {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY!);
      const { payload } = await jwtVerify(token, secret);
      const { role } = payload;

      // Redirect authenticated users from signin/signup pages
      if (url === '/signin' || url === '/signup') {
        return role === ADMIN_ROLE 
          ? NextResponse.redirect(new URL('/admin', request.url))
          : NextResponse.redirect(new URL('/user', request.url));
      }

      // Check role-based access for admin routes
      if (routes.adminRoutes.some((route) => url.startsWith(route)) && role !== ADMIN_ROLE) {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }

      // Check role-based access for user routes
      if (routes.userRoutes.some((route) => url.startsWith(route)) && (role !== USER_ROLE && role !== ADMIN_ROLE)) {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }

      // Check role-based access for protected API routes
      if (routes.protectedApiRoutes.some((route) => url.startsWith(route))) {
        if (role === ADMIN_ROLE || (role === USER_ROLE && url.startsWith('/api/user/'))) {
          return NextResponse.next();
        }
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
      }
    } else {
      // Handle unauthenticated requests
      if (url.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/signin', request.url));
    }
  } catch (error) {
    console.error('Token verification failed:', error);
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/signin',
    '/signup',
    '/admin/:path*',
    '/user/:path*',
    "/api/auth/:path*",
    "/api/admin/:path*",
    "/api/user/:path*",
  ],
};