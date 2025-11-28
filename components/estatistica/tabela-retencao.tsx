export type LinhaRetention = {
    zone: string
    menor1Semana: number
    entre1e2Semanas: number
    menor1Mes: number
    entre1e2Meses: number
    mais2Meses: number
}

export type PropsRetention = {
    dados: LinhaRetention[]
}

export function TabelaRetention({ dados }: PropsRetention) {
    return (
        <div className="w-full bg-gray-900 p-6 rounded-lg shadow text-white overflow-x-auto">
            <h2 className="text-xl font-bold mb-4">Retenção por Zona</h2>

            <table className="w-full border-collapse min-w-[900px]">
                <thead>
                    <tr className="bg-gray-800 text-left text-sm">
                        <th className="p-3">Zona</th>
                        <th className="p-3">Menor que 1 semana</th>
                        <th className="p-3">Entre 1 e 2 semanas</th>
                        <th className="p-3">Menor que 1 mês</th>
                        <th className="p-3">Entre 1 e 2 meses</th>
                        <th className="p-3">Mais que 2 meses</th>
                    </tr>
                </thead>

                <tbody>
                    {dados.map((linha, index) => (
                        <tr
                            key={index}
                            className="border-b border-gray-700 hover:bg-gray-800/50 text-sm"
                        >
                            <td className="p-3 font-medium">{linha.zone}</td>
                            <td className="p-3">{linha.menor1Semana}</td>
                            <td className="p-3">{linha.entre1e2Semanas}</td>
                            <td className="p-3">{linha.menor1Mes}</td>
                            <td className="p-3">{linha.entre1e2Meses}</td>
                            <td className="p-3">{linha.mais2Meses}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
