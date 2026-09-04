"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { BarChart3, PieChartIcon, ShieldAlert, Layers, Loader2 } from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type SpeciesFromDB = {
  id?: string;
  _id?: string;
  commonName?: string;
  iucnStatus: string;
};

/* =========================================================
   COLOR & STATUS CONFIGURATION
========================================================= */

const IUCN_CONFIG: Record<string, { label: string; color: string }> = {
  CR: { label: "Critically Endangered", color: "#ef4444" },
  EN: { label: "Endangered", color: "#f97316" },
  VU: { label: "Vulnerable", color: "#eab308" },
  NT: { label: "Near Threatened", color: "#3b82f6" },
  LC: { label: "Least Concern", color: "#22c55e" },
  DD: { label: "Data Deficient", color: "#94a3b8" },
};

export default function AnalyticsPage() {
  const [speciesList, setSpeciesList] = useState<SpeciesFromDB[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSpecies() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/species");

        if (!res.ok) {
          throw new Error(`Failed to fetch species data (Status ${res.status}).`);
        }

        const data: unknown = await res.json();

        // Handles direct array, animals key, or data key
        if (Array.isArray(data)) {
          setSpeciesList(data as SpeciesFromDB[]);
        } else if (
          typeof data === "object" &&
          data !== null &&
          "animals" in data &&
          Array.isArray((data as { animals: unknown }).animals)
        ) {
          setSpeciesList((data as { animals: SpeciesFromDB[] }).animals);
        } else if (
          typeof data === "object" &&
          data !== null &&
          "species" in data &&
          Array.isArray((data as { species: unknown }).species)
        ) {
          setSpeciesList((data as { species: SpeciesFromDB[] }).species);
        } else if (
          typeof data === "object" &&
          data !== null &&
          "data" in data &&
          Array.isArray((data as { data: unknown }).data)
        ) {
          setSpeciesList((data as { data: SpeciesFromDB[] }).data);
        } else {
          setSpeciesList([]);
          throw new Error("Invalid API response format. Expected an array of species.");
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred while loading database records.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchSpecies();
  }, []);

  const { chartData, totalSpecies, threatenedCount } = useMemo(() => {
    const counts: Record<string, number> = {
      CR: 0,
      EN: 0,
      VU: 0,
      NT: 0,
      LC: 0,
      DD: 0,
    };

    let total = 0;
    let threatened = 0;

    if (Array.isArray(speciesList)) {
      speciesList.forEach((item) => {
        const status = item?.iucnStatus?.trim().toUpperCase();
        if (status && counts[status] !== undefined) {
          counts[status] += 1;
        } else {
          counts["DD"] += 1;
        }
        total += 1;

        if (status && ["CR", "EN", "VU"].includes(status)) {
          threatened += 1;
        }
      });
    }

    // Filter to display ONLY status categories with count > 0
    const formattedData = Object.keys(IUCN_CONFIG)
      .map((key) => ({
        statusKey: key,
        name: IUCN_CONFIG[key].label,
        code: key,
        count: counts[key],
        color: IUCN_CONFIG[key].color,
        percentage: total > 0 ? ((counts[key] / total) * 100).toFixed(1) : "0",
      }))
      .filter((item) => item.count > 0);

    return {
      chartData: formattedData,
      totalSpecies: total,
      threatenedCount: threatened,
    };
  }, [speciesList]);

  if (loading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
          <p className="text-sm font-semibold">Loading analytics from database...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 p-6">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700 max-w-md">
          <p className="font-bold text-lg">Database Error</p>
          <p className="mt-2 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 sm:p-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Species IUCN Analytics Dashboard
          </h1>
          <p className="text-sm text-slate-500">
            Real-time conservation status distribution loaded directly from the database.
          </p>
        </div>

        <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
              <Layers className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-400">Total Database Records</p>
              <p className="text-2xl font-bold text-slate-900">{totalSpecies}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="rounded-xl bg-amber-100 p-3 text-amber-600">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-400">Threatened (CR, EN, VU)</p>
              <p className="text-2xl font-bold text-slate-900">{threatenedCount}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="rounded-xl bg-red-100 p-3 text-red-600">
              <BarChart3 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-400">Threat Rate</p>
              <p className="text-2xl font-bold text-slate-900">
                {totalSpecies > 0 ? ((threatenedCount / totalSpecies) * 100).toFixed(1) : 0}%
              </p>
            </div>
          </div>
        </div>

        {chartData.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <p className="text-base font-semibold text-slate-700">No active species data found.</p>
            <p className="mt-1 text-xs text-slate-400">
              Ensure species records exist in your MongoDB collection with valid IUCN status values.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-emerald-600" />
                  <h2 className="text-lg font-bold text-slate-900">Species Count by IUCN Status (&gt; 0)</h2>
                </div>

                <div className="h-[320px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                      <XAxis dataKey="code" stroke="#64748b" fontSize={12} tickLine={false} />
                      <YAxis allowDecimals={false} stroke="#64748b" fontSize={12} tickLine={false} />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload as {
                              name: string;
                              code: string;
                              count: number;
                              percentage: string;
                            };
                            return (
                              <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg text-xs">
                                <p className="font-bold text-slate-900">{data.name} ({data.code})</p>
                                <p className="mt-1 text-slate-600">Count: <span className="font-bold">{data.count}</span></p>
                                <p className="text-slate-600">Share: <span className="font-bold">{data.percentage}%</span></p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                        {chartData.map((entry, index) => (
                          <Cell key={`bar-cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5 text-emerald-600" />
                  <h2 className="text-lg font-bold text-slate-900">IUCN Category Distribution (&gt; 0)</h2>
                </div>

                <div className="h-[320px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={100}
                        paddingAngle={4}
                        dataKey="count"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`pie-cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload as {
                              name: string;
                              code: string;
                              percentage: string;
                            };
                            return (
                              <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg text-xs">
                                <p className="font-bold text-slate-900">{data.name} ({data.code})</p>
                                <p className="mt-1 text-slate-600">Share: <span className="font-bold">{data.percentage}%</span></p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Legend
                        verticalAlign="bottom"
                        height={36}
                        formatter={(value, entry) => {
                          const code = (entry as { payload?: { code?: string } })?.payload?.code ?? "";
                          return (
                            <span className="text-xs font-medium text-slate-700">
                              {code}
                            </span>
                          );
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">
                Database Status Breakdown (Counts &gt; 0)
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {chartData.map((item) => (
                  <div key={item.code} className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-xs font-semibold text-slate-800">
                        {item.name} ({item.code})
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-600">
                      {item.count} species
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}