import { getAllSpecies } from '@/lib/species-source';
import SpeciesGrid from './SpeciesGrid';

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

async function getSpecies(): Promise<SpeciesData[]> {
  return getAllSpecies() as Promise<SpeciesData[]>;
}

export default async function SpeciesPage() {
  const wildlifeData: SpeciesData[] = await getSpecies();
  return <SpeciesGrid species={wildlifeData} />;
}
