import { Zone } from "@/types/zone"

type PropsCardsLealdade = {
    data: Zone
}

function calcularPercentual(atual: number, total: number) {
    return total === 0 ? "0%" : `${((atual / total) * 100).toFixed(1)}%`
}

function calcularDelta(atual: number, anterior: number) {
    if (anterior === 0) return "0%"
    const delta = ((atual - anterior) / anterior) * 100
    return `${delta.toFixed(1)}%`
}

export function CardsLealdade({ data }: PropsCardsLealdade) {
    const totalGeral = data.oneVisit + data.twoVisits + data.moreVisits

    const cards = [
        {
            titulo: "Visitou 1 vez",
            valor: data.oneVisit,
            percentual: calcularPercentual(data.oneVisit, totalGeral),
            delta: calcularDelta(data.oneVisit, data.prevOneVisit),
        },
        {
            titulo: "Visitou 2 vezes",
            valor: data.twoVisits,
            percentual: calcularPercentual(data.twoVisits, totalGeral),
            delta: calcularDelta(data.twoVisits, data.prevTwoVisits),
        },
        {
            titulo: "Mais de 2 vezes",
            valor: data.moreVisits,
            percentual: calcularPercentual(data.moreVisits, totalGeral),
            delta: calcularDelta(data.moreVisits, data.prevMoreVisits),
        }
    ]

    return (
        <div className="flex flex-wrap gap-6 justify-center mt-6 w-full">
            {cards.map((card, i) => (
                <div
                    key={i}
                    className="bg-gray-900 text-white rounded-lg p-6 w-full md:w-[30%] shadow flex flex-col gap-3"
                >
                    <h3 className="text-lg font-semibold">{card.titulo}</h3>

                    <span className="text-4xl font-bold">{card.valor}</span>

                    <span className="text-gray-300 text-sm">
                        Representa <strong>{card.percentual}</strong> dos visitantes
                    </span>

                    <div className="flex items-center gap-2 text-sm">
                        <span
                            className={
                                parseFloat(card.delta) >= 0
                                    ? "text-green-400 font-semibold"
                                    : "text-red-400 font-semibold"
                            }
                        >
                            {parseFloat(card.delta) >= 0 ? "↑" : "↓"} {card.delta}
                        </span>
                        <span className="text-gray-400">(vs mês anterior)</span>
                    </div>
                </div>
            ))}
        </div>
    )
}
