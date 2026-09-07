import { notFound } from 'next/navigation';
import { getSpeciesById } from '@/lib/species-source';
import SpeciesDetail from './SpeciesDetail';

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
  // Additional fields from additional.json
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

export default async function SpeciesDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const species = (await getSpeciesById(id)) as SpeciesData | null;

  if (!species) {
    notFound();
  }

  return <SpeciesDetail species={species} />;
}
