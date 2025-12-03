'use client'

import PathsGraph from '@/components/estatistica/grafico-graph';
import { api } from '@/services/api-axios';
import { useEffect, useState } from 'react';

interface NodeType { id: number; label: string }
interface LinkType { source: string; target: string; value: number }

export default function CaminhosPage() {
    const [startDate, setStartDate] = useState<string>(new Date().toISOString());
    const [endDate, setEndDate] = useState<string>(new Date().toISOString());
    const [nodes, setNodes] = useState<NodeType[]>([])
    const [links, setLinks] = useState<LinkType[]>([])

    const getLinks = async (start: string, end: string): Promise<LinkType[]> => {
        const res = await api.get('/links', {
            params: {
                start,
                end
            }
        })
        return res.data
    }

    useEffect(() => {
        api.get('/locations').then(res => {
            const locations = res.data as string[]
            const newNodes = locations.map((element, idx) => {
                return {
                    id: idx,
                    label: element
                } as NodeType
            })
            setNodes(newNodes)
        })
    }, [])

    useEffect(() => {
        getLinks(startDate, endDate).then(data => {
            setLinks(data)
        })
    }, [startDate, endDate])

    return (
        <main className="flex flex-col flex-1 items-center p-6 bg-black text-white">
            <div className="flex flex-col md:flex-row gap-4 mb-6 max-w-xl">
                <div className="flex flex-col">
                    <label className="text-sm mb-1">Data Início</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                        className="p-2 rounded-md bg-gray-800 border border-gray-700 text-white"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm mb-1">Data Fim</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                        className="p-2 rounded-md bg-gray-800 border border-gray-700 text-white"
                    />
                </div>
            </div>
            <PathsGraph nodes={nodes} links={links} />
        </main>
    );
}
