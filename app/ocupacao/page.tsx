'use client'
import EstatisticasTotalVisitantes from "@/components/estatistica/estatistica-total-visitantes";
import GraficoBarrasTotais from "@/components/estatistica/grafico-barras-totais";
import { getPassagensTotais } from "@/services/passagens-api";
import { PassagensTotais } from "@/types/passagem-total";
import { useEffect, useState } from "react";

type DadosGerais = {
    oportunidadesTotais: number
    unicos: number
}

const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];


export default function OcupacaoPage() {
    const [passagensTotais, setPassagensTotais] = useState<PassagensTotais>()
    const [useMes, setUseMes] = useState<boolean>(false)
    const [useData, setUseData] = useState<boolean>(true)
    const [mesSelecionado, setMesSelecionado] = useState<string>()
    const [dadosGerais, setDadosGerais] = useState<DadosGerais>({ oportunidadesTotais: 0, unicos: 0 })
    const [inicio, setInicio] = useState(new Date());
    const [fim, setFim] = useState(new Date());

    useEffect(() => {
        if (!inicio || !fim) return;

        getPassagensTotais(inicio, fim).then(data => {
            if (data) {
                setPassagensTotais(data)
                let oportunidades = 0
                let unicos = 0
                data.locais.forEach(element => {
                    oportunidades += element.oportunidades
                    unicos += element.unicos
                })
                setDadosGerais({ oportunidadesTotais: oportunidades, unicos })
            }
        })
    }, [inicio, fim, mesSelecionado])

    return (
        <main className="flex p-6 gap-6 items-center flex-1 flex-col bg-black">
            <h1 className="text-4xl text-white mb-8">Painel de Estatísticas</h1>
            <section className="flex items-center w-[90%] flex-col md:flex-row gap-6 text-white">
                <section className="flex gap-6 items-center">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={useMes}
                            onChange={() => {
                                setUseData(!useData)
                                setUseMes(!useMes)
                            }}
                            className="w-5 h-5 accent-blue-500 rounded focus:ring-2 focus:ring-blue-400 bg-gray-900 border-gray-600"
                        />
                        <span className="text-white font-medium">Usar Mês</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={useData}
                            onChange={() => {
                                setUseData(!useData)
                                setUseMes(!useMes)
                            }}
                            className="w-5 h-5 accent-blue-500 rounded focus:ring-2 focus:ring-blue-400 bg-gray-900 border-gray-600"
                        />
                        <span className="text-white font-medium">Usar Data</span>
                    </label>
                </section>

                {useMes && (
                    <section className="flex flex-col">
                        <label className="font-semibold mb-1">Selecione o mês</label>
                        <select
                            value={mesSelecionado}
                            onChange={(e) => setMesSelecionado(e.target.value)}
                            className="p-2 rounded-md border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">-- Selecione --</option>
                            {meses.map((mes, idx) => (
                                <option key={idx} value={idx + 1}>{mes}</option>
                            ))}
                        </select>
                    </section>
                )}

                {useData && (
                    <section className="flex gap-4 flex-col md:flex-row">
                        <div className="flex flex-col">
                            <label className="font-semibold mb-1">Data Início</label>
                            <input
                                type="date"
                                value={inicio.toISOString().split("T")[0]}
                                onChange={(e) => setInicio(new Date(e.target.value))}
                                className="p-2 rounded-md border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold mb-1">Data Fim</label>
                            <input
                                type="date"
                                value={fim.toISOString().split("T")[0]}
                                onChange={(e) => setFim(new Date(e.target.value))}
                                className="p-2 rounded-md border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </section>
                )}
            </section>
            <EstatisticasTotalVisitantes
                oportunidades={dadosGerais.oportunidadesTotais}
                ocupantesVisitantes={dadosGerais.unicos}
                crescimentoVisitantes={0}
                crescimentoOportunidades={0}
            />
            <GraficoBarrasTotais dados={passagensTotais?.locais ? passagensTotais.locais : []} />
        </main>
    )
}