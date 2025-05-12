"use client";
import Stable from "@/types/Stable";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import Image from "next/image";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

interface LeafletMapProps {
  coordinates: [number, number];
  markers: Stable[];
  zoom?: number;
}

export const Map = ({ coordinates, markers, zoom }: LeafletMapProps) => {
  return (
    <div style={{ height: "100%", width: "100%", zIndex: 0 }}>
      <MapContainer
        center={coordinates}
        zoom={zoom || 10}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker) => {
          return (
            <Marker
              key={"marker-" + marker.id}
              position={[marker.latitude!, marker.longitude!]}
            >
              <Popup className="">
                <section className="space-y-2">
                  <article className="flex items-center justify-center gap-2">
                    {marker.logoUrl && (
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_BACKEND_URL + marker.logoUrl
                        }
                        height={100}
                        width={100}
                        alt={`Logo de ${marker.name}`}
                        className="h-6 w-6"
                      />
                    )}
                    <h2 className="font-bold text-center">{marker.name}</h2>
                  </article>
                  <article className="flex flex-col leading-4 text-gray-500 italic">
                    <span>
                      {marker.numStreet} {marker.street}
                    </span>

                    <span>
                      {marker.zip} {marker.city}
                    </span>
                  </article>
                </section>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};
