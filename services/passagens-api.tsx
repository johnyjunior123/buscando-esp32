import { PassagensTotais } from "@/types/passagem-total";
import { api } from "./api-axios";
import { AxiosResponse } from "axios";

export async function getPassagensTotais(inicio: Date, fim: Date): Promise<PassagensTotais | undefined> {
    inicio.setHours(0, 0, 0, 0);
    const inicioISO = new Date(inicio.getTime() - 3 * 60 * 60 * 1000).toISOString();

    fim.setHours(23, 59, 59, 999);
    const fimISO = new Date(fim.getTime() - 3 * 60 * 60 * 1000).toISOString();
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