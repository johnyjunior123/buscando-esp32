import { PassagemPorLocal, PassagemPorLocalProxy } from "./passagem-por-local"

export type PassagensTotaisProxy = {
    start?: Date
    end?: Date
    locations: PassagemPorLocalProxy[]
}

export type PassagensTotais = {
    inicio?: Date
    fim?: Date
    locais: PassagemPorLocal[]
}

export type PassagensAgora = {
    locais: PassagemPorLocal[]
}

