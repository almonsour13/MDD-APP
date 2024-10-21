import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    if (request.nextUrl.pathname.startsWith('/api/auth') || !token && request.nextUrl.pathname.startsWith('/signin') || !token && request.nextUrl.pathname.startsWith('/signup')) {
        return NextResponse.next();
    }

    if (token) {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY!);
            const { payload } = await jwtVerify(token, secret);
            const { role } = payload;

            if (request.nextUrl.pathname === '/signin' || request.nextUrl.pathname === '/signup') {
                if (role === 1) {
                    return NextResponse.redirect(new URL('/admin', request.url));
                } else if (role === 2) {
                    return NextResponse.redirect(new URL('/user', request.url));
                }
            }

            if (request.nextUrl.pathname.startsWith('/admin')) {
                if (role !== 1) {
                    return NextResponse.redirect(new URL('/unauthorized', request.url));
                }
            }

            if (request.nextUrl.pathname.startsWith('/user')) {
                if (role !== 2 && role !== 1) {
                    return NextResponse.redirect(new URL('/unauthorized', request.url));
                }
            }

            // API RBAC logic
            if (request.nextUrl.pathname.startsWith('/api/admin')) {
                if (role !== 1) {
                    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
                }
            }

            if (request.nextUrl.pathname.startsWith('/api/user')) {
                if (role !== 2 && role !== 1) {
                    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
                }
            }
    } else {
        // Redirect to signin if no token is present for protected routes
        if (request.nextUrl.pathname.startsWith('/api/')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        if (request.nextUrl.pathname !== '/signin') {
            return NextResponse.redirect(new URL('/signin', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|favicon.ico).*)'],
};