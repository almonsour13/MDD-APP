import { NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { hash } from 'bcrypt';

export async function POST(req: Request) {
    try {
        const hashedPassword = await hash("monsour13", 10);
        const users = [{ id: 1, email: "almonsoursalida@gmail.com", password: hashedPassword, role: 1 }];

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
        
        const token = sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET_KEY!, {expiresIn: '1h' });

        return NextResponse.json({ token: token });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
    }
}

