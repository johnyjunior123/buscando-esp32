'use client'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

interface GraficoTempoRealProps {
    dados: { label: string; quantidade: number }[];
}

export default function GraficoTempoReal({ dados }: GraficoTempoRealProps) {
    return (
        <div className="w-full">
            <h2 className="text-xl font-semibold text-center mb-4">Gráfico de Tempo Real</h2>

            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={dados}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" interval="preserveStartEnd" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="quantidade" stroke="#4fc3f7" strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}