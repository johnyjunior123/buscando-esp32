"use client"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    CartesianGrid
} from "recharts"

type LinhaMetricas = {
    timestamp: string
    totalOpp?: number
    otherOpp?: number
    recurrentOpp?: number
    uniqueVisitors?: number
    avgPresenceTime?: number
}

type Props = {
    dados: LinhaMetricas[]
    metricasSelecionadas: {
        totalOpp: boolean
        otherOpp: boolean
        recurrentOpp: boolean
        uniqueVisitors: boolean
        avgPresenceTime: boolean
    }
}

export default function GraficoZona({ dados, metricasSelecionadas }: Props) {
    const cores: Record<string, string> = {
        totalOpp: "#4ade80",       // verde
        otherOpp: "#60a5fa",       // azul
        recurrentOpp: "#fbbf24",   // amarelo
        uniqueVisitors: "#f472b6", // rosa
        avgPresenceTime: "#c084fc" // roxo
    }

    return (
        <div className="w-full h-[400px] bg-gray-900 p-4 rounded">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dados}>

                    {/* Grade leve */}
                    <CartesianGrid stroke="rgba(255,255,255,0.1)" />

                    {/* Eixo X */}
                    <XAxis
                        dataKey="timestamp"
                        stroke="#ccc"
                    />

                    {/* Eixo Y */}
                    <YAxis
                        stroke="#ccc"
                    />

                    {/* Tooltip */}
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#1f2937",
                            border: "1px solid #4b5563",
                            borderRadius: "6px",
                            color: "white"
                        }}
                        labelStyle={{ color: "#fff" }}
                    />

                    {/* Legenda */}
                    <Legend
                        wrapperStyle={{ color: "#fff" }}
                    />

                    {/* Linha dinâmica para cada métrica marcada */}
                    {metricasSelecionadas.totalOpp && (
                        <Line
                            type="monotone"
                            dataKey="totalOpp"
                            stroke={cores.totalOpp}
                            strokeWidth={2}
                            dot={false}
                            name="Total Oportunidades"
                        />
                    )}

                    {metricasSelecionadas.otherOpp && (
                        <Line
                            type="monotone"
                            dataKey="otherOpp"
                            stroke={cores.otherOpp}
                            strokeWidth={2}
                            dot={false}
                            name="Outras Oportunidades"
                        />
                    )}

                    {metricasSelecionadas.recurrentOpp && (
                        <Line
                            type="monotone"
                            dataKey="recurrentOpp"
                            stroke={cores.recurrentOpp}
                            strokeWidth={2}
                            dot={false}
                            name="Oportunidades Recorrentes"
                        />
                    )}

                    {metricasSelecionadas.uniqueVisitors && (
                        <Line
                            type="monotone"
                            dataKey="uniqueVisitors"
                            stroke={cores.uniqueVisitors}
                            strokeWidth={2}
                            dot={false}
                            name="Visitantes Únicos"
                        />
                    )}

                    {metricasSelecionadas.avgPresenceTime && (
                        <Line
                            type="monotone"
                            dataKey="avgPresenceTime"
                            stroke={cores.avgPresenceTime}
                            strokeWidth={2}
                            dot={false}
                            name="Tempo Médio de Presença (hrs)"
                        />
                    )}

                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
