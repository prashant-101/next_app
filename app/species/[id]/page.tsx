import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import React from "react";
import SpeciesMapClient from "@/components/ui/skiper-ui/SpeciesMapClient";
// Corrected import: import PopulationChart instead of SpeciesDashboard
import PopulationChart from "@/components/ui/skiper-ui/PopulationChart";

// TypeScript interfaces for MongoDB Document
export type PopulationData = {
  trajectory?: string;
  [year: string]: number | string | undefined;
};

export type DistributionData = {
  provinces?: string[];
  districts?: string[];
};

export type SpeciesJSON = {
  _id: string;
  id: string;
  commonName: string;
  scientificName: string;
  category: string;
  iucnStatus: string;
  family?: string;
  population?: PopulationData;
  location?: string;
  foodAndDiet?: string;
  natureAndActivity?: string;
  spatialDistribution?: string;
  distribution?: DistributionData;
  description?: string;
  images?: string[];
};

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

// Force dynamic rendering on Vercel
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Helper function to remove duplicate sentences/paragraphs from database strings
const sanitizeDescription = (text?: string): string => {
  if (!text) return "No description available for this species.";

  const paragraphs = text
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const uniqueParagraphs = Array.from(new Set(paragraphs));

  if (uniqueParagraphs.length === 1) {
    const single = uniqueParagraphs[0];
    const halfLength = Math.floor(single.length / 2);
    const firstHalf = single.substring(0, halfLength).trim();
    const secondHalf = single.substring(halfLength).trim();

    if (secondHalf.startsWith(firstHalf)) {
      return secondHalf;
    }
  }

  return uniqueParagraphs.join("\n\n");
};

