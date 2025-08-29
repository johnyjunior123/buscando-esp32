'use client';

import { Construction, XCircle } from 'lucide-react';

export default function NotFound() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
            <XCircle className="w-20 h-20 text-red-500 mb-6 animate-bounce" />
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-2xl mb-6">Pagina não encontrada.</p>

            <div className="flex items-center gap-3 text-yellow-400 text-xl">
                <Construction className="w-8 h-8 animate-pulse" />
                <span>Site ainda em construção!</span>
            </div>

            <p className="mt-8 text-gray-400 text-sm">
                <a href="/">Volte para a página inicial</a> ou confira outras seções.
            </p>
        </main>
    );
}
