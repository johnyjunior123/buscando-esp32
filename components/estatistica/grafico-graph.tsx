'use client'

import { useEffect, useRef } from 'react';
import { Network, DataSet, Node, Edge } from 'vis-network/standalone';

type NodeType = { id: number; label: string };
type LinkType = { source: string; target: string; value: number };

interface PathsGraphProps {
    nodes: NodeType[];
    links: LinkType[];
}

export default function PathsGraph({ nodes, links }: PathsGraphProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const networkRef = useRef<Network | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // ------------------------------------------------------
        // 🎨 Cores individuais para cada node
        // ------------------------------------------------------
        const nodeColors = [
            "#FF6B6B", "#4D96FF", "#6BCB77", "#FFD93D",
            "#845EC2", "#F9F871", "#FF9671", "#00C9A7",
            "#C34A36", "#0081CF", "#FFC75F", "#D65DB1"
        ];

        // ------------------------------------------------------
        // MAP: label → id
        // ------------------------------------------------------
        const labelToId: Record<string, string | number> = {};
        nodes.forEach(n => {
            const key = n.label.trim().toLowerCase();
            labelToId[key] = n.id;
        });

        // ------------------------------------------------------
        // Normalizar links transformando source/target → IDs
        // ------------------------------------------------------
        const normalizedLinks = links
            .map(link => {
                const sourceKey = link.source.trim().toLowerCase();
                const targetKey = link.target.trim().toLowerCase();

                if (!labelToId[sourceKey] || !labelToId[targetKey]) {
                    console.warn("Edge ignorado, sem node correspondente:", link);
                    return null;
                }

                return {
                    from: labelToId[sourceKey],
                    to: labelToId[targetKey],
                    value: link.value,
                };
            })
            .filter(Boolean) as { from: string | number; to: string | number; value: number }[];

        // ------------------------------------------------------
        // Criar nodes com cores individuais
        // ------------------------------------------------------
        const visNodes = new DataSet<Node>(
            nodes.map((node, i) => ({
                id: node.id,
                label: node.label,
                color: nodeColors[i % nodeColors.length], // 🎨 cor única
                font: { color: '#fff', size: 14 },
                size: 26,
                borderWidth: 2,
            }))
        );

        // ------------------------------------------------------
        // Criar edges (fluxos)
        // ------------------------------------------------------
        const visEdges = new DataSet<Edge>(
            normalizedLinks.map((link, idx) => ({
                from: link.from,
                to: link.to,
                width: Math.max(1, Math.log(link.value + 1) * 3),
                color: {
                    color: `hsl(${(idx / normalizedLinks.length) * 360}, 70%, 60%)`
                },
                arrows: { to: { enabled: true } },
                label: `${link.value}`,
                font: { color: '#fff', size: 12 },
            }))
        );

        const data = { nodes: visNodes, edges: visEdges };

        // ------------------------------------------------------
        // Physics
        // ------------------------------------------------------
        const options = {
            physics: {
                enabled: true,
                barnesHut: {
                    gravitationalConstant: -2000,
                    springLength: 130,
                },
            },
            nodes: { shape: 'dot' },
            edges: { smooth: true },
        };

        networkRef.current = new Network(containerRef.current, data, options);

        return () => networkRef.current?.destroy();
    }, [nodes, links]);

    return (
        <div className="relative">
            <div ref={containerRef} style={{ width: '100%', height: '650px' }} />
        </div>
    );
}
