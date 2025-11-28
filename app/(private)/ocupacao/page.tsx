'use client'
import EstatisticasTotalVisitantes from "@/components/estatistica/estatistica-total-visitantes";
import GraficoBarrasTotais from "@/components/estatistica/grafico-barras-totais";
import { FiltroPorData } from "@/components/filtros/filtro-por-data";
import { getPassagensTotais } from "@/services/passagens-api";
import { PassagensTotais } from "@/types/passagem-total";
import { getInicioEFimDoMes, meses } from "@/utils/help-datas";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

type DadosGerais = {
    oportunidadesTotais: number
    unicos: number
}

export default function OcupacaoPage() {
    const [passagensTotais, setPassagensTotais] = useState<PassagensTotais>()
    const [useMes, setUseMes] = useState<boolean>(false)
    const [useData, setUseData] = useState<boolean>(true)
    const [useAgora, setUseAgora] = useState<boolean>(false)
    const [mesSelecionado, setMesSelecionado] = useState<string>()
    const [dadosGerais, setDadosGerais] = useState<DadosGerais>({ oportunidadesTotais: 0, unicos: 0 })
    const [inicio, setInicio] = useState(new Date());
    const [fim, setFim] = useState(new Date());

    const tratarDadosGerais = (dados: PassagensTotais | undefined) => {
        if (dados) {
            setPassagensTotais(dados)
            let oportunidades = 0
            let unicos = 0
            dados.locais.forEach(element => {
                oportunidades += element.oportunidades
                unicos += element.unicos
            })
            setDadosGerais({ oportunidadesTotais: oportunidades, unicos })
        }
    }

    const onChangeAgora = () => {
        const agora = new Date();
        const ha5minutos = new Date(new Date().setMinutes((agora.getMinutes() - 5)))
        getPassagensTotais(ha5minutos, agora).then(data => { tratarDadosGerais(data) })
    }

    const onChangeInicio = (inicio: Date | null) => {
        if (!inicio) return
        inicio.setHours(0, 0, 0, 0);
        setInicio(inicio)
        console.log(inicio)
        getPassagensTotais(inicio, fim).then(data => { tratarDadosGerais(data) })
    }

    const onChangeFim = (fim: Date | null) => {
        if (!fim) return
        fim.setHours(23, 59, 59, 999);
        setFim(fim)
        console.log(fim)
        getPassagensTotais(inicio, fim).then(data => { tratarDadosGerais(data) })
    }

    const onChangeMes = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (!event.target.value) return
        setMesSelecionado(event.target.value)
        const range = getInicioEFimDoMes(event.target.value, new Date().getFullYear())
        getPassagensTotais(range.inicio, range.fim).then(data => { tratarDadosGerais(data) })
    }

    useEffect(() => {
        if (!inicio || !fim) return;
        inicio.setHours(0, 0, 0, 0);
        fim.setHours(23, 59, 59, 999);
        getPassagensTotais(inicio, fim).then(data => { tratarDadosGerais(data) })
    }, [])

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (useAgora) {
            interval = setInterval(() => {
                onChangeAgora();
            }, 10000);
        } else {
            if (interval) clearInterval(interval);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [useAgora]);


    return (
        <main className="flex flex-1 p-6 gap-6 items-center flex-1 flex-col bg-black">
            <h1 className="text-4xl text-white mb-8 font-bold">Painel de Estatísticas</h1>
            <section className="flex items-center w-[90%] flex-col md:flex-row gap-6 text-white">
                <section className="flex gap-4 items-center">
                    <button
                        className={`px-4 py-2 rounded-lg border 
            ${useMes
                                ? "bg-blue-600 border-blue-400 text-white"
                                : "bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
                            }`}
                        onClick={() => {
                            setUseMes(true)
                            setUseData(false)
                            setUseAgora(false)
                        }}
                    >
                        Por Mês
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg border
            ${useData
                                ? "bg-blue-600 border-blue-400 text-white"
                                : "bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
                            }`}
                        onClick={() => {
                            setUseMes(false)
                            setUseData(true)
                            setUseAgora(false)
                            getPassagensTotais(inicio, fim).then(data => { tratarDadosGerais(data) })
                        }}
                    >
                        Por Data
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg border
            ${useAgora
                                ? "bg-blue-600 border-blue-400 text-white"
                                : "bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
                            }`}
                        onClick={() => {
                            setUseMes(false)
                            setUseData(false)
                            setUseAgora(true)
                            onChangeAgora()
                        }}
                    >
                        Agora
                    </button>
                </section>

                {useMes && (
                    <section className="flex flex-col">
                        <label className="font-semibold mb-1">Selecione o mês</label>
                        <select
                            value={mesSelecionado}
                            onChange={onChangeMes}
                            className="p-2 rounded-md border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">-- Selecione --</option>
                            {meses.map((mes, idx) => (
                                <option key={idx} value={idx + 1}>{mes}</option>
                            ))}
                        </select>
                    </section>
                )}

                {useData && (
                    <FiltroPorData fim={fim} inicio={inicio} onChangeInicio={onChangeInicio} onChangeFim={onChangeFim} />
                )}
            </section>
            <EstatisticasTotalVisitantes
                oportunidades={dadosGerais.oportunidadesTotais}
                ocupantesVisitantes={dadosGerais.unicos}
                crescimentoVisitantes={0}
                crescimentoOportunidades={0}
            />
            <GraficoBarrasTotais dados={passagensTotais?.locais ? passagensTotais.locais : []} />
        </main>
    )
}