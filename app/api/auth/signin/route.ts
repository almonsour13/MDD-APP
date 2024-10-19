import { NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { hash } from 'bcrypt';

const IS_PRODUCTION = process.env.APP_ENV === 'production'
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
          const oneDay = 24 * 60 * 60 * 1000 // 1 day in milliseconds
  
          response.cookies.set('token', token, {
                httpOnly: true,
                secure: IS_PRODUCTION,
                sameSite: IS_PRODUCTION ? 'none' : 'lax',
                maxAge: oneDay,
                path: '/',
                // Uncomment and set your domain if needed
                // domain: process.env.COOKIE_DOMAIN || undefined,
            })
          
      
          return response;
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
    }
}