export default async function SpeciesDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  if (!id) {
    notFound();
  }

  let species: SpeciesJSON;

  try {
    const conn = await connectDB();
    const db = conn.connection?.db || conn.db;

    if (!db) {
      throw new Error("MongoDB database connection unavailable");
    }

    const result = await db.collection("species").findOne({
      $or: [{ id: id }, { slug: id }],
    });

    if (!result) {
      notFound();
    }

    species = {
      ...result,
      _id: result._id.toString(),
    } as unknown as SpeciesJSON;
  } catch (error) {
    console.error("SPECIES_DETAIL_PAGE_ERROR:", error);
    throw error;
  }

  const name: string = species.commonName || "Unknown Species";
  const scientificName: string = species.scientificName || "";
  const category: string = species.category || "Amphibian / Reptile";
  const status: string = (species.iucnStatus || "UNKNOWN").toUpperCase().trim();
  const family: string = species.family || "Not available";
  const images: string[] = Array.isArray(species.images) ? species.images : [];

  const rawDescription: string = species.description || "";
  const cleanDescription: string = sanitizeDescription(rawDescription);

  const foodAndDiet: string = species.foodAndDiet || "Diet information is not available.";
  const natureAndActivity: string = species.natureAndActivity || "Activity information is not available.";
  const spatialDistribution: string = species.spatialDistribution || "Spatial distribution information is not available.";

  const statusColor: string =
    status === "CR" ? "bg-red-700" :
    status === "EN" ? "bg-orange-600" :
    status === "VU" ? "bg-amber-500" :
    status === "NT" ? "bg-yellow-500" :
    status === "LC" ? "bg-green-600" : "bg-slate-500";

  const populationYears = species.population
    ? Object.entries(species.population).filter(([key, value]) => {
        if (key === "trajectory" || value === null || value === undefined) return false;
        return !isNaN(Number(value));
      })
    : [];

  const populationTrajectory: string = species.population?.trajectory || "";
  const provinces: string[] = species.distribution?.provinces || [];
  const districts: string[] = species.distribution?.districts || [];

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="px-6 py-10">
        <div className="max-w-7xl mx-auto">
          {/* HEADER SECTION */}
          <section id="overview" className="scroll-mt-10">
            <div className="mb-8">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{category}</p>
              <h1 className="text-5xl font-bold text-slate-900 mt-2">{name}</h1>
              {scientificName && <p className="text-xl italic text-slate-500 mt-2">{scientificName}</p>}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* IMAGE GALLERY */}
              <div id="gallery" className="lg:col-span-2 bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
                <div className="w-full aspect-[16/10] bg-slate-100 flex items-center justify-center overflow-hidden">
                  {images[0] ? (
                    <img
                      src={images[0]}
                      alt={name}
                      className="w-full h-full object-contain select-none"
                      draggable={false}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      No image available
                    </div>
                  )}
                </div>

                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-3 p-4">
                    {images.slice(0, 4).map((imgUrl: string, index: number) => (
                      <div
                        key={index}
                        className="h-24 rounded-xl overflow-hidden border-2 border-transparent bg-slate-100"
                      >
                        <img
                          src={imgUrl}
                          alt={`${name} thumbnail ${index + 1}`}
                          className="w-full h-full object-cover select-none"
                          draggable={false}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* QUICK FACTS CARD */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7 h-fit">
                <h2 className="text-xl font-bold text-slate-900 mb-7">Quick Facts</h2>
                <div className="space-y-6">
                  <div>
                    <p className="text-xs uppercase font-bold text-slate-400 tracking-wide">Common Name</p>
                    <p className="text-slate-800 font-semibold mt-1">{name}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase font-bold text-slate-400 tracking-wide">Scientific Name</p>
                    <p className="text-slate-800 italic mt-1">{scientificName || "Not available"}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase font-bold text-slate-400 tracking-wide">Category</p>
                    <p className="text-slate-800 font-semibold mt-1">{category}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase font-bold text-slate-400 tracking-wide">Family</p>
                    <p className="text-slate-800 font-semibold mt-1">{family}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase font-bold text-slate-400 tracking-wide">IUCN Status</p>
                    <span className={`inline-block ${statusColor} text-white px-4 py-2 rounded-xl font-bold mt-2`}>
                      {status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ABOUT SECTION */}
          <section id="about" className="mt-16 scroll-mt-10">
            <div className="bg-white rounded-3xl border border-slate-200 p-8">
              <p className="text-sm font-bold text-blue-600 uppercase tracking-wide mb-2">About the Species</p>
              <h2 className="text-3xl font-bold text-slate-900 mb-5">Description</h2>
              <p className="text-slate-600 leading-8 whitespace-pre-line">{cleanDescription}</p>
            </div>
          </section>

          {/* NATURE & ACTIVITY */}
          <section id="activity" className="mt-12 scroll-mt-10">
            <div className="bg-white rounded-3xl border border-slate-200 p-8">
              <p className="text-sm font-bold text-green-600 uppercase tracking-wide mb-2">Behavior</p>
              <h2 className="text-3xl font-bold text-slate-900 mb-5">Nature & Activity</h2>
              <p className="text-slate-600 leading-8">{natureAndActivity}</p>
            </div>
          </section>

          {/* FOOD & DIET */}
          <section id="diet" className="mt-12 scroll-mt-10">
            <div className="bg-white rounded-3xl border border-slate-200 p-8">
              <p className="text-sm font-bold text-orange-600 uppercase tracking-wide mb-2">Diet</p>
              <h2 className="text-3xl font-bold text-slate-900 mb-5">Food & Diet</h2>
              <p className="text-slate-600 leading-8">{foodAndDiet}</p>
            </div>
          </section>

          {/* GEOGRAPHIC RANGE */}
          <section id="distribution" className="mt-12 scroll-mt-10">
            <div className="bg-white rounded-3xl border border-slate-200 p-8">
              <p className="text-sm font-bold text-blue-600 uppercase tracking-wide mb-2">Geographic Range</p>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Distribution</h2>

              <div className="mb-8">
                <h3 className="font-bold text-slate-800 mb-3">Provinces</h3>
                <div className="flex flex-wrap gap-3">
                  {provinces.length > 0 ? (
                    provinces.map((prov: string) => (
                      <span key={prov} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl font-medium">
                        {prov}
                      </span>
                    ))
                  ) : (
                    <p className="text-slate-500">No province information available.</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-800 mb-3">Districts</h3>
                <div className="flex flex-wrap gap-3">
                  {districts.length > 0 ? (
                    districts.map((dist: string) => (
                      <span key={dist} className="px-4 py-2 bg-green-50 text-green-700 rounded-xl font-medium">
                        {dist}
                      </span>
                    ))
                  ) : (
                    <p className="text-slate-500">No district information available.</p>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* LOCATION MAP */}
          <section id="location" className="mt-12 scroll-mt-10">
            <div className="bg-white rounded-3xl border border-slate-200 p-8">
              <p className="text-sm font-bold text-red-600 uppercase tracking-wide mb-2">Geographic Location</p>
              <h2 className="text-3xl font-bold text-slate-900 mb-3">Recorded Locations</h2>
              <p className="text-slate-500 mb-6">Known coordinate points for {name} in Nepal</p>
              <SpeciesMapClient location={species.location} name={name} />
            </div>
          </section>

          {/* POPULATION CHART SECTION */}
          <section id="population" className="mt-12 scroll-mt-10">
            <div className="bg-white rounded-3xl border border-slate-200 p-8">
              <p className="text-sm font-bold text-purple-600 uppercase tracking-wide mb-2">Population</p>

              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">Population Trend</h2>
                  <p className="text-sm text-slate-500 mt-2">Estimated population trajectory</p>
                </div>

                {populationTrajectory && (
                  <div className={`px-4 py-2 rounded-xl text-sm font-bold ${
                    populationTrajectory.startsWith("+") 
                      ? "bg-green-50 text-green-700" 
                      : "bg-red-50 text-red-700"
                  }`}>
                    Trend: {populationTrajectory}
                  </div>
                )}
              </div>

              {populationYears.length > 0 ? (
                <div className="mb-4">
                  <PopulationChart population={species.population} />
                </div>
              ) : (
                <div className="bg-slate-50 rounded-2xl p-8 text-center">
                  <p className="text-slate-500">Population trend data not recorded.</p>
                </div>
              )}
            </div>
          </section>

          {/* SPATIAL DISTRIBUTION */}
          <section id="spatial" className="mt-12 scroll-mt-10">
            <div className="bg-white rounded-3xl border border-slate-200 p-8">
              <p className="text-sm font-bold text-indigo-600 uppercase tracking-wide mb-2">Social Structure</p>
              <h2 className="text-3xl font-bold text-slate-900 mb-5">Spatial Distribution</h2>
              <p className="text-slate-600 leading-8">{spatialDistribution}</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}