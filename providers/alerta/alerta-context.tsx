"use client"
import { createContext, useContext } from "react"

export enum StatusAlerta {
    DEFAULT = "padrao",
    SUCCESS = "sucesso",
    WARNING = 'atencao',
    INFO = 'informacao',
    ERROR = "erro"
}

type AlertaContextType = {
    mostrarAlerta: (mensagem: string, status?: StatusAlerta) => void
}

export const AlertaContext = createContext<AlertaContextType | null>(null)

export function useAlerta(): AlertaContextType {
    const alertaContext = useContext(AlertaContext)
    if (!alertaContext) {
        throw new Error("useAlerta só pode ser utilizado dentro de AlertaProvider")
    }
    return alertaContext
}