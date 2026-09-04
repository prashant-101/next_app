"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import PopulationChart from "./PopulationChart";

const SpeciesMap = dynamic(() => import("./SpeciesMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[400px] w-full items-center justify-center rounded-2xl bg-slate-100">
      <span className="text-sm text-slate-500">Loading map...</span>
    </div>
  ),
});

export type SpeciesPopulation = {
  [year: string]: number | string | undefined;
  trajectory?: string;
};

export type SpeciesDistribution = {
  provinces?: string[];
  districts?: string[];
};

export type SpeciesJSON = {
  id: string;
  commonName: string;
  scientificName: string;
  category: string;
  iucnStatus: string;
  family: string;
  population?: SpeciesPopulation;
  location?: string;
  foodAndDiet?: string;
  natureAndActivity?: string;
  spatialDistribution?: string;
  distribution?: SpeciesDistribution;
  description?: string;
  images?: string[];
};

export default function SpeciesDetail({ species }: { species: SpeciesJSON }) {
  const {
    commonName,
    scientificName,
    category,
    iucnStatus,
    family,
    population,
    location,
    foodAndDiet,
    natureAndActivity,
    spatialDistribution,
    distribution,
    description,
    images = [],
  } = species;

  const fallbackImage = "/wildlife/animals/placeholder.jpg";
  const imageList = images.length > 0 ? images : [fallbackImage];

  // Active image index
  const [activeIdx, setActiveIdx] = useState<number>(0);

  // Full-screen modal state
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Reset index when species changes
  useEffect(() => {
    setActiveIdx(0);
  }, [species]);

  const activeImage = imageList[activeIdx] || fallbackImage;

  // Carousel controls
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  return (
    <main className="min-h-screen bg-white">
      {/* =====================================================
          HERO & CAROUSEL SECTION
      ===================================================== */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            
            {/* CAROUSEL CONTAINER */}
            <div className="flex flex-col gap-4">
              <div
                onClick={() => setIsExpanded(true)}
                className="group relative cursor-zoom-in overflow-hidden rounded-3xl bg-slate-200 shadow-md"
              >
                {/* Active Main Slide */}
                <img
                  src={activeImage}
                  alt={commonName}
                  className="h-[320px] w-full object-cover transition-all duration-300 sm:h-[420px] lg:h-[480px]"
                />

                {/* Left/Right Slide Arrows */}
                {imageList.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition hover:bg-black/80"
                      aria-label="Previous Image"
                    >
                      ❮
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition hover:bg-black/80"
                      aria-label="Next Image"
                    >
                      ❯
                    </button>
                  </>
                )}

                {/* Slide Counter Indicator */}
                {imageList.length > 1 && (
                  <div className="absolute top-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {activeIdx + 1} / {imageList.length}
                  </div>
                )}

                {/* Hover overlay prompt */}
                <div className="absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                  🔍 Click to expand
                </div>
              </div>

              {/* DOWNSIDE PREVIEW THUMBNAILS */}
              {imageList.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {imageList.map((imgUrl, index) => {
                    const isSelected = index === activeIdx;
                    return (
                      <button
                        key={`${imgUrl}-${index}`}
                        type="button"
                        onClick={() => setActiveIdx(index)}
                        className={`relative h-20 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                          isSelected
                            ? "border-emerald-600 scale-95 shadow-md"
                            : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={imgUrl}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* SPECIES INFORMATION */}
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                  {category || "Unknown"}
                </span>

                <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                  IUCN: {iucnStatus?.toUpperCase() || "UNKNOWN"}
                </span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                {commonName}
              </h1>

              <p className="mt-3 text-xl italic text-slate-500">
                {scientificName}
              </p>

              <div className="mt-6">
                <p className="text-sm font-medium uppercase tracking-wide text-slate-400">
                  Family
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-800">
                  {family || "Not available"}
                </p>
              </div>

              {description && (
                <p className="mt-6 max-w-2xl leading-8 text-slate-600">
                  {description}
                </p>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          FULL-SCREEN EXPANSION MODAL
      ===================================================== */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setIsExpanded(false)}
        >
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage}
              alt={commonName}
              className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
            />
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="absolute -right-4 -top-4 rounded-full bg-white p-2 text-black shadow-lg hover:bg-slate-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* =====================================================
          MAP & DETAILS SECTIONS
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Species Location
        </h2>
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-sm">
          <SpeciesMap location={location} name={commonName} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Population Trend
        </h2>
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <PopulationChart population={population} />
        </div>
      </section>
    </main>
  );
}