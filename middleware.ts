import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    // Allow public routes except signin when token is present
    if (request.nextUrl.pathname.startsWith('/api/auth')) {
        return NextResponse.next();
    }

    if (token) {
        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY!);
            const { payload } = await jwtVerify(token, secret);
            const { role } = payload;

            // Redirect from signin to appropriate dashboard if token is valid
            if (request.nextUrl.pathname === '/signin') {
                if (role === 1) {
                    return NextResponse.redirect(new URL('/admin', request.url));
                } else if (role === 2) {
                    return NextResponse.redirect(new URL('/user', request.url));
                }
            }

            if (request.nextUrl.pathname.startsWith('/admin')) {
                if (role !== 1) { // Check if role is not admin (1)
                    return NextResponse.redirect(new URL('/unauthorized', request.url));
                }
            }

            if (request.nextUrl.pathname.startsWith('/user')) {
                if (role !== 2 && role !== 1) { // Check if role is neither user (2) nor admin (1)
                    return NextResponse.redirect(new URL('/unauthorized', request.url));
                }
            }

            // API RBAC logic
            if (request.nextUrl.pathname.startsWith('/api/admin')) {
                if (role !== 1) { // Check if role is not admin (1)
                    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
                }
            }

            if (request.nextUrl.pathname.startsWith('/api/user')) {
                if (role !== 2 && role !== 1) { // Check if role is neither user (2) nor admin (1)
                    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
                }
            }

        } catch (error) {
            // If token is invalid, clear it and redirect to signin
            const response = NextResponse.redirect(new URL('/signin', request.url));
            response.cookies.delete('token');
            return response;
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