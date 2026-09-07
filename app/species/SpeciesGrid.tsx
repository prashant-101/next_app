'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo } from 'react';

interface SpeciesData {
  id: string;
  commonName: string;
  scientificName: string;
  category: string;
  iucnStatus: string;
  family: string;
  population?: any;
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
}

interface SpeciesGridProps {
  species: SpeciesData[];
}

const iucnStatusColors: Record<string, string> = {
  'CR': 'bg-red-500',
  'EN': 'bg-orange-500',
  'VU': 'bg-yellow-500',
  'NT': 'bg-blue-500',
  'LC': 'bg-green-500',
};

const iucnStatusLabels: Record<string, string> = {
  'CR': 'Critically Endangered',
  'EN': 'Endangered',
  'VU': 'Vulnerable',
  'NT': 'Near Threatened',
  'LC': 'Least Concern',
};

export default function SpeciesGrid({ species }: SpeciesGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIUCN, setSelectedIUCN] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get unique categories and IUCN statuses
  const categories = useMemo(() => {
    const cats = new Set(species.map(s => s.category));
    return Array.from(cats).sort();
  }, [species]);

  const iucnStatuses = useMemo(() => {
    const statuses = new Set(species.map(s => s.iucnStatus));
    return Array.from(statuses).sort();
  }, [species]);

  // Filter species
  const filteredSpecies = useMemo(() => {
    return species.filter(species => {
      const matchesSearch = searchQuery === '' || 
        species.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        species.scientificName.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesIUCN = selectedIUCN === 'all' || species.iucnStatus === selectedIUCN;
      const matchesCategory = selectedCategory === 'all' || species.category === selectedCategory;

      return matchesSearch && matchesIUCN && matchesCategory;
    });
  }, [species, searchQuery, selectedIUCN, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-green-800 mb-4">Nepal Wildlife</h1>
          <p className="text-xl text-green-700">Explore the diverse species of Nepal</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-2 border-green-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border-2 border-green-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>

            {/* IUCN Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">IUCN Status</label>
              <select
                value={selectedIUCN}
                onChange={(e) => setSelectedIUCN(e.target.value)}
                className="w-full px-4 py-2 border-2 border-green-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors bg-white"
              >
                <option value="all">All Status</option>
                {iucnStatuses.map(status => (
                  <option key={status} value={status}>
                    {status} - {iucnStatusLabels[status] || status}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border-2 border-green-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors bg-white"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredSpecies.length} of {species.length} species
          </div>
        </div>

        {/* Grid */}
        {filteredSpecies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No species found matching your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSpecies.map((speciesItem) => (
              <Link
                key={speciesItem.id}
                href={`/species/${speciesItem.id}`}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-green-100 hover:border-green-400"
              >
                <div className="relative h-72 sm:h-64 overflow-hidden bg-gray-100">
                  {speciesItem.images && speciesItem.images.length > 0 && speciesItem.images[0] && speciesItem.images[0].trim() !== '' ? (
                    <Image
                      src={speciesItem.images[0]}
                      alt={speciesItem.commonName}
                      fill
                      className="object-cover object-top group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <span
                      className={`${iucnStatusColors[speciesItem.iucnStatus] || 'bg-gray-500'} text-white text-xs font-bold px-3 py-1 rounded-full shadow-md`}
                    >
                      {speciesItem.iucnStatus}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <span className="text-white/90 text-sm font-medium">{speciesItem.category}</span>
                  </div>
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-bold text-green-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-1">
                    {speciesItem.commonName}
                  </h2>
                  <p className="text-sm text-gray-600 italic mb-3 line-clamp-1">{speciesItem.scientificName}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500">
                      {iucnStatusLabels[speciesItem.iucnStatus] || speciesItem.iucnStatus}
                    </span>
                    <div className="flex items-center text-green-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
                      View Details
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
