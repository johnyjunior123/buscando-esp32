import { PassagensTotais } from "@/types/passagem-total";
import { api } from "./api-axios";
import { AxiosResponse } from "axios";

export async function getPassagensTotais(inicio: Date, fim: Date): Promise<PassagensTotais | undefined> {
    const inicioFormatado = new Date(inicio);
    inicioFormatado.setUTCHours(0, 0, 0, 0);

    const fimFormatado = new Date(fim);
    fimFormatado.setUTCHours(23, 59, 58, 999);

    const inicioISO = inicioFormatado.toISOString();
    const fimISO = fimFormatado.toISOString();
    try {
        const { data }: AxiosResponse<PassagensTotais> = await api.get('/passagens-por-periodo', {
            params: {
                inicio: inicioISO,
                fim: fimISO
            }
        })
        return data
    } catch (e) {
        console.error(e)
    }
}