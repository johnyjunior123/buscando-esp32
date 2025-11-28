import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Legend,
} from "recharts"

export type DiaFrequencia = {
    day: number
    percent: number
}

export type PropsTimeFrame = {
    local: string
    dailyAverage: number
    dados: DiaFrequencia[]
}

export function GraficoTimeFrame({ local, dailyAverage, dados }: PropsTimeFrame) {
    return (
        <div className="bg-gray-900 p-5 rounded-lg shadow w-full">
            <h2 className="text-xl text-white font-semibold mb-4">
                Frequência mensal em {local} ({dailyAverage}% daily average)
            </h2>

            <div className="w-full h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dados} margin={{ left: 10, right: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="day" stroke="#ccc" />
                        <YAxis
                            stroke="#ccc"
                            domain={[0, 100]}
                            ticks={[0, 20, 40, 60, 80, 100]}
                        />
                        <Tooltip
                            contentStyle={{ background: "#1f2937", border: "1px solid #555" }}
                            itemStyle={{ color: "#fff" }}
                            formatter={(v) => `${v}%`}
                        />
                        <Legend />

                        <Bar
                            dataKey="percent"
                            name="Frequency (%)"
                            fill="#60a5fa"
                            radius={[6, 6, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}