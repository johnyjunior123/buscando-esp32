"use client"
import { ReactNode } from "react"
import { AlertaContext, StatusAlerta } from "./alerta-context"
import { toast, Toaster } from "sonner"

type ALertaProviderProps = {
    children: ReactNode
}

export function AlertaProvider({ children }: ALertaProviderProps) {
    const mostrarAlerta = async (novoTexto: string, status: StatusAlerta = StatusAlerta.SUCCESS) => {
        switch (status) {
            case StatusAlerta.SUCCESS:
                toast.success(novoTexto)
                break
            case StatusAlerta.ERROR:
                toast.error(novoTexto)
                break
            case StatusAlerta.WARNING:
                toast.warning(novoTexto)
                break
            case StatusAlerta.INFO:
                toast.info(novoTexto)
                break
            default:
                toast(novoTexto)
        }
    }
    return (
        <AlertaContext.Provider value={{ mostrarAlerta }}>
            {children}
            <Toaster richColors closeButton position="top-center" />
        </AlertaContext.Provider>
    )
}