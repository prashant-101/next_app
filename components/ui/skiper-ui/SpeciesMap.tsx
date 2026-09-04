"use client";

import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

type SpeciesMapProps = {
  location?: string;
  name: string;
};

// 1. Declare sub-components OUTSIDE the parent component to avoid re-creation on render
function MapZoomController({
  active,
  useMap,
}: {
  active: boolean;
  useMap: () => any;
}) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    if (active) {
      map.scrollWheelZoom.enable();
    } else {
      map.scrollWheelZoom.disable();
    }
  }, [active, map]);

  return null;
}

export default function SpeciesMap({ location, name }: SpeciesMapProps) {
  const [mounted, setMounted] = useState(false);
  const [mapComponents, setMapComponents] = useState<any>(null);
  const [mapActive, setMapActive] = useState(false);

  useEffect(() => {
    // Dynamic loading to avoid Leaflet window/document SSR issues
    Promise.all([import("react-leaflet"), import("leaflet")]).then(
      ([reactLeaflet, leaflet]) => {
        setMapComponents({
          MapContainer: reactLeaflet.MapContainer,
          TileLayer: reactLeaflet.TileLayer,
          Marker: reactLeaflet.Marker,
          Popup: reactLeaflet.Popup,
          useMap: reactLeaflet.useMap,
          L: leaflet.default || leaflet,
        });
        setMounted(true);
      }
    );
  }, []);

  if (!mounted || !mapComponents) {
    return (
      <div className="h-[450px] rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500">
        Loading map...
      </div>
    );
  }

  if (!location) {
    return (
      <div className="h-[450px] rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500">
        Location information is not available.
      </div>
    );
  }

  const points = location
    .split("|")
    .map((point) => {
      const [lat, lng] = point.trim().split(",").map(Number);
      return { lat, lng };
    })
    .filter(
      (point) => Number.isFinite(point.lat) && Number.isFinite(point.lng)
    );

  if (points.length === 0) {
    return (
      <div className="h-[450px] rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500">
        Invalid location coordinates.
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup, useMap, L } = mapComponents;
  const center = points[0];

  const redConeIcon = L.divIcon({
    className: "",
    html: `
      <div style="
        width: 0;
        height: 0;
        border-left: 12px solid transparent;
        border-right: 12px solid transparent;
        border-bottom: 32px solid #dc2626;
        transform: rotate(180deg);
        filter: drop-shadow(0 2px 3px rgba(0,0,0,0.35));
      "></div>
    `,
    iconSize: [24, 32],
    iconAnchor: [12, 16],
    popupAnchor: [0, -16],
  });

  return (
    <div
      className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-sm"
      onClick={() => setMapActive(true)}
    >
      <div className="absolute z-[1000] top-4 left-1/2 -translate-x-1/2 bg-black/75 text-white px-4 py-2 rounded-full text-sm pointer-events-none">
        {mapActive ? "Map zoom enabled" : "Click map to enable zoom"}
      </div>

      <MapContainer
        center={[center.lat, center.lng]}
        zoom={7}
        scrollWheelZoom={false}
        className="h-[450px] w-full"
      >
        {/* Pass hook down cleanly without re-declaring component */}
        <MapZoomController active={mapActive} useMap={useMap} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {points.map((point, index) => (
          <Marker
            key={`point-${point.lat}-${point.lng}-${index}`}
            position={[point.lat, point.lng]}
            icon={redConeIcon}
          >
            <Popup>
              <div className="font-semibold">{name}</div>
              <div className="text-sm text-slate-500">
                {point.lat.toFixed(4)}, {point.lng.toFixed(4)}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}