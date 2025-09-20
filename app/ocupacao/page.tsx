'use client'
import EstatisticasTotalVisitantes from "@/components/estatistica/estatistica-total-visitantes";
import GraficoBarrasTotais from "@/components/estatistica/grafico-barras-totais";
import { FiltroPorData } from "@/components/filtros/filtro-por-data";
import { getPassagensAgora, getPassagensTotais } from "@/services/passagens-api";
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
        const ha5minutos = new Date(new Date().setMinutes((agora.getMinutes() - 5))) // Subtrai 5 minutos
        getPassagensAgora().then(data => { tratarDadosGerais(data) })
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
                <section className="flex gap-6 items-center">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={useMes}
                            onChange={() => {
                                setUseAgora(false)
                                setUseData(false)
                                setUseMes(true)
                            }}
                            className="w-5 h-5 accent-blue-500 rounded focus:ring-2 focus:ring-blue-400 bg-gray-900 border-gray-600"
                        />
                        <span className="text-white font-medium">Por Mês</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={useData}
                            onChange={() => {
                                setUseAgora(false)
                                setUseMes(false)
                                setUseData(true)
                                getPassagensTotais(inicio, fim).then(data => { tratarDadosGerais(data) })
                            }}
                            className="w-5 h-5 accent-blue-500 rounded focus:ring-2 focus:ring-blue-400 bg-gray-900 border-gray-600"
                        />
                        <span className="text-white font-medium">Por Data</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={useAgora}
                            onChange={() => {
                                setUseData(false)
                                setUseMes(false)
                                setUseAgora(true)
                                onChangeAgora()
                            }}
                            className="w-5 h-5 accent-blue-500 rounded focus:ring-2 focus:ring-blue-400 bg-gray-900 border-gray-600"
                        />
                        <span className="text-white font-medium">Agora</span>
                    </label>
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