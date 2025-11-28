import { StatusAlerta, useAlerta } from "@/providers/alerta/alerta-context"
import { authFormSchema } from "@/types/auth.schema"
import { getSession, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function useLogin() {
    const [isPending, setIsPending] = useState<boolean>(false)
    const { push } = useRouter()
    const { mostrarAlerta } = useAlerta()

    const handleLogin = async ({ email, password }: authFormSchema) => {
        try {
            setIsPending(true)
            await signIn("credentials", { email, password, redirect: false })
            const session = await getSession();
            if (!session?.user) {
                setIsPending(false)
                mostrarAlerta("E-mail ou senha inválido", StatusAlerta.ERROR)
                return;
            }
            mostrarAlerta("Login efetuado com sucesso, redirecionando...")
            push("/ocupacao");
            setIsPending(false)
        } catch (e) {
            console.error(e)
            mostrarAlerta("E-mail ou senha inválido", StatusAlerta.ERROR)
            setIsPending(false)
        }
    }

    return {
        handleLogin,
        isPending,
    }
}