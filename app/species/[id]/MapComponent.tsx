"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export interface MapComponentProps {
  locations?: { lat: number; lng: number }[];
  speciesName?: string;
}

// Nepal bounding box
const NEPAL_BOUNDS: L.LatLngBoundsLiteral = [
  [26.347, 80.058],
  [30.447, 88.201],
];

const NEPAL_CENTER: [number, number] = [28.3949, 84.124];

export default function MapComponent({
  locations = [],
  speciesName = "Nepal Region",
}: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!mapRef.current) return;

    /* =====================================================
       CREATE MAP
    ===================================================== */

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current, {
        scrollWheelZoom: false,
        zoomControl: true,
      }).setView(NEPAL_CENTER, 7);

      /* ===================================================
         OPEN STREET MAP
      =================================================== */

      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }
      ).addTo(mapInstanceRef.current);

      /* ===================================================
         ENABLE SCROLL ZOOM AFTER CLICK
      =================================================== */

      mapInstanceRef.current.on("click", () => {
        mapInstanceRef.current?.scrollWheelZoom.enable();
      });
    }

    const map = mapInstanceRef.current;

    /* =====================================================
       REMOVE OLD MARKERS
    ===================================================== */

    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    /* =====================================================
       CUSTOM MAP POINTER
    ===================================================== */

    const pointerIcon = L.divIcon({
      className: "custom-map-pointer",
      html: `
        <div class="map-pointer-wrapper">
          <div class="map-pointer">
            <div class="map-pointer-dot"></div>
          </div>
        </div>
      `,
      iconSize: [40, 50],
      iconAnchor: [20, 50],
      popupAnchor: [0, -48],
    });

    /* =====================================================
       ADD POINTERS
    ===================================================== */

    if (locations.length > 0) {
      locations.forEach((location, index) => {
        L.marker([location.lat, location.lng], {
          icon: pointerIcon,
          title: speciesName,
        })
          .addTo(map)
          .bindPopup(`
            <div style="min-width: 160px;">
              <strong style="font-size: 15px;">
                ${speciesName}
              </strong>
              <br />
              <span style="color: #64748b;">
                Location ${index + 1}
              </span>
              <br />
              <span style="font-size: 12px; color: #94a3b8;">
                ${location.lat.toFixed(4)}, 
                ${location.lng.toFixed(4)}
              </span>
            </div>
          `);
      });

      /* =====================================================
         FIT NEPAL + LOCATIONS
      ===================================================== */

      const pointsBounds = L.latLngBounds(
        locations.map((loc) => [loc.lat, loc.lng])
      );

      const nepalBounds = L.latLngBounds(NEPAL_BOUNDS);
      const combinedBounds = nepalBounds.extend(pointsBounds);

      map.fitBounds(combinedBounds, {
        padding: [30, 30],
        maxZoom: 8,
      });
    } else {
      map.setView(NEPAL_CENTER, 7);
    }

    /* =====================================================
       DISABLE SCROLL WHEN CLICKING OUTSIDE MAP
    ===================================================== */

    const handleOutsideClick = (e: MouseEvent) => {
      if (
        mapRef.current &&
        !mapRef.current.contains(e.target as Node)
      ) {
        map.scrollWheelZoom.disable();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    /* =====================================================
       CLEANUP
    ===================================================== */

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [locations, speciesName]);

  return (
    <>
      <style jsx global>{`
        .custom-map-pointer {
          background: transparent !important;
          border: none !important;
        }

        .map-pointer-wrapper {
          width: 40px;
          height: 50px;
          position: relative;
          display: flex;
          justify-content: center;
        }

        .map-pointer {
          width: 34px;
          height: 34px;
          background: #dc2626;
          border: 3px solid white;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.35);
          position: relative;
        }

        .map-pointer-dot {
          position: absolute;
          width: 10px;
          height: 10px;
          background: white;
          border-radius: 50%;
          top: 9px;
          left: 9px;
        }
      `}</style>

      <div ref={mapRef} className="w-full h-full" />
    </>
  );
}