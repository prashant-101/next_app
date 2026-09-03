"use client";

import { number } from "framer-motion";
import React, { useState } from "react";

type Region = {
  id: string;
  name: string;
    number?:number;

  subtitle: string;
  description: string;
  forests: string;
  wildlife: string[];
  threats: string[];
  conservation: string;
};

const regions: Region[] = [
  {
    id: "terai",
    name: "Terai",
    subtitle: "Lowland forests & wetlands",
    description:
      "Nepal's southern lowlands contain some of the country's most productive forests, grasslands, rivers, and wetlands. These landscapes are especially important for large mammals and migratory birds.",
    forests:
      "Sal-dominated forests, riverine forests, grasslands, and wetland ecosystems.",
    wildlife: [
      "Greater One-horned Rhinoceros",
      "Bengal Tiger",
      "Asian Elephant",
      "Gharial",
    ],
    threats: [
      "Habitat fragmentation",
      "Human-wildlife conflict",
      "Illegal wildlife trade",
      "Forest conversion",
    ],
    conservation:
      "Protected areas, community forests, wildlife corridors, anti-poaching programs, and restoration of riverine habitats.",
  },
  {
    id: "chure",
    name: "Chure",
    subtitle: "Fragile forest landscape",
    description:
      "The Chure range forms an important ecological transition between the Terai and the middle hills. Its forests help stabilize soil, regulate water, and provide habitat for wildlife moving between ecosystems.",
    forests:
      "Mixed Sal forests, dry forests, river valleys, and regenerating woodland.",
    wildlife: [
      "Leopard",
      "Sloth Bear",
      "Spotted Deer",
      "Wild Boar",
    ],
    threats: [
      "Forest degradation",
      "Unmanaged extraction",
      "Erosion",
      "Habitat fragmentation",
    ],
    conservation:
      "Forest restoration, watershed protection, community participation, and improved management of natural resources.",
  },
  {
    id: "hills",
    name: "Mid-Hills",
    subtitle: "Community forests & diverse habitats",
    description:
      "The middle hills contain a mosaic of community forests, agricultural landscapes, rivers, and woodland. Community forestry has made these landscapes an important part of Nepal's conservation story.",
    forests:
      "Broadleaf forests, pine forests, mixed woodland, and community-managed forests.",
    wildlife: [
      "Red Panda",
      "Himalayan Black Bear",
      "Leopard",
      "Himalayan Serow",
    ],
    threats: [
      "Habitat fragmentation",
      "Infrastructure development",
      "Forest fires",
      "Human-wildlife conflict",
    ],
    conservation:
      "Community forestry, habitat restoration, wildlife monitoring, and landscape-level conservation.",
  },
  {
    id: "mountains",
    name: "Mountains",
    subtitle: "Alpine forests & high-altitude ecosystems",
    description:
      "Nepal's mountain regions contain coniferous forests, alpine meadows, rocky habitats, and high-altitude wetlands. These ecosystems support species adapted to some of the world's most extreme environments.",
    forests:
      "Fir, pine, birch, rhododendron, juniper, alpine meadows, and high-altitude vegetation.",
    wildlife: [
      "Snow Leopard",
      "Red Panda",
      "Himalayan Tahr",
      "Musk Deer",
    ],
    threats: [
      "Climate change",
      "Habitat degradation",
      "Infrastructure pressure",
      "Changing water availability",
    ],
    conservation:
      "Protected landscapes, community-based conservation, wildlife monitoring, and climate adaptation programs.",
  },
];

