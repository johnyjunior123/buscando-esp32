"use client"
import { ReactNode, useState, useRef } from "react";
import { ConfirmacaoContext } from "./confirmacao-context";
import {
    AlertDialog, AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction
} from "@/components/ui/alert-dialog";

type ConfirmacaoProviderProps = {
    children: ReactNode;
};

export function ConfirmacaoProvider({ children }: ConfirmacaoProviderProps) {
    const [open, setOpen] = useState(false);
    const texto = useRef<string>(null)
    const resolver = useRef<((value: boolean) => void) | null>(null);

    const abrirConfirmacao = (textoConfirmacao: string) => {
        texto.current = textoConfirmacao
        setOpen(true);
        return new Promise<boolean>((resolve) => {
            resolver.current = resolve;
        });
    };

    const confirmar = () => {
        resolver.current?.(true);
        fechar();
    };

    const cancelar = () => {
        resolver.current?.(false);
        fechar();
    };

    const fechar = () => {
        setOpen(false);
        resolver.current = null;
    };

    return (
        <ConfirmacaoContext.Provider value={{ abrirConfirmacao }}>
            {children}
            {open && (
                <AlertDialog open={open}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Confirmação</AlertDialogTitle>
                            <AlertDialogDescription>
                                {texto.current}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={cancelar}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={confirmar}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </ConfirmacaoContext.Provider>
    );
}
