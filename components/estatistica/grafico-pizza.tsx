import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from "recharts";

type PropsGrafico = {
    titulo: string
    labels: string[]
    valores: number[]
    cores?: string[]
}

export function GraficoPizza({ titulo, labels, valores, cores }: PropsGrafico) {
    const data = labels.map((label, index) => ({
        name: label,
        value: valores[index] ?? 0
    }))
    const coresUsadas = cores || [
        "#4ade80",
        "#60a5fa",
        "#f472b6",
        "#facc15",
        "#fb923c",
        "#a78bfa",
    ]
    return (
        <div className="bg-gray-900 flex flex-col items-center justify-center p-4 rounded-lg shadow w-full md:w-[45%]">
            <h2 className="text-white font-semibold mb-3">{titulo}</h2>
            <PieChart width={330} height={260}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    label={({ name, value }) => `${value}`}
                    paddingAngle={3}
                    dataKey="value"
                >
                    {data.map((_, index) => (
                        <Cell key={index} fill={coresUsadas[index % coresUsadas.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    )
}