export default function HabitatContext() {
  const [selectedRegion, setSelectedRegion] = useState("terai");

  const activeRegion =
    regions.find((region) => region.id === selectedRegion) || regions[0];

  return (
    <section className="relative w-full overflow-hidden bg-[#020617] px-5 py-24 md:px-10 md:py-32">

      {/* Background glow */}
      <div className="pointer-events-none absolute left-[-180px] top-[15%] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="pointer-events-none absolute bottom-[-150px] right-[-100px] h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="mb-16">

          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-12 bg-cyan-400/70" />

            <span className="text-xs font-medium uppercase tracking-[0.3em] text-cyan-300">
              Nepal • Ecosystem Context
            </span>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">

            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
              Nepal's
              <br />

              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Forest Landscapes
              </span>
            </h2>

            <p className="max-w-xl text-sm leading-7 text-slate-400 md:text-base">
              Nepal's wildlife depends on a connected network of forests,
              rivers, grasslands, wetlands, and mountain ecosystems. Select a
              region to explore the habitats and species found across the
              country.
            </p>

          </div>
        </div>

        {/* ================================================= */}
        {/* MAP + REGION LIST */}
        {/* ================================================= */}

        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">

          {/* ================= MAP ================= */}

          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-white/[0.06] via-blue-950/20 to-black/40 p-5 shadow-[0_20px_100px_rgba(0,0,0,0.4)] backdrop-blur-2xl md:p-8">

            {/* Map header */}
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                  Interactive Map
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Select an ecological region
                </p>
              </div>

              <div className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-xs text-cyan-300">
                Nepal
              </div>
            </div>

            {/* SVG MAP */}
            <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden rounded-3xl bg-[#030b1c]">

              {/* grid */}
              <div
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              <svg
                viewBox="0 0 900 500"
                className="relative z-10 h-auto w-full max-w-5xl"
                role="img"
                aria-label="Illustrative ecological regions of Nepal"
              >
                {/* Mountain region */}
                <path
                  d="M110 155
                     L160 125
                     L215 105
                     L275 115
                     L330 92
                     L390 112
                     L450 88
                     L515 110
                     L575 95
                     L640 120
                     L700 105
                     L770 140
                     L815 175
                     L770 205
                     L705 215
                     L640 205
                     L575 220
                     L510 210
                     L445 225
                     L380 215
                     L315 230
                     L250 215
                     L190 225
                     L135 205
                     Z"
                  onClick={() => setSelectedRegion("mountains")}
                  className={`cursor-pointer stroke-white/20 transition-all duration-300 ${
                    selectedRegion === "mountains"
                      ? "fill-cyan-400/50 stroke-cyan-200"
                      : "fill-blue-900/70 hover:fill-cyan-400/30"
                  }`}
                />

                {/* Mid Hills */}
                <path
                  d="M135 205
                     L190 225
                     L250 215
                     L315 230
                     L380 215
                     L445 225
                     L510 210
                     L575 220
                     L640 205
                     L705 215
                     L770 205
                     L815 175
                     L830 225
                     L775 250
                     L715 265
                     L650 255
                     L585 275
                     L520 265
                     L455 280
                     L390 265
                     L325 280
                     L260 265
                     L200 275
                     L145 250
                     Z"
                  onClick={() => setSelectedRegion("hills")}
                  className={`cursor-pointer stroke-white/20 transition-all duration-300 ${
                    selectedRegion === "hills"
                      ? "fill-blue-400/50 stroke-blue-200"
                      : "fill-blue-950/80 hover:fill-blue-400/30"
                  }`}
                />

                {/* Chure */}
                <path
                  d="M145 250
                     L200 275
                     L260 265
                     L325 280
                     L390 265
                     L455 280
                     L520 265
                     L585 275
                     L650 255
                     L715 265
                     L775 250
                     L830 225
                     L842 270
                     L790 295
                     L730 310
                     L665 300
                     L600 320
                     L535 305
                     L470 320
                     L405 305
                     L340 320
                     L275 305
                     L210 315
                     L155 290
                     Z"
                  onClick={() => setSelectedRegion("chure")}
                  className={`cursor-pointer stroke-white/20 transition-all duration-300 ${
                    selectedRegion === "chure"
                      ? "fill-indigo-400/50 stroke-indigo-200"
                      : "fill-indigo-950/80 hover:fill-indigo-400/30"
                  }`}
                />

                {/* Terai */}
                <path
                  d="M155 290
                     L210 315
                     L275 305
                     L340 320
                     L405 305
                     L470 320
                     L535 305
                     L600 320
                     L665 300
                     L730 310
                     L790 295
                     L842 270
                     L830 330
                     L780 350
                     L720 365
                     L655 355
                     L590 375
                     L525 360
                     L460 375
                     L395 360
                     L330 375
                     L265 360
                     L205 370
                     L160 340
                     Z"
                  onClick={() => setSelectedRegion("terai")}
                  className={`cursor-pointer stroke-white/20 transition-all duration-300 ${
                    selectedRegion === "terai"
                      ? "fill-cyan-300/50 stroke-cyan-100"
                      : "fill-cyan-950/80 hover:fill-cyan-300/30"
                  }`}
                />

                {/* Nepal label */}
                <text
                  x="450"
                  y="180"
                  textAnchor="middle"
                  className="fill-white/50 text-[18px] uppercase tracking-[8px]"
                >
                  NEPAL
                </text>

                {/* Region labels */}
                <text
                  x="475"
                  y="145"
                  textAnchor="middle"
                  className="pointer-events-none fill-white/60 text-[13px]"
                >
                  MOUNTAINS
                </text>

                <text
                  x="475"
                  y="245"
                  textAnchor="middle"
                  className="pointer-events-none fill-white/60 text-[13px]"
                >
                  MID-HILLS
                </text>

                <text
                  x="475"
                  y="290"
                  textAnchor="middle"
                  className="pointer-events-none fill-white/60 text-[12px]"
                >
                  CHURE
                </text>

                <text
                  x="475"
                  y="345"
                  textAnchor="middle"
                  className="pointer-events-none fill-white/60 text-[13px]"
                >
                  TERAI
                </text>
              </svg>

            </div>

            {/* Map legend */}
            <div className="mt-5 flex flex-wrap gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-300" />
                Selected region
              </span>

              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-800" />
                Other regions
              </span>

              <span className="ml-auto">
                Click a region
              </span>
            </div>
          </div>

          {/* ================= REGION SELECTOR ================= */}

          <div className="flex flex-col gap-3">

            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-slate-500">
              Explore Regions
            </p>

            {regions.map((region) => {
              const active = selectedRegion === region.id;

              return (
                <button
                  key={region.id}
                  onClick={() => setSelectedRegion(region.id)}
                  className={`group rounded-2xl border p-5 text-left transition-all duration-300 ${
                    active
                      ? "border-cyan-400/30 bg-cyan-400/[0.08] shadow-[0_10px_40px_rgba(34,211,238,0.05)]"
                      : "border-white/[0.07] bg-white/[0.025] hover:border-white/[0.15] hover:bg-white/[0.05]"
                  }`}
                >
                  <div className="flex items-center justify-between">

                    <div>
                      <span
                        className={`text-xs tracking-[0.2em] ${
                          active
                            ? "text-cyan-300"
                            : "text-slate-600"
                        }`}
                      >
                        {region.number || ""}
                      </span>

                      <h3
                        className={`mt-2 text-lg font-medium ${
                          active
                            ? "text-white"
                            : "text-slate-300"
                        }`}
                      >
                        {region.name}
                      </h3>
                    </div>

                    <span
                      className={`h-2 w-2 rounded-full transition-all ${
                        active
                          ? "bg-cyan-300 shadow-[0_0_15px_rgba(103,232,249,0.8)]"
                          : "bg-slate-700"
                      }`}
                    />

                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    {region.subtitle}
                  </p>
                </button>
              );
            })}

          </div>
        </div>

        {/* ================================================= */}
        {/* SELECTED REGION DETAIL */}
        {/* ================================================= */}

        <div className="mt-8 overflow-hidden rounded-[2rem] border border-cyan-400/10 bg-gradient-to-br from-white/[0.06] via-blue-950/[0.15] to-black/30 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.3)] backdrop-blur-2xl md:p-10">

          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">

            {/* Region title */}
            <div>

              <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">
                Selected Region
              </p>

              <h3 className="mt-3 text-4xl font-semibold text-white md:text-5xl">
                {activeRegion.name}
              </h3>

              <p className="mt-3 text-sm text-cyan-300/70">
                {activeRegion.subtitle}
              </p>

              <p className="mt-6 text-sm leading-7 text-slate-400 md:text-base">
                {activeRegion.description}
              </p>

            </div>

            {/* Details */}
            <div className="grid gap-4 sm:grid-cols-2">

              {/* Forest */}
              <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-600">
                  Habitat
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {activeRegion.forests}
                </p>
              </div>

              {/* Wildlife */}
              <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-600">
                  Wildlife
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {activeRegion.wildlife.map((animal) => (
                    <span
                      key={animal}
                      className="rounded-full border border-cyan-400/10 bg-cyan-400/5 px-3 py-1 text-xs text-cyan-200/80"
                    >
                      {animal}
                    </span>
                  ))}
                </div>
              </div>

              {/* Threats */}
              <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-600">
                  Key Pressures
                </p>

                <ul className="mt-3 space-y-2">
                  {activeRegion.threats.map((threat) => (
                    <li
                      key={threat}
                      className="flex items-start gap-2 text-sm text-slate-400"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
                      {threat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Conservation */}
              <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-600">
                  Conservation
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {activeRegion.conservation}
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}