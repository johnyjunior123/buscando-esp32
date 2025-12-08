'use client'

import { useEffect, useState } from "react"
import { api } from "@/services/api-axios"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import GraficoZona from "@/components/estatistica/grafico-zonas"

type Zona = string

type OpcaoMetricas = {
    totalOpp: boolean
    otherOpp: boolean
    recurrentOpp: boolean
    uniqueVisitors: boolean
    avgPresenceTime: boolean
}

type DadosGrafico = {
    timestamp: string
    totalOpp?: number
    otherOpp?: number
    recurrentOpp?: number
    uniqueVisitors?: number
    avgPresenceTime?: number
}

type MetricasResumo = {
    totalOpp?: number
    otherOpp?: number
    recurrentOpp?: number
    uniqueVisitors?: number
    avgPresenceTime?: number
}

export default function ZonasPage() {
    const [dataInicio, setDataInicio] = useState<string>("")
    const [dataFim, setDataFim] = useState<string>("")
    const [zonas, setZonas] = useState<Zona[]>(['Ectron', 'Zhi', 'Lhi', 'For', 'Night'])
    const [zonasSelecionadas, setZonasSelecionadas] = useState<string[]>([])
    const [opcoes, setOpcoes] = useState<OpcaoMetricas>({
        totalOpp: false,
        otherOpp: false,
        recurrentOpp: false,
        uniqueVisitors: false,
        avgPresenceTime: false
    })
    const [dadosGrafico, setDadosGrafico] = useState<DadosGrafico[]>([])
    const [metricasResumo, setMetricasResumo] = useState<MetricasResumo>({})
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        api.get('/locations')
            .then(res => setZonas(res.data))
            .catch(() => setZonas([]))
    }, [])

    useEffect(() => {
        const fetchDados = async () => {
            if (!dataInicio || !dataFim || zonasSelecionadas.length === 0) {
                setDadosGrafico([])
                setMetricasResumo({})
                return
            }
            setLoading(true)
            try {
                const body = {
                    dataInicio,
                    dataFim,
                    zonas: zonasSelecionadas,
                    metricas: opcoes
                }

                const res = await api.post("/zone-all", body)
                const { grafico, metricas } = res.data

                setDadosGrafico(grafico)
                setMetricasResumo(metricas)
            } catch (err) {
                console.error(err)
                setDadosGrafico([])
                setMetricasResumo({})
            } finally {
                setLoading(false)
            }
        }

        fetchDados()
    }, [dataInicio, dataFim, zonasSelecionadas, opcoes])

    const toggleZona = (zona: string) => {
        setZonasSelecionadas(prev =>
            prev.includes(zona)
                ? prev.filter(z => z !== zona)
                : [...prev, zona]
        )
    }

    return (
        <main className="flex flex-1 flex-col min-h-screen p-6 gap-6 bg-gray-900 text-white">

            {/* Seletor de datas e métricas */}
            <section className="flex w-full flex-col bg-gray-800 p-4 rounded-md border border-gray-700">
                <div className="flex gap-2 mb-4">
                    <Label className="text-gray-300">Data Início</Label>
                    <input
                        type="date"
                        value={dataInicio}
                        onChange={(e) => setDataInicio(e.target.value)}
                        className="bg-gray-700 p-2 rounded border border-gray-600 text-white"
                    />
                    <Label className="text-gray-300">Data Fim</Label>
                    <input
                        type="date"
                        value={dataFim}
                        onChange={(e) => setDataFim(e.target.value)}
                        className="bg-gray-700 p-2 rounded border border-gray-600 text-white"
                    />
                </div>

                <Label className="font-semibold mb-2">Selecione as Métricas</Label>
                <div className="flex flex-wrap gap-3">
                    {[
                        { key: "totalOpp", label: "Total de oportunidades" },
                        { key: "otherOpp", label: "Other Opp" },
                        { key: "recurrentOpp", label: "Oportunidades recorrentes" },
                        { key: "uniqueVisitors", label: "Visitantes únicos" },
                        { key: "avgPresenceTime", label: "Média de tempo de presença" },
                    ].map(item => (
                        <div key={item.key} className="flex items-center gap-2">
                            <Checkbox
                                checked={opcoes[item.key as keyof OpcaoMetricas]}
                                onCheckedChange={(v) =>
                                    setOpcoes(prev => ({
                                        ...prev,
                                        [item.key]: Boolean(v)
                                    }))
                                }
                            />
                            <Label>{item.label}</Label>
                        </div>
                    ))}
                </div>
            </section>

            {/* Seleção de zonas */}
            <section className="w-full bg-gray-800 p-4 rounded-md border border-gray-700">
                <Label className="font-semibold mb-2 block">Zonas Disponíveis</Label>
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-2">
                    {zonas.map((zona, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <Checkbox
                                checked={zonasSelecionadas.includes(zona)}
                                onCheckedChange={() => toggleZona(zona)}
                            />
                            <Label>{zona}</Label>
                        </div>
                    ))}
                </div>
            </section>

            {/* Cards de métricas */}
            <section className="flex flex-wrap gap-4">
                {opcoes.totalOpp && (
                    <div className="bg-gray-700 p-4 rounded-md flex-1 text-center">
                        Total Opp: {metricasResumo.totalOpp ?? 0}
                    </div>
                )}
                {opcoes.otherOpp && (
                    <div className="bg-gray-700 p-4 rounded-md flex-1 text-center">
                        Other Opp: {metricasResumo.otherOpp ?? 0}
                    </div>
                )}
                {opcoes.recurrentOpp && (
                    <div className="bg-gray-700 p-4 rounded-md flex-1 text-center">
                        Recurrent Opp: {metricasResumo.recurrentOpp ?? 0}
                    </div>
                )}
                {opcoes.uniqueVisitors && (
                    <div className="bg-gray-700 p-4 rounded-md flex-1 text-center">
                        Unique Visitors: {metricasResumo.uniqueVisitors ?? 0}
                    </div>
                )}
                {opcoes.avgPresenceTime && (
                    <div className="bg-gray-700 p-4 rounded-md flex-1 text-center">
                        Avg Time: {metricasResumo.avgPresenceTime ?? 0} hrs
                    </div>
                )}
            </section>

            {/* Gráfico */}
            <section className="w-full bg-gray-800 p-4 rounded-md border border-gray-700 flex flex-col">
                {loading ? (
                    <p className="text-center text-gray-400">Carregando dados...</p>
                ) : dadosGrafico.length > 0 ? (
                    <GraficoZona metricasSelecionadas={opcoes} dados={dadosGrafico} />
                ) : (
                    <p className="text-center text-gray-400 mt-10">
                        Selecione datas, métricas e zonas para exibir o gráfico.
                    </p>
                )}
            </section>
        </main>
    )
}
