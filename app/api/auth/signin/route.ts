import { NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { hash } from 'bcrypt';

export async function POST(req: Request) {
    try {
        const hashedPassword = await hash("monsour13", 10);
        const hashedPassword2 = await hash("monsour14", 10);
        const users = [
            { id: 1, email: "almonsoursalida@gmail.com", password: hashedPassword, role: 1 },
            { id: 2, email: "almonsoursalidaa@gmail.com", password: hashedPassword2, role: 2 }
        ];

        const { email, password } = await req.json();

        const user = users.find(u => u.email === email);
        if (!user) {
            console.log('User not found:', email);
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const passwordMatch = await compare(password, user.password);
        console.log('Password match:', passwordMatch);
        
        if (!passwordMatch) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        }
        
        const token = sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET_KEY!,
            { expiresIn: '1h' }
          );
      
          const response = NextResponse.json({ success: true, role: user.role });
        
        // Get the origin of the request
        const origin = req.headers.get('origin');
        
        // Set the cookie with more flexible options
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 3600,
            path: '/',
        });
        
        // Set CORS headers
        response.headers.set('Access-Control-Allow-Origin', origin || '*');
        response.headers.set('Access-Control-Allow-Credentials', 'true');
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        return response;
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
    }
}

