"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

type SpeciesMapProps = {
  location?: string;
  name: string;
};

function MapZoomController({
  active,
}: {
  active: boolean;
}) {
  const map = useMap();

  useEffect(() => {
    if (active) {
      map.scrollWheelZoom.enable();
    } else {
      map.scrollWheelZoom.disable();
    }
  }, [active, map]);

  return null;
}

function createRedConeIcon() {
  return L.divIcon({
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
}

export default function SpeciesMap({
  location,
  name,
}: SpeciesMapProps) {
  const [mapActive, setMapActive] = useState(false);

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
      const [lat, lng] = point
        .trim()
        .split(",")
        .map(Number);

      return { lat, lng };
    })
    .filter(
      (point) =>
        Number.isFinite(point.lat) &&
        Number.isFinite(point.lng)
    );

  if (points.length === 0) {
    return (
      <div className="h-[450px] rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500">
        Invalid location coordinates.
      </div>
    );
  }

  const center = points[0];

  const redCone = createRedConeIcon();

  return (
    <div
      className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-sm"
      onClick={() => setMapActive(true)}
    >

      {/* MAP INSTRUCTION */}
      {!mapActive && (
        <div className="absolute z-[1000] top-4 left-1/2 -translate-x-1/2 bg-black/75 text-white px-4 py-2 rounded-full text-sm pointer-events-none">
          Click map to enable zoom
        </div>
      )}

      {mapActive && (
        <div className="absolute z-[1000] top-4 left-1/2 -translate-x-1/2 bg-black/75 text-white px-4 py-2 rounded-full text-sm pointer-events-none">
          Map zoom enabled
        </div>
      )}

      <MapContainer
        center={[center.lat, center.lng]}
        zoom={7}
        scrollWheelZoom={false}
        className="h-[450px] w-full"
      >

        <MapZoomController active={mapActive} />

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {points.map((point, index) => (
          <Marker
            key={`${point.lat}-${point.lng}-${index}`}
            position={[point.lat, point.lng]}
            icon={redCone}
          >
            <Popup>
              <div className="font-semibold">
                {name}
              </div>

              <div className="text-sm text-slate-500">
                {point.lat.toFixed(4)},{" "}
                {point.lng.toFixed(4)}
              </div>
            </Popup>
          </Marker>
        ))}

      </MapContainer>
    </div>
  );
}