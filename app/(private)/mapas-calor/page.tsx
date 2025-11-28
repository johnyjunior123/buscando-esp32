'use client'

import { pontosPenedo } from "@/utils/constants/pontos"
import dynamic from "next/dynamic"

const MapaCalor = dynamic(
    () =>
        import('@/components/estatistica/mapa-calor').then((mod) => mod.MapaCalor),
    { ssr: false }
)


export default function MapaCalorPage() {
    return (
        <main className="flex flex-col flex-1 min-h-screen p-6 bg-black text-white gap-6 items-center">
            <MapaCalor pontos={pontosPenedo} />
        </main>
    )
}
