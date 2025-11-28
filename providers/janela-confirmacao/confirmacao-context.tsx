"use client"
import { useContext, createContext } from "react";

type confirmacaoContextType = {
    abrirConfirmacao: (texto: string) => Promise<boolean>
}

export const ConfirmacaoContext = createContext<confirmacaoContextType | null>(null)

export function useConfirmacao(): confirmacaoContextType {
    const context = useContext(ConfirmacaoContext);
    if (!context) {
        throw new Error("useConfirmacao deve ser usado dentro de ConfirmacaoProvider");
    }
    return context;
}