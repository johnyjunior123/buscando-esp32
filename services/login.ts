import { authFormSchema } from "@/types/auth.schema"

export enum Permissao {
    ADM = 'ROLE_ADMIN',
    USER = 'ROLE_USER'
}

type DadosAutenticacao = {
    id: number,
    nome: string
    email: string
    permissao: Permissao
    token: string
}

export async function login(credentials: authFormSchema): Promise<DadosAutenticacao | void> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });
    if (!response.ok) {
        return;
    }
    return await response.json()
}