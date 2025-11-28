import "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: number;
            nome: string;
            email: string;
            token: string;
        } & DefaultSession["user"];
    }

    interface User {
        id: number;
        nome: string;
        email: string;
        token: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: number
        nome: string
        email: string
        token: string
    }
}