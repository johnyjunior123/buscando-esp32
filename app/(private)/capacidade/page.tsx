'use client'
import { useState, useEffect } from "react"
import GraficoTempoReal from "@/components/estatistica/grafico-tempo-real"
import { api } from "@/services/api-axios"

type TempoRealData = {
    label: string
    quantidade: number
}

export default function GraficoTempoRealPage() {
    const [zonas, setZonas] = useState<string[]>()
    const [zonaSelecionada, setZonaSelecionada] = useState<string>("")
    const [periodoSelecionado, setPeriodoSelecionado] = useState<string>("")
    const [dadosGrafico, setDadosGrafico] = useState<TempoRealData[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        api.get('/locations').then(res => {
            setZonas(res.data)
        })
        if (zonaSelecionada && periodoSelecionado) {
            const fetchDados = async () => {
                setLoading(true)
                try {
                    const query = new URLSearchParams({
                        location: zonaSelecionada,
                        before: periodoSelecionado
                    }).toString()
                    const res = await api.get(`/time-real?${query}`)
                    const dados: TempoRealData[] = res.data
                    console.log(dados)
                    setDadosGrafico(dados)
                } catch (err) {
                    console.error(err)
                    setDadosGrafico([])
                } finally {
                    setLoading(false)
                }
            }

            fetchDados()
        } else {
            setDadosGrafico([])
        }
    }, [zonaSelecionada, periodoSelecionado])

    return (
        <main className="flex flex-col flex-1 min-h-screen p-6 items-center bg-black text-white gap-8">

            <section className="flex flex-col w-full mb-6">
                <label className="font-semibold mb-1 text-center">Selecione a Zona</label>
                <select
                    value={zonaSelecionada}
                    onChange={(e) => setZonaSelecionada(e.target.value)}
                    className="text-center p-2 rounded-md border border-gray-600 bg-gray-800 text-white mb-4"
                >
                    <option value="">-- Selecione a Zona --</option>
                    {zonas && zonas.map((zona, idx) => (
                        <option key={idx} value={zona}>{zona}</option>
                    ))}
                </select>

                <label className="font-semibold mb-1 text-center">Selecione o Período</label>
                <select
                    value={periodoSelecionado}
                    onChange={(e) => setPeriodoSelecionado(e.target.value)}
                    className="text-center p-2 rounded-md border border-gray-600 bg-gray-800 text-white"
                >
                    <option value="">-- Selecione o Período --</option>
                    <option value="30 mins">30 minutos</option>
                    <option value="1 hora">1 hora</option>
                    <option value="24 horas">24 horas</option>
                    <option value="7 dias">7 dias</option>
                    <option value="30 dias">30 dias</option>
                    <option value="1 ano">1 ano</option>
                    <option value="período completo">Período Completo</option>
                </select>
            </section>

            <section className="flex flex-col w-full">
                {loading && dadosGrafico ? (
                    <p className="text-center text-gray-400">Carregando dados...</p>
                ) : zonaSelecionada && periodoSelecionado ? (
                    <GraficoTempoReal dados={dadosGrafico} />
                ) : (
                    <p className="text-center text-gray-400">
                        Selecione uma zona e um período para visualizar o gráfico.
                    </p>
                )}
            </section>

        </main>
    )
}
