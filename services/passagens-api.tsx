import { PassagensTotais } from "@/types/passagem-total";
import { api } from "./api-axios";
import { AxiosResponse } from "axios";

export async function getPassagensTotais(inicio: Date, fim: Date): Promise<PassagensTotais | undefined> {
    const inicioFormatted = inicio.toISOString();
    const fimFormatted = fim.toISOString();
    try {
        const { data }: AxiosResponse<PassagensTotais> = await api.get('/passagens-por-periodo', {
            params: {
                inicio: inicioFormatted,
                fim: fimFormatted
            }
        })
        if (data.locais) {
            return {
                inicio: data.inicio, fim: data.fim, locais: data.locais.map(element => {
                    element.oportunidades = Number(element.oportunidades)
                    element.unicos = Number(element.unicos)
                    return element
                })
            }
        }
        return {
            inicio: data.inicio, fim: data.fim, locais: []
        }
    } catch (e) {
        console.log(e)
    }
}