'use client';

import { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

interface MapComponentProps {
  locations: { lat: number; lng: number }[];
  speciesName: string;
}

const MapComponent = dynamic<{ locations: { lat: number; lng: number }[]; speciesName: string }>(
  () => import('./MapComponent'),
  { ssr: false }
);

interface SpeciesData {
  id: string;
  commonName: string;
  scientificName: string;
  category: string;
  iucnStatus: string;
  family: string;
  population?: Record<string, number | string>;
  location?: string;
  foodAndDiet?: string;
  natureAndActivity?: string;
  spatialDistribution?: string;
  distribution?: {
    provinces: string[];
    districts: string[];
  };
  description?: string;
  images: string[];
  habitat_description?: string;
  threats?: string[];
  parts_poached?: string[];
  purpose_of_poaching?: string;
  black_market_value?: string;
  article_urls?: string[];
  youtube_video_url?: string | null;
  youtube_search_url?: string;
  source_details?: {
    primary_source?: string;
    regional_source?: string;
    data_note?: string;
  };
}

interface SpeciesDetailProps {
  species: SpeciesData;
}

const iucnStatusColors: Record<string, string> = {
  'CR': 'bg-red-600 text-white',
  'EN': 'bg-orange-600 text-white',
  'VU': 'bg-yellow-500 text-gray-900',
  'NT': 'bg-blue-600 text-white',
  'LC': 'bg-emerald-600 text-white',
};

const iucnStatusLabels: Record<string, string> = {
  'CR': 'Critically Endangered',
  'EN': 'Endangered',
  'VU': 'Vulnerable',
  'NT': 'Near Threatened',
  'LC': 'Least Concern',
};

export default function SpeciesDetail({ species }: SpeciesDetailProps) {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [chartType, setChartType] = useState<'bar' | 'line' | 'table'>('bar');

  const availableImages = (species.images?.filter(img => img && img.trim() !== '') || []).slice(0, 4);

  // Parse location coordinates
  const parseLocation = (location: string | undefined) => {
    if (!location) return [];
    const coords = location.split('|').map(coord => {
      const [lat, lng] = coord.trim().split(',').map(Number);
      return { lat, lng };
    });
    return coords.filter(c => !isNaN(c.lat) && !isNaN(c.lng));
  };

  const locations = parseLocation(species.location);

  // Prepare population chart data
  const popEntries = species.population
    ? Object.entries(species.population)
        .filter(([key]) => key !== 'trajectory')
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([year, count]) => ({
          year,
          count: typeof count === 'number' ? count : parseInt(String(count).replace(/[^0-9]/g, '')) || 0,
          rawDisplay: count,
        }))
    : [];

  const maxPop = popEntries.length > 0 ? Math.max(...popEntries.map(d => d.count), 1) : 1;
  const minPop = popEntries.length > 0 ? Math.min(...popEntries.map(d => d.count)) : 0;

  // Calculate SVG points for Line Chart
  const svgWidth = 800;
  const svgHeight = 220;
  const paddingX = 40;
  const paddingY = 30;

  const linePoints = popEntries.map((item, index) => {
    const x =
      popEntries.length === 1
        ? svgWidth / 2
        : paddingX + (index / (popEntries.length - 1)) * (svgWidth - paddingX * 2);

    const countRange = maxPop - minPop || 1;
    const y = svgHeight - paddingY - ((item.count - minPop) / countRange) * (svgHeight - paddingY * 2);
    return { x, y, ...item };
  });

  const pathD =
    linePoints.length > 1
      ? linePoints.reduce(
          (acc, pt, i) => (i === 0 ? `M ${pt.x},${pt.y}` : `${acc} L ${pt.x},${pt.y}`),
          ''
        )
      : '';

  const areaD =
    linePoints.length > 1
      ? `${pathD} L ${linePoints[linePoints.length - 1].x},${svgHeight - paddingY} L ${linePoints[0].x},${svgHeight - paddingY} Z`
      : '';

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER & HERO SECTION */}
        <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                {species.commonName}
              </h1>
              <p className="text-lg text-gray-500 italic mt-1">{species.scientificName}</p>
            </div>
            
            {/* Status & Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${iucnStatusColors[species.iucnStatus] || 'bg-gray-600 text-white'}`}>
                {species.iucnStatus} - {iucnStatusLabels[species.iucnStatus] || species.iucnStatus}
              </span>
              <span className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
                {species.category}
              </span>
              <span className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
                {species.family}
              </span>
            </div>
          </div>

          {/* HERO CONTAINER: UN-CROPPED DISPLAY */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[21/9] rounded-2xl overflow-hidden bg-slate-950 shadow-inner group">
            {availableImages.length > 0 ? (
              <>
                {/* 1. Ambient Blurred Backdrop */}
                <Image
                  src={availableImages[mainImageIndex]}
                  alt=""
                  fill
                  className="object-cover opacity-35 blur-2xl scale-125 pointer-events-none"
                />

                {/* 2. Main Image using object-contain */}
                <Image
                  src={availableImages[mainImageIndex]}
                  alt={species.commonName}
                  fill
                  priority
                  className="object-contain relative z-10 transition-transform duration-300 group-hover:scale-[1.01]"
                />
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 relative z-10">
                No image available
              </div>
            )}

            {/* Gradient Overlay for Text */}
            <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 sm:p-6 lg:p-8 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="max-w-2xl space-y-1">
                <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
                  {species.scientificName}
                </span>
                {species.habitat_description && (
                  <p className="text-xs sm:text-sm text-gray-200 line-clamp-2 leading-relaxed drop-shadow-sm">
                    {species.habitat_description}
                  </p>
                )}
              </div>

              {/* Gallery Thumbnails */}
              {availableImages.length > 1 && (
                <div className="flex gap-2 bg-black/60 backdrop-blur-md p-2 rounded-xl border border-white/10 shrink-0">
                  {availableImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setMainImageIndex(idx)}
                      className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden transition-all ${
                        mainImageIndex === idx ? 'ring-2 ring-emerald-400 scale-105' : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <Image src={img} alt="" fill className="object-cover object-center" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* MAIN CONTENT DASHBOARD GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* DESCRIPTION CARD */}
          {species.description && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{species.description}</p>
              </div>
            </div>
          )}

          {/* THREATS CARD */}
          {species.threats && species.threats.length > 0 && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Key Threats</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {species.threats.map((threat, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-2xl bg-red-50/50 border border-red-100 flex items-center space-x-3"
                  >
                    <div className="p-2 rounded-xl bg-red-100 text-red-600 shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <span className="font-semibold text-gray-800 text-sm">{threat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* POPULATION CHART & DATA SECTION WITH VIEW TOGGLE */}
          {popEntries.length > 0 && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 lg:col-span-2">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-gray-900">Population Trend</h2>
                    {species.population?.trajectory && (
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        String(species.population.trajectory).includes('-') ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        Trend: {species.population.trajectory}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">Historical population observations & recovery metrics</p>
                </div>

                {/* View Switcher: Bar Graph | Line Graph | Table */}
                <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200 shrink-0">
                  <button
                    onClick={() => setChartType('bar')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      chartType === 'bar' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Bar Chart
                  </button>

                  <button
                    onClick={() => setChartType('line')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      chartType === 'line' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    Line Graph
                  </button>

                  <button
                    onClick={() => setChartType('table')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      chartType === 'table' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Data Table
                  </button>
                </div>
              </div>

              {/* BAR CHART VIEW */}
              {chartType === 'bar' && (
                <div className="h-64 w-full flex items-end gap-3 sm:gap-6 pt-8 pb-4 border-b border-gray-100">
                  {popEntries.map((item) => {
                    const heightPercent = Math.max((item.count / maxPop) * 100, 8);
                    return (
                      <div key={item.year} className="flex-1 flex flex-col items-center h-full justify-end group">
                        <span className="text-xs font-bold text-gray-600 mb-2 opacity-80 group-hover:opacity-100 transition-opacity">
                          {item.rawDisplay as React.ReactNode}
                        </span>
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className="w-full bg-emerald-500 rounded-t-lg group-hover:bg-emerald-600 transition-all duration-300 relative shadow-sm"
                        />
                        <span className="text-xs font-medium text-gray-500 mt-2">{item.year}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* LINE GRAPH VIEW */}
              {chartType === 'line' && (
                <div className="w-full pt-4 pb-2 border-b border-gray-100">
                  <div className="relative w-full h-64">
                    <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="popGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Area Fill */}
                      {areaD && <path d={areaD} fill="url(#popGradient)" />}

                      {/* Line Curve */}
                      {pathD && (
                        <path
                          d={pathD}
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      )}

                      {/* Data Point Nodes */}
                      {linePoints.map((pt) => (
                        <g key={pt.year} className="group cursor-pointer">
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r="6"
                            className="fill-emerald-600 stroke-white stroke-[3] group-hover:r-8 transition-all"
                          />
                          {/* Label above node */}
                          <text
                            x={pt.x}
                            y={pt.y - 12}
                            textAnchor="middle"
                            className="text-[11px] font-bold fill-gray-700 opacity-90 group-hover:opacity-100"
                          >
                            {pt.rawDisplay as string}
                          </text>
                          {/* Year label below baseline */}
                          <text
                            x={pt.x}
                            y={svgHeight - 6}
                            textAnchor="middle"
                            className="text-[11px] font-medium fill-gray-400"
                          >
                            {pt.year}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>
                </div>
              )}

              {/* DATA TABLE VIEW */}
              {chartType === 'table' && (
                <div className="overflow-x-auto pt-2">
                  <table className="w-full text-left text-sm text-gray-600">
                    <thead>
                      <tr className="border-b border-gray-100 text-xs uppercase text-gray-400 font-bold">
                        <th className="pb-3 px-2">Observation Year</th>
                        <th className="pb-3 px-2">Population Count</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {popEntries.map((item) => (
                        <tr key={item.year} className="hover:bg-gray-50/50">
                          <td className="py-3 px-2 font-medium text-gray-800">{item.year}</td>
                          <td className="py-3 px-2 font-semibold text-emerald-600">{item.rawDisplay as React.ReactNode}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* MAP AND GEOGRAPHIC DISTRIBUTION */}
          {locations.length > 0 && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 lg:col-span-2">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Location & Geographic Map</h2>
              <div className="h-80 sm:h-96 rounded-2xl overflow-hidden border border-gray-100">
                <MapComponent locations={locations} speciesName={species.commonName} />
              </div>
            </div>
          )}

          {/* ADDITIONAL DETAILS: DIET & ACTIVITY */}
          {(species.foodAndDiet || species.natureAndActivity) && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6 lg:col-span-2">
              {species.foodAndDiet && (
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">Food & Diet</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{species.foodAndDiet}</p>
                </div>
              )}
              {species.natureAndActivity && (
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">Behavior & Activity</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{species.natureAndActivity}</p>
                </div>
              )}
            </div>
          )}

          {/* POACHING INFO */}
          {((species.parts_poached && species.parts_poached.length > 0) || species.purpose_of_poaching || species.black_market_value) && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 lg:col-span-2">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Poaching Concerns</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {species.parts_poached && species.parts_poached.length > 0 && (
                  <div>
                    <h3 className="text-xs uppercase font-bold text-gray-400 mb-2">Targeted Parts</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {species.parts_poached.map((part, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-md bg-orange-50 text-orange-700 text-xs font-semibold border border-orange-100">
                          {part}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {species.purpose_of_poaching && (
                  <div>
                    <h3 className="text-xs uppercase font-bold text-gray-400 mb-2">Poaching Purpose</h3>
                    <p className="text-sm text-gray-700">{species.purpose_of_poaching}</p>
                  </div>
                )}
                {species.black_market_value && (
                  <div>
                    <h3 className="text-xs uppercase font-bold text-gray-400 mb-2">Estimated Market Value</h3>
                    <p className="text-sm font-semibold text-gray-900">{species.black_market_value}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* MEDIA & ARTICLES */}
          {(species.youtube_video_url || species.youtube_search_url || (species.article_urls && species.article_urls.length > 0)) && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 lg:col-span-2">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Resources & Media</h2>
              <div className="flex flex-wrap gap-3">
                {species.youtube_video_url && (
                  <a
                    href={species.youtube_video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-colors"
                  >
                    Watch Video
                  </a>
                )}
                {species.youtube_search_url && (
                  <a
                    href={species.youtube_search_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2.5 rounded-xl bg-gray-800 text-white text-xs font-bold hover:bg-gray-900 transition-colors"
                  >
                    Search YouTube
                  </a>
                )}
                {species.article_urls?.map((url, index) => (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2.5 rounded-xl bg-blue-50 text-blue-700 text-xs font-bold hover:bg-blue-100 transition-colors"
                  >
                    Article {index + 1}
                  </a>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* BACK NAVIGATION */}
        <div className="pt-4 flex justify-start">
          <a
            href="/species"
            className="inline-flex items-center px-6 py-3 rounded-2xl bg-gray-900 text-white text-sm font-semibold hover:bg-black transition-all shadow-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Species Directory
          </a>
        </div>

      </div>
    </div>
  );
}