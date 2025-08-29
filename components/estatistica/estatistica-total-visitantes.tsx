'use client';

import { Briefcase, Users } from "lucide-react";

type EstatisticasTotalVisitantesProps = {
    oportunidades: number;
    ocupantesVisitantes: number;
    crescimentoOportunidades: number;
    crescimentoVisitantes: number;
}

export default function EstatisticasTotalVisitantes({
    oportunidades,
    ocupantesVisitantes,
    crescimentoOportunidades,
    crescimentoVisitantes
}: EstatisticasTotalVisitantesProps) {
    const formatCrescimento = (crescimento: number) => {
        return crescimento > 0
            ? `+${crescimento.toFixed(2)}%`
            : `${crescimento.toFixed(2)}%`;
    };

    return (
        <section className="flex flex-col w-[90%] md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-700 bg-gray-900 text-white rounded-lg">

            <section className="flex flex-col items-center flex-1 p-4 text-xs">
                <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="w-5 h-5 text-blue-400" />
                    <h2 className="text-blue-400 font-bold">Oportunidades</h2>
                </div>
                <p className="text-5xl font-extrabold drop-shadow-md">{oportunidades}</p>
                <p className={`mt-2 text-lg ${crescimentoOportunidades > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {formatCrescimento(crescimentoOportunidades)} do mês anterior
                </p>
            </section>

            <section className="flex flex-col items-center flex-1 p-4 text-xs">
                <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-blue-400" />
                    <h2 className="text-blue-400 font-bold">Ocupantes/Visitantes Únicos</h2>
                </div>
                <p className="text-5xl font-extrabold drop-shadow-md">{ocupantesVisitantes}</p>
                <p className={`mt-2 text-lg ${crescimentoVisitantes > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {formatCrescimento(crescimentoVisitantes)} do mês anterior
                </p>
            </section>
        </section>
    );
}