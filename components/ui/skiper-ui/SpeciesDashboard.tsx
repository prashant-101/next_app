"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export type Species = {
  id?: unknown;
  _id?: unknown;

  name?: unknown;
  commonName?: unknown;
  common_name?: unknown;

  scientificName?: unknown;
  scientific_name?: unknown;

  images?: unknown[];

  category?: unknown;
  status?: unknown;

  conservationStatus?: unknown;
  conservation_status?: unknown;

  iucnStatus?: unknown;

  group?: unknown;
  type?: unknown;

  // Other API fields allowed
  [key: string]: unknown;
};

// Define Component Props
export interface SpeciesDashboardProps {
  species?: Species[];
}

/* =========================================================
   SAFE VALUE HELPERS
========================================================= */

function safeString(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return "";
}

function safeId(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number") {
    return String(value);
  }

  if (value && typeof value === "object" && "$oid" in value) {
    return safeString((value as { $oid?: unknown }).$oid);
  }

  return "";
}

/* =========================================================
   COMPONENT
========================================================= */

export default function SpeciesDashboard({ species = [] }: SpeciesDashboardProps) {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [groupFilter, setGroupFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  /* =========================================================
     SAFE DATA GETTERS
  ========================================================= */

  const getName = (item: Species): string => {
    const possibleNames = [item.name, item.commonName, item.common_name];

    for (const value of possibleNames) {
      const result = safeString(value);
      if (result.trim()) {
        return result;
      }
    }

    return "Unknown species";
  };

  const getScientificName = (item: Species): string => {
    const value = item.scientificName ?? item.scientific_name;
    return safeString(value);
  };

  const getImage = (item: Species): string => {
    if (!Array.isArray(item.images)) {
      return "";
    }

    for (const image of item.images) {
      const value = safeString(image);
      if (
        value.startsWith("/") ||
        value.startsWith("http://") ||
        value.startsWith("https://")
      ) {
        return value;
      }
    }

    return "";
  };

  const getCategory = (item: Species): string => {
    const value =
      item.iucnStatus ??
      item.status ??
      item.conservationStatus ??
      item.conservation_status ??
      item.category;

    return safeString(value).toUpperCase().trim();
  };

  const getGroup = (item: Species): string => {
    return safeString(item.group) || safeString(item.type) || "Other";
  };

  const getSpeciesId = (item: Species): string => {
    return safeId(item.id) || safeId(item._id);
  };

  /* =========================================================
     FILTER SPECIES
  ========================================================= */

  const filteredSpecies = species.filter((item) => {
    const name = getName(item).toLowerCase();
    const scientificName = getScientificName(item).toLowerCase();
    const group = getGroup(item).toLowerCase();
    const category = getCategory(item);
    const searchValue = search.toLowerCase().trim();

    const matchesSearch =
      name.includes(searchValue) || scientificName.includes(searchValue);

    const matchesGroup =
      groupFilter === "All" || group === groupFilter.toLowerCase();

    const matchesStatus =
      statusFilter === "All" || category === statusFilter;

    return matchesSearch && matchesGroup && matchesStatus;
  });

  const totalSpecies = species.length;

  /* =========================================================
     VULNERABILITY HELPERS
  ========================================================= */

  const getVulnerabilityName = (category: string): string => {
    switch (category) {
      case "CR":
        return "Critically Endangered";
      case "EN":
        return "Endangered";
      case "VU":
        return "Vulnerable";
      case "NT":
        return "Near Threatened";
      case "LC":
        return "Least Concern";
      case "DD":
        return "Data Deficient";
      default:
        return category || "Unknown";
    }
  };

  const getBadgeStyle = (category: string): string => {
    switch (category) {
      case "CR":
        return "bg-red-700 text-white";
      case "EN":
        return "bg-orange-600 text-white";
      case "VU":
        return "bg-amber-500 text-white";
      case "NT":
        return "bg-yellow-500 text-white";
      case "LC":
        return "bg-green-600 text-white";
      case "DD":
        return "bg-slate-500 text-white";
      default:
        return "bg-slate-500 text-white";
    }
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="min-h-screen bg-[#f4f4f1] px-4 py-8 text-slate-800 sm:px-6 lg:px-8">
      {/* BACK TO HOME */}
      <div className="mx-auto mb-8 max-w-7xl">
        <button
          type="button"
          onClick={() => router.push("/")}
          aria-label="Back to Home"
          className="group flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-700 shadow-sm backdrop-blur-md transition-all duration-200 hover:-translate-x-1 hover:shadow-md"
        >
          <span className="text-xl leading-none transition-transform duration-200 group-hover:-translate-x-1">
            ←
          </span>
        </button>
      </div>

      {/* MAIN CONTENT */}
      <section className="mx-auto max-w-7xl">
        {/* FILTER BAR */}
        <div className="mb-10 rounded-3xl border border-slate-200 bg-white/75 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row">
            {/* SEARCH */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search species..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#617a69] focus:ring-2 focus:ring-[#617a69]/20"
              />
            </div>

            {/* GROUP */}
            <select
              value={groupFilter}
              onChange={(e) => setGroupFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#617a69] focus:ring-2 focus:ring-[#617a69]/20"
            >
              <option value="All">All Species</option>
              <option value="Mammals">Animals / Mammals</option>
              <option value="Birds">Birds</option>
              <option value="Reptiles">Reptiles</option>
              <option value="Amphibians">Amphibians</option>
              <option value="Fish">Fish</option>
            </select>

            {/* STATUS */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#617a69] focus:ring-2 focus:ring-[#617a69]/20"
            >
              <option value="All">All Vulnerability</option>
              <option value="CR">Critically Endangered</option>
              <option value="EN">Endangered</option>
              <option value="VU">Vulnerable</option>
              <option value="NT">Near Threatened</option>
              <option value="LC">Least Concern</option>
              <option value="DD">Data Deficient</option>
            </select>
          </div>

          {/* RESULTS SUMMARY */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-800">
                {filteredSpecies.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-800">
                {totalSpecies}
              </span>{" "}
              species
            </p>

            {(search || groupFilter !== "All" || statusFilter !== "All") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setGroupFilter("All");
                  setStatusFilter("All");
                }}
                className="text-sm font-semibold text-[#617a69] hover:text-[#4e6657]"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* HEADER */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-[#617a69]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#617a69]">
              Biodiversity
            </span>
          </div>
          <h1 className="text-3xl font-medium tracking-tight text-[#20201e] md:text-5xl">
            Nepal&apos;s <span className="text-[#617a69]">Wildlife</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#777771] md:text-base">
            Explore species found across Nepal and learn about their conservation
            status, habitat and importance to biodiversity.
          </p>
        </div>

        {/* SPECIES GRID */}
        {filteredSpecies.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-16 text-center">
            <div className="mb-4 text-4xl">🔍</div>
            <h3 className="text-lg font-semibold text-slate-800">
              No species found
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredSpecies.map((item, index) => {
              const name = getName(item);
              const scientificName = getScientificName(item);
              const image = getImage(item);
              const category = getCategory(item);
              const speciesId = getSpeciesId(item);
              const vulnerabilityName = getVulnerabilityName(category);
              const badgeStyle = getBadgeStyle(category);

              return (
                <article
                  key={speciesId || `${name}-${index}`}
                  onClick={() => {
                    if (speciesId) {
                      router.push(`/species/${speciesId}`);
                    }
                  }}
                  className="group cursor-pointer overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#c9d5cc] hover:shadow-[0_18px_45px_rgba(0,0,0,0.09)]"
                >
                  {/* CARD IMAGE */}
                  <div className="relative h-64 w-full overflow-hidden bg-[#edf1ee]">
                    {image ? (
                      <img
                        src={image}
                        alt={name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
                        No image available
                      </div>
                    )}

                    <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-xs font-semibold text-white backdrop-blur-sm">
                      {index + 1}
                    </div>

                    {category && (
                      <div
                        className={`absolute right-4 top-4 rounded-full px-4 py-2 text-xs font-bold shadow-md ${badgeStyle}`}
                      >
                        {category}
                      </div>
                    )}
                  </div>

                  {/* CARD CONTENT */}
                  <div className="p-6">
                    <h2 className="text-xl font-semibold tracking-tight text-[#20201e]">
                      {name}
                    </h2>

                    {scientificName && (
                      <p className="mt-1 text-sm italic text-[#777771]">
                        {scientificName}
                      </p>
                    )}

                    <div className="my-5 h-px bg-slate-100" />

                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                          Vulnerability
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-700">
                          {vulnerabilityName}
                        </p>
                      </div>

                      <span className="text-xs font-medium text-[#617a69] transition-transform duration-300 group-hover:translate-x-1">
                        View →
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}