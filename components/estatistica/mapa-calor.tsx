'use client'
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"

interface PontoMapa {
    lat: number
    lng: number
    unicos: number
    oportunidades: number
}

interface MapaCalorProps {
    pontos: PontoMapa[]
}

export function MapaCalor({ pontos }: MapaCalorProps) {
    return (
        <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
            <MapContainer
                center={[-10.2902, -36.5865]} // Centro de Penedo - AL
                zoom={30}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    attribution="&copy; OpenStreetMap"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {pontos.map((ponto, idx) => (
                    <Circle
                        key={idx}
                        center={[ponto.lat ? ponto.lat : -10.290619094731156, ponto.lng ? ponto.lng : -36.58656076442575]}
                        radius={10}
                        pathOptions={{
                            color: "red",
                            fillColor: "orange",
                            fillOpacity: 0.6,
                        }}
                    >
                        <Popup>
                            <div className="text-black">
                                <p><strong>Visitas Únicas:</strong> {ponto.unicos}</p>
                                <p><strong>Oportunidades:</strong> {ponto.oportunidades}</p>
                            </div>
                        </Popup>
                    </Circle>
                ))}
            </MapContainer>
        </div>
    )
}