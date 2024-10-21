import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const ADMIN_ROLE = 1;
const USER_ROLE = 2;

export async function middleware(request: NextRequest) {
    console.log("Request:", request.nextUrl.pathname)
    const token = request.cookies.get('token')?.value;

    // Allow unauthenticated access to signup and signin pages
    if (request.nextUrl.pathname.startsWith('/api/auth') || 
        (!token && request.nextUrl.pathname === '/signin') || 
        (!token && request.nextUrl.pathname === '/signin')) {
        return NextResponse.next();
    }

    try {
        if (token) {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY!);
            const { payload } = await jwtVerify(token, secret);
            const { role } = payload;

            if (request.nextUrl.pathname === '/signin' || request.nextUrl.pathname === '/signup') {
                return role === ADMIN_ROLE 
                    ? NextResponse.redirect(new URL('/admin', request.url))
                    : NextResponse.redirect(new URL('/user', request.url));
            }

            // Check role for admin and user paths
            if (request.nextUrl.pathname.startsWith('/admin') && role !== ADMIN_ROLE) {
                return NextResponse.redirect(new URL('/unauthorized', request.url));
            }
            if (request.nextUrl.pathname.startsWith('/user') && (role !== USER_ROLE && role !== ADMIN_ROLE)) {
                return NextResponse.redirect(new URL('/unauthorized', request.url));
            }

            if (request.nextUrl.pathname.startsWith('/api/admin') && role !== ADMIN_ROLE) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
            }
            if (request.nextUrl.pathname.startsWith('/api/user') && (role !== USER_ROLE && role !== ADMIN_ROLE)) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
            }
        } else {
            if (request.nextUrl.pathname.startsWith('/api/')) {
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
