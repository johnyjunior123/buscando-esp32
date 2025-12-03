import { Home, Activity, MapPin, Map, Clock, Users } from "lucide-react";

export const menuDashboard = [
    { name: "Ocupação", icon: <Activity size={18} />, link: '/ocupacao' },
    { name: "Comportamento", icon: <Users size={18} />, link: '/comportamento' },
    { name: "Caminhos", icon: <MapPin size={18} />, link: '/caminhos' },
];

export const menuAnalitico = [
    { name: "Capacidade em tempo real", icon: <Clock size={18} />, link: '/capacidade' },
    { name: "Mapas de Calor", icon: <Map size={18} />, link: '/mapas-calor' },
    { name: "Zonas de Visita", icon: <Home size={18} />, link: '/zonas' },
];