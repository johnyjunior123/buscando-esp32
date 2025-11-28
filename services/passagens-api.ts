import { PassagensAgora, PassagensTotais, PassagensTotaisProxy } from "@/types/passagem-total";
import { api } from "./api-axios";
import { AxiosResponse } from "axios";

export async function getPassagensTotais(inicio: Date, fim: Date): Promise<PassagensTotais | undefined> {
    const inicioFormatted = inicio.toISOString();
    const fimFormatted = fim.toISOString();
    try {
        const { data }: AxiosResponse<PassagensTotaisProxy> = await api.get('/detection/all', {
            params: {
                start: inicioFormatted,
                end: fimFormatted
            }
        })
        if (data.locations) {
            return {
                inicio: data.start, fim: data.end, locais: data.locations.map(element => {
                    element.local
                    element.oportunidades = Number(element.oportunidades)
                    element.unicos = Number(element.unicos)
                    return element
                })
            }
        }
        return {
            inicio: data.start, fim: data.end, locais: []
        }
    } catch (e) {
        console.log(e)
    }
}

export async function getPassagensAgora(): Promise<PassagensAgora | undefined> {
    try {
        const { data }: AxiosResponse<PassagensTotais> = await api.get('/agora')
        if (data.locais) {
            return {
                locais: data.locais.map(element => {
                    element.oportunidades = Number(element.oportunidades)
                    element.unicos = Number(element.unicos)
                    return element
                })
            }
        }
        return {
            locais: []
        }
    } catch (e) {
        console.log(e)
    }
}