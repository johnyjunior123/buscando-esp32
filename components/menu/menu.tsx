'use client'
import { Home, Activity, MapPin, Map, Clock, Users, Menu, X } from "lucide-react";
import { ItemMenu } from "./item-menu";
import { useState } from "react";

const menuDashboard = [
    { name: "Ocupação", icon: <Activity size={18} />, link: '/ocupacao' },
    { name: "Comportamento", icon: <Users size={18} />, link: '/comportamento' },
    { name: "Caminhos", icon: <MapPin size={18} />, link: '/caminhos' },
];

const menuAnalitico = [
    { name: "Capacidade em tempo real", icon: <Clock size={18} />, link: '/capacidade' },
    { name: "Mapas de Calor", icon: <Map size={18} />, link: '/mapas-calor' },
    { name: "Zonas de Visita", icon: <Home size={18} />, link: '/zonas' },
];

export default function MenuSideBar() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                className="fixed top-4 left-4 z-50 p-2 text-white bg-gray-800 rounded-md md:hidden"
                onClick={() => setOpen(true)}
            >
                <Menu size={24} />
            </button>

            {open && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            <aside
                className={`fixed top-0 left-0 h-screen bg-gray-900 text-white p-6 flex flex-col transform transition-transform duration-300 z-50
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:w-64 overflow-y-auto`}
            >
                <button
                    className="self-end mb-6 text-gray-400 hover:text-white md:hidden"
                    onClick={() => setOpen(false)}
                >
                    <X size={24} />
                </button>

                <select
                    name="cidade"
                    id="cidade"
                    defaultValue="penedo"
                    className="w-full bg-gray-800 text-white border border-gray-700 rounded-md px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Selecione uma cidade</option>
                    <option value="penedo">Penedo</option>
                </select>

                <section className="mb-8">
                    <h2 className="text-gray-300 font-bold mb-4 uppercase tracking-wide">
                        Dashboard
                    </h2>
                    <ul className="space-y-2">
                        {menuDashboard.map((item, idx) => (
                            <ItemMenu key={idx} name={item.name} icon={item.icon} link={item.link} />
                        ))}
                    </ul>
                </section>

                <section>
                    <h2 className="text-gray-300 font-bold mb-4 uppercase tracking-wide">
                        Analítico
                    </h2>
                    <ul className="space-y-2">
                        {menuAnalitico.map((item, idx) => (
                            <ItemMenu key={idx} name={item.name} icon={item.icon} link={item.link} />
                        ))}
                    </ul>
                </section>
            </aside>
        </>
    );
}