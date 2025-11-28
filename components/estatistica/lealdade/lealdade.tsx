import { Zone } from "@/types/zone"
import { CardsLealdade } from "./cards-lealdade"

type PropsLealdadeSection = {
    dados?: Zone
}

export function LoyaltySection({ dados }: PropsLealdadeSection) {
    return (
        <section className="w-full flex flex-col items-center text-white">
            {dados ? (
                <CardsLealdade data={dados} />
            ) : (
                <p className="text-gray-500">Selecione uma zona para visualizar os dados.</p>
            )}
        </section>
    )
}