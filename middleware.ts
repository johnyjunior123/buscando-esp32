import { NextResponse, NextRequest } from 'next/server';
import { auth } from './services/auth';

export async function middleware(req: NextRequest) {
    const session = await auth();
    const { pathname } = req.nextUrl;

    const isLogged = session && new Date(session.expires) > new Date();
    const isLoginPage = pathname === '/';

    if (!isLogged && !isLoginPage) {
        const loginUrl = new URL('/', req.url);
        return NextResponse.redirect(loginUrl);
    }

    if (isLogged && isLoginPage) {
        const ocupacaoUrl = new URL('/ocupacao', req.url);
        return NextResponse.redirect(ocupacaoUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
    ],
};