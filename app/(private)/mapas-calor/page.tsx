'use client'

import dynamic from "next/dynamic"
import { pontosPenedo } from "@/mock/teste"

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
