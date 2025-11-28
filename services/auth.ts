import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { login } from "./login";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Senha", type: "password" },
            },
            authorize: async (credentials) => {
                if (!credentials?.email || !credentials?.password) return null;
                const user = await login({
                    email: credentials.email as string,
                    password: credentials.password as string,
                });
                if (!user) return null;
                return {
                    id: user.id,
                    nome: user.nome,
                    email: user.email,
                    permissao: user.permissao,
                    token: user.token,
                };
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24 * 1, // 1 dias em segundos
    },
    jwt: {
        maxAge: 60 * 60 * 24 * 1,
    },
    pages: {
        signIn: "/login",
        signOut: "/"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = Number(user.id);
                token.nome = user.nome;
                token.email = user.email;
                token.accessToken = user.token;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as number;
                session.user.nome = token.nome as string;
                session.user.email = token.email as string;
                session.user.token = token.accessToken as string;
            }
            return session;
        },
    },
});
