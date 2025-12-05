'use client'

import { api } from "@/services/api-axios";
import { PontoPenedo } from "@/types/pontos-penedo";
import { getInicioEFimDoMes, meses } from "@/utils/help-datas";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MapaCalor = dynamic(
    () =>
        import('@/components/estatistica/mapa-calor').then((mod) => mod.MapaCalor),
    { ssr: false }
)

export default function MapaCalorPage() {
    const [mesSelecionado, setMesSelecionado] = useState<string>((new Date().getMonth() + 1).toString());
    const [pontosPenedo, setPontosPenedo] = useState<PontoPenedo[]>([])

    useEffect(() => {
        const { fim, inicio } = getInicioEFimDoMes(mesSelecionado)
        api.get('devices', {
            params: {
                start: inicio,
                end: fim
            }
        }).then(res => {
            setPontosPenedo(res.data as PontoPenedo[])
        })
    }, [mesSelecionado])

    return (
        <main className="flex flex-col flex-1 min-h-screen p-6 bg-black text-white gap-6 items-center">
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
            <MapaCalor pontos={pontosPenedo} />
        </main>
    )
}
