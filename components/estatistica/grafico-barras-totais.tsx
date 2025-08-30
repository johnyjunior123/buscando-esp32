'use client';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Line,
} from "recharts";

type DadosGrafico = {
    local: string;
    oportunidades: number;
    unicos: number;
};

type GraficoBarrasTotaisProps = {
    dados: DadosGrafico[] | [];
};

export default function GraficoBarras({ dados }: GraficoBarrasTotaisProps) {
    const dadosComMedia = dados.map((d) => ({
        ...d,
        media: (Number(d.oportunidades) + Number(d.unicos)) / 2,
    }));

    return (
        <section className="flex flex-col w-[90%] h-[400px] p-6 bg-gray-900 text-white rounded-lg">
            <h2 className="text-xl font-bold mb-4">Comparativo por Local</h2>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={dadosComMedia}
                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="local" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip
                        contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
                        labelStyle={{ color: "#fff" }}
                    />
                    <Legend wrapperStyle={{ color: "#fff" }} />
                    <Bar name="Passagens" dataKey="oportunidades" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar name="Visitantes Únicos" dataKey="unicos" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Line
                        name="Média"
                        type="monotone"
                        dataKey="media"
                        stroke="#facc15"
                        strokeWidth={2}
                        dot={{ r: 4, fill: "#facc15" }}
                    />
                </BarChart>
            </ResponsiveContainer>
        </section>
    );
}