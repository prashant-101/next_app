"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type SpeciesMapProps = {
  location?: string;
  name?: string;
};

type MapPoint = {
  lat: number;
  lng: number;
};

/* =========================================================
   CUSTOM MARKER
   Prevents Leaflet from requesting marker-icon-2x.png
========================================================= */

const speciesIcon = L.divIcon({
  className: "species-map-marker",
  html: `
    <div
      style="
        width: 30px;
        height: 30px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        background: #dc2626;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.35);
      "
    >
      <div
        style="
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          position: absolute;
          top: 8px;
          left: 8px;
        "
      ></div>
    </div>
  `,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

/* =========================================================
   PARSE COORDINATES
========================================================= */

function parseLocations(location?: string): MapPoint[] {
  if (!location || typeof location !== "string") {
    return [];
  }

  return location
    .split("|")
    .map((part) => {
      const values = part.trim().split(",");

      if (values.length < 2) {
        return null;
      }

      const lat = Number(values[0].trim());
      const lng = Number(values[1].trim());

      if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
        return null;
      }

      return {
        lat,
        lng,
      };
    })
    .filter((point): point is MapPoint => point !== null);
}

/* =========================================================
   MAP
========================================================= */

export default function SpeciesMap({
  location,
  name = "Species",
}: SpeciesMapProps) {
  const points = useMemo(() => parseLocations(location), [location]);
  
  // Track scroll zoom activation state
  const [isMapActive, setIsMapActive] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Disable zoom scroll when clicking outside the map component
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsMapActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* -------------------------------------------------------
     NO LOCATION
  ------------------------------------------------------- */

  if (points.length === 0) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center rounded-2xl bg-slate-50 p-6 text-center">
        <div>
          <p className="font-semibold text-slate-700">
            Location data unavailable
          </p>

          <p className="mt-2 text-sm text-slate-500">
            No valid coordinates are available for {name}.
          </p>
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------
     CENTER
  ------------------------------------------------------- */

  const center: [number, number] = [points[0].lat, points[0].lng];

  return (
    <div
      ref={containerRef}
      onClick={() => setIsMapActive(true)}
      className="relative h-[400px] w-full overflow-hidden rounded-2xl"
    >
      {/* Helper overlay notification when scroll-zoom is inactive */}
      {!isMapActive && (
        <div className="pointer-events-none absolute right-3 top-3 z-[1000] rounded-lg bg-black/60 px-3 py-1.5 text-xs font-medium text-white shadow-md backdrop-blur-sm">
          Click map to enable scroll zoom
        </div>
      )}

      <MapContainer
        center={center}
        zoom={7}
        scrollWheelZoom={isMapActive}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {points.map((point, index) => (
          <Marker
            key={`${point.lat}-${point.lng}-${index}`}
            position={[point.lat, point.lng]}
            icon={speciesIcon}
          >
            <Popup>
              <div className="text-sm">
                <strong>{name}</strong>
                <br />
                <span>Latitude: {point.lat.toFixed(4)}</span>
                <br />
                <span>Longitude: {point.lng.toFixed(4)}</span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}