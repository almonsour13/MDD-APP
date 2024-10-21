import { NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { hash } from 'bcrypt';

export async function POST(req: Request) {
  try {
      if (!process.env.JWT_SECRET_KEY) {
          return NextResponse.json({ error: 'JWT secret key is not set.' }, { status: 500 });
      }

      const hashedPassword = await hash("monsour13", 10);
      const hashedPassword2 = await hash("monsour14", 10);
      const users = [
          { id: 1, email: "almonsoursalida@gmail.com", password: hashedPassword, role: 1 },
          { id: 2, email: "almonsoursalidaa@gmail.com", password: hashedPassword2, role: 2 }
      ];

      const { email, password } = await req.json();

      const user = users.find(u => u.email === email);
      if (!user) {
          return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      const passwordMatch = await compare(password, user.password);
      
      if (!passwordMatch) {
          return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
      }
      
      const token = sign(
          { userId: user.id, role: user.role },
          process.env.JWT_SECRET_KEY,
          { expiresIn: '1h' }
      );
    
      const response = NextResponse.json({ success: true, role: user.role });
      
      response.cookies.set('token', token, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
      });
      
      const allowedOrigins = ['https://mangocare.netlify.app', 'https://mdd-app.vercel.app'];
      const origin: string = req.headers.get('origin') || 'https://mangocare.netlify.app';

      if (allowedOrigins.includes(origin)) {
          response.headers.set('Access-Control-Allow-Origin', origin);
      }

      response.headers.set('Access-Control-Allow-Credentials', 'true');
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

      return response;
  } catch (error) {
      console.error('Error:', error);
      return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
