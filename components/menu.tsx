// components/Sidebar.tsx
import { Home, Activity, MapPin, Map, Clock, Users } from "lucide-react";

const menuDashboard = [
    { name: "Ocupação", icon: <Activity size={18} /> , link: '/ocupacao'},
    { name: "Comportamento", icon: <Users size={18} />, link: '/comportamento'},
    { name: "Caminhos", icon: <MapPin size={18} />, link: '/caminhos' },
];

const menuAnalitico = [
    { name: "Capacidade em tempo real", icon: <Clock size={18} />, link: '/capacidade' },
    { name: "Mapas de Calor", icon: <Map size={18} /> , link: '/mapas-calor'},
    { name: "Zonas de Visita", icon: <Home size={18} />, link: '/zonas' },
];

export default function MenuSideBar() {
    return (
        <aside className="w-64 h-screen bg-gray-900 text-white p-6 flex flex-col">
            <section className="mb-8">
                <h2 className="text-gray-300 font-bold mb-4 uppercase tracking-wide">
                    Dashboard
                </h2>
                <ul className="space-y-2">
                    {menuDashboard.map((item) => (
                        <li
                            key={item.name}
                            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 cursor-pointer transition-colors duration-200"
                        >
                            {item.icon}
                            <span className="font-medium">{item.name}</span>
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h2 className="text-gray-300 font-bold mb-4 uppercase tracking-wide">
                    Analítico
                </h2>
                <ul className="space-y-2">
                    {menuAnalitico.map((item) => (
                        <li
                            key={item.name}
                            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 cursor-pointer transition-colors duration-200"
                        >
                            {item.icon}
                            <span className="font-medium">{item.name}</span>
                        </li>
                    ))}
                </ul>
            </section>
        </aside>
    );
}