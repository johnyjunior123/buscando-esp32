// components/Sidebar.tsx
import { Home, Activity, MapPin, Map, Clock, Users } from "lucide-react";
import { ItemMenu } from "./item-menu";

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

    return (
        <aside className="w-64 h-screen gap-5 bg-gray-900 text-white p-6 flex flex-col">
            <select
                name="cidade"
                id="cidade"
                defaultValue="penedo"
                className="bg-gray-800 text-white border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
    );
}