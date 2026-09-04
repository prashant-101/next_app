"use client";

import React from "react";
import dynamic from "next/dynamic";
import PopulationChart from "./PopulationChart";

const SpeciesMap = dynamic(
  () => import("./SpeciesMap"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[400px] w-full items-center justify-center rounded-2xl bg-slate-100">
        <span className="text-sm text-slate-500">
          Loading map...
        </span>
      </div>
    ),
  }
);

/* =========================================================
   TYPES
========================================================= */

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

type SpeciesDetailProps = {
  species: SpeciesJSON;
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function SpeciesDetail({
  species,
}: SpeciesDetailProps) {
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
    images,
  } = species;

  const provinces = distribution?.provinces ?? [];
  const districts = distribution?.districts ?? [];

  const mainImage =
    images && images.length > 0
      ? images[0]
      : "/wildlife/animals/placeholder.jpg";

  return (
    <main className="min-h-screen bg-white">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            {/* IMAGE */}

            <div className="overflow-hidden rounded-3xl bg-slate-200 shadow-sm">
              <img
                src={mainImage}
                alt={commonName}
                className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[500px]"
              />
            </div>

            {/* INFORMATION */}

            <div>
              <div className="mb-4 flex flex-wrap gap-2">
                <Badge text={category} />

                <StatusBadge status={iucnStatus} />
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
          QUICK INFORMATION
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <InfoCard
            title="Species"
            value={commonName}
          />

          <InfoCard
            title="Category"
            value={category}
          />

          <InfoCard
            title="IUCN Status"
            value={iucnStatus}
          />

          <InfoCard
            title="Family"
            value={family}
          />
        </div>
      </section>

      {/* =====================================================
          ABOUT
      ===================================================== */}

      {description && (
        <ContentSection title="About the Species">
          <p className="leading-8 text-slate-700">
            {description}
          </p>
        </ContentSection>
      )}

      {/* =====================================================
          BEHAVIOR
      ===================================================== */}

      {natureAndActivity && (
        <ContentSection title="Nature & Activity">
          <p className="leading-8 text-slate-700">
            {natureAndActivity}
          </p>
        </ContentSection>
      )}

      {/* =====================================================
          DIET
      ===================================================== */}

      {foodAndDiet && (
        <ContentSection title="Food & Diet">
          <p className="leading-8 text-slate-700">
            {foodAndDiet}
          </p>
        </ContentSection>
      )}

      {/* =====================================================
          DISTRIBUTION
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionHeading title="Distribution in Nepal" />

        <div className="grid gap-6 md:grid-cols-2">
          <DistributionCard
            title="Provinces"
            items={provinces}
          />

          <DistributionCard
            title="Districts"
            items={districts}
          />
        </div>
      </section>

      {/* =====================================================
          MAP
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionHeading title="Species Location" />

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-sm">
          <SpeciesMap
            location={location}
            name={commonName}
          />
        </div>
      </section>

      {/* =====================================================
          POPULATION
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionHeading title="Population Trend" />

        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <PopulationChart
            population={population}
          />
        </div>

        {population?.trajectory && (
          <div className="mt-5 rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-500">
              Population trajectory
            </p>

            <p className="mt-2 text-slate-700">
              {population.trajectory}
            </p>
          </div>
        )}
      </section>

      {/* =====================================================
          SPATIAL DISTRIBUTION
      ===================================================== */}

      {spatialDistribution && (
        <ContentSection title="Spatial Distribution">
          <p className="leading-8 text-slate-700">
            {spatialDistribution}
          </p>
        </ContentSection>
      )}

      {/* =====================================================
          GALLERY
      ===================================================== */}

      {images && images.length > 1 && (
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <SectionHeading title="Gallery" />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {images.slice(1).map((image, index) => (
              <div
                key={`${image}-${index}`}
                className="overflow-hidden rounded-2xl bg-slate-100"
              >
                <img
                  src={image}
                  alt={`${commonName} ${index + 2}`}
                  className="h-64 w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* =====================================================
          FOOTER SPACE
      ===================================================== */}

      <div className="h-16" />
    </main>
  );
}

/* =========================================================
   SECTION
========================================================= */

function ContentSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeading title={title} />

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        {children}
      </div>
    </section>
  );
}

/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({
  title,
}: {
  title: string;
}) {
  return (
    <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
      {title}
    </h2>
  );
}

/* =========================================================
   BADGE
========================================================= */

function Badge({
  text,
}: {
  text?: string;
}) {
  return (
    <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
      {text || "Unknown"}
    </span>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({
  status,
}: {
  status?: string;
}) {
  const normalizedStatus =
    status?.toUpperCase() || "UNKNOWN";

  let className =
    "bg-slate-100 text-slate-700";

  if (normalizedStatus === "CR") {
    className = "bg-red-100 text-red-700";
  } else if (normalizedStatus === "EN") {
    className = "bg-orange-100 text-orange-700";
  } else if (normalizedStatus === "VU") {
    className = "bg-yellow-100 text-yellow-700";
  } else if (normalizedStatus === "NT") {
    className = "bg-blue-100 text-blue-700";
  } else if (normalizedStatus === "LC") {
    className = "bg-green-100 text-green-700";
  }

  return (
    <span
      className={`rounded-full px-4 py-2 text-sm font-semibold ${className}`}
    >
      IUCN: {normalizedStatus}
    </span>
  );
}

/* =========================================================
   INFO CARD
========================================================= */

function InfoCard({
  title,
  value,
}: {
  title: string;
  value?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-slate-500">
        {title}
      </p>

      <p className="mt-2 truncate text-lg font-bold text-slate-900">
        {value || "Not available"}
      </p>
    </div>
  );
}

/* =========================================================
   DISTRIBUTION CARD
========================================================= */

function DistributionCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900">
        {title}
      </h3>

      {items.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {items.map((item) => (
            <span
              key={item}
              className="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700"
            >
              {item}
            </span>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm text-slate-500">
          No information available.
        </p>
      )}
    </div>
  );
}