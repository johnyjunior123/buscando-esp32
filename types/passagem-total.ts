import { PassagemPorLocal } from "./passagem-por-local"

export type PassagensTotais = {
    inicio: Date
    fim: Date
    locais: PassagemPorLocal[]
}

