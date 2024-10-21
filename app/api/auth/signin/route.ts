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
        
        
            response.cookies.set('token', token, {
                httpOnly: true,
                secure: true,                // Must be true when SameSite is 'none'.
                sameSite: 'none',            // Allows the cookie to be sent in cross-origin requests.
                maxAge: 30 * 24 * 60 * 60,   // Cookie lifespan.
                path: '/',                   // Cookie is available across the whole site.
            });
        
            const allowedOrigins = ['https://mangocare.netlify.app', 'https://mdd-app.vercel.app'];
            const origin: string = req.headers.get('origin') || 'https://mangocare.netlify.app';  // Provide fallback

            if (allowedOrigins.includes(origin)) {
            response.headers.set('Access-Control-Allow-Origin', origin);
            }

            response.headers.set('Access-Control-Allow-Credentials', 'true');
            response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

      
          console.log('Cookie set:', response.cookies.get('token'));

        return response;
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
    }
}

