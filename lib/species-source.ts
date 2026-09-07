import additionalData from "@/data/additional.json";
import demoData from "@/data/demo.json";

type DemoSpecies = (typeof demoData)[number];
type AdditionalSpecies = (typeof additionalData.species)[number];

export type SpeciesRecord = DemoSpecies & Partial<AdditionalSpecies>;

const additionalById = new Map(
  additionalData.species.map((entry) => [String(entry.id), entry])
);

function mergeSpecies(base: DemoSpecies): SpeciesRecord {
  const extra =
    additionalById.get(base.id) ||
    additionalData.species.find(
      (entry) =>
        entry.name === base.commonName ||
        entry.scientific_name === base.scientificName
    );

  return extra ? { ...base, ...extra } : base;
}

export function getLocalSpecies(): SpeciesRecord[] {
  return demoData.map(mergeSpecies);
}

export async function getAllSpecies(): Promise<SpeciesRecord[]> {
  return getLocalSpecies();
}

export async function getSpeciesById(
  id: string
): Promise<SpeciesRecord | null> {
  return getLocalSpecies().find((species) => species.id === id) ?? null;
}
