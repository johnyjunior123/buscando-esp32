'use client'
import { GraficoTimeFrame, PropsTimeFrame } from "@/components/estatistica/grafico-barras-average"
import { GraficoPizza } from "@/components/estatistica/grafico-pizza"
import { LoyaltySection } from "@/components/estatistica/lealdade/lealdade"
import { PropsRetention, TabelaRetention } from "@/components/estatistica/tabela-retencao"
import { api } from "@/services/api-axios"
import { Zone } from "@/types/zone"
import { getInicioEFimDoMes, meses } from "@/utils/help-datas"
import { useEffect, useState } from "react"

type InicioFimMes = {
    inicio: Date
    fim: Date
}

export default function ComportamentoPage() {
    const [mesSelecionado, setMesSelecionado] = useState<string>((new Date().getMonth() + 1).toString());
    const [dadosDashboard, setDadosDashboard] = useState<DashboardData>()
    const [prazo, setPrazo] = useState<PropsTimeFrame[]>()
    const [retencoes, setRetencoes] = useState<PropsRetention>()
    const [inicioFimMesSelecionado, setInicioFimMesSelecionado] = useState<InicioFimMes>()
    const [zones, setZones] = useState<Zone[]>([]);
    const [zonaSelecionada, setZonaSelecionada] = useState<string>("");
    const [dadosZona, setDadosZona] = useState<Zone | null>(null);
    const [zonasNomes, setZonasNomes] = useState<string[]>([])
    const [modo, setModo] = useState<"overview" | "time" | "retention" | "loyalty">("overview")

    useEffect(() => {
        const data = getInicioEFimDoMes(mesSelecionado)
        setInicioFimMesSelecionado({
            inicio: data.inicio,
            fim: data.fim
        })
        pegarDadosVisaoGeral(data.inicio, data.fim)
        gerarTimeFrame(data.inicio, data.fim)
        pegarRetencoes(data.inicio, data.fim)
        pegarZones(data.inicio, data.fim)
    }, [mesSelecionado])

    useEffect(() => {
        if (!zonaSelecionada) return;
        const zona = zones.find(z => z.zone === zonaSelecionada);
        if (zona) setDadosZona(zona);
    }, [zonaSelecionada, zones]);

    const pegarDadosVisaoGeral = async (inicio: Date, fim: Date) => {
        const res = await api.get("/dashboard", {
            params: {
                start: inicio,
                end: fim
            }
        })
        const dados = res.data
        setDadosDashboard(dados)
    }

    const gerarTimeFrame = async (inicio: Date, fim: Date) => {
        const res = await api.get("/time-frame-all", {
            params: {
                start: inicio,
                end: fim
            }
        })
        const dados = res.data
        setPrazo(dados)
    }

    const pegarRetencoes = async (inicio: Date, fim: Date) => {
        const res = await api.get("/retentions", {
            params: {
                start: inicio,
                end: fim
            }
        })
        const dados = res.data
        setRetencoes(dados)
    }

    const pegarZones = async (inicio: Date, fim: Date) => {
        try {
            const res = await api.get("/zone", {
                params: {
                    start: inicio,
                    end: fim
                }
            })
            setZones(res.data);
            res.data.map((element: Zone) => {
                setZonasNomes([...zonasNomes, element.zone])
            })
            if (res.data.length > 0) {
                setZonaSelecionada(res.data[0].zone);
                setDadosZona(res.data[0]);
            }
        } catch (err) {
            console.error("Erro ao buscar zonas:", err);
        }
    };

    return (
        <main className="flex flex-col flex-1 min-h-screen p-6 items-center bg-black text-white gap-8">
            <section>
                <section className="flex flex-col">
                    <label className="font-semibold mb-1 text-center">Selecione o mês</label>
                    <select
                        value={mesSelecionado}
                        onChange={(e) => setMesSelecionado(e.target.value)}
                        className="text-center p-2 rounded-md border border-gray-600 bg-gray-800 text-white"
                    >
                        <option value="">-- Selecione --</option>
                        {meses.map((mes, idx) => (
                            <option key={idx} value={idx + 1}>{mes}</option>
                        ))}
                    </select>
                </section>
                <section className="flex gap-4 mt-4">
                    <button
                        className={`px-4 py-2 rounded-lg ${modo === "overview" ? "bg-blue-600" : "bg-gray-700"}`}
                        onClick={() => setModo("overview")}
                    >
                        Visão Geral
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg ${modo === "time" ? "bg-blue-600" : "bg-gray-700"}`}
                        onClick={() => setModo("time")}
                    >
                        Frequência
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg ${modo === "retention" ? "bg-blue-600" : "bg-gray-700"}`}
                        onClick={() => setModo("retention")}
                    >
                        Retenção
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg ${modo === "loyalty" ? "bg-blue-600" : "bg-gray-700"}`}
                        onClick={() => setModo("loyalty")}
                    >
                        Permanência
                    </button>
                </section>
            </section>
            {modo === "overview" && (
                <section className="flex flex-wrap gap-6 justify-center w-full">
                    {
                        dadosDashboard && (
                            <>
                                <GraficoPizza
                                    titulo="Oportunidades por distribuição de dias"
                                    labels={dadosDashboard.dadosDistribuicaoDias.labels}
                                    valores={dadosDashboard.dadosDistribuicaoDias.valores}
                                />

                                <GraficoPizza
                                    titulo="Tempo entre visitas"
                                    labels={dadosDashboard.dadosTempoEntreVisitas.labels}
                                    valores={dadosDashboard.dadosTempoEntreVisitas.valores}
                                />

                                <GraficoPizza
                                    titulo="Oportunidades por zona de distribuição"
                                    labels={dadosDashboard.dadosZonaDistribuicao.labels}
                                    valores={dadosDashboard.dadosZonaDistribuicao.valores}
                                />

                                <GraficoPizza
                                    titulo="Ano anterior"
                                    labels={dadosDashboard.dadosAnoAnterior.labels}
                                    valores={dadosDashboard.dadosAnoAnterior.valores}
                                />
                            </>
                        )
                    }
                </section>
            )}
            {modo === "time" && prazo && (
                prazo.map((element, idx) => (
                    < GraficoTimeFrame
                        key={idx}
                        local={element.local}
                        dailyAverage={element.dailyAverage}
                        dados={element.dados}
                    />
                ))
            )}
            {modo === "retention" && retencoes && (
                <TabelaRetention dados={retencoes.dados} />
            )}
            {modo === "loyalty" && (
                <section className="flex flex-col items-center gap-4 w-full">
                    <label className="font-semibold">Selecione a zona:</label>
                    <select
                        value={zonaSelecionada}
                        onChange={(e) => setZonaSelecionada(e.target.value)}
                        className="text-center p-2 rounded-md border border-gray-600 bg-gray-800 text-white"
                    >
                        {zones.map((z, idx) => (
                            <option key={idx} value={z.zone}>{z.zone}</option>
                        ))}
                    </select>

                    {dadosZona && (
                        <LoyaltySection
                            dados={zones.find(d => d.zone === zonaSelecionada)}
                        />
                    )}
                </section>
            )}
        </main>
    )
}