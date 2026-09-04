// app/species/page.tsx
import { connectDB } from "@/lib/mongodb";
import SpeciesDashboard from "@/components/ui/skiper-ui/SpeciesDashboard";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export interface Species {
  _id: string;
  id: string;
  commonName: string;
  scientificName: string;
  category: string;
  iucnStatus: string;
  images?: string[];
  location?: string;
  population?: Record<string, any>;
  [key: string]: any;
}

export default async function SpeciesPage() {
  let speciesList: Species[] = [];

  try {
    const conn = await connectDB();
    const db = conn.connection?.db || conn.db;

    if (!db) {
      throw new Error("MongoDB connection instance is undefined.");
    }

    const results = await db.collection("species").find({}).toArray();

    speciesList = results.map((doc) => ({
      ...doc,
      _id: doc._id.toString(),
      id: doc.id || doc._id.toString(),
      commonName: doc.commonName || doc.common_name || "Unknown Species",
      scientificName: doc.scientificName || doc.scientific_name || "",
      category: doc.category || "General",
      iucnStatus: doc.iucnStatus || doc.iucn_status || "UNKNOWN",
      images: Array.isArray(doc.images) ? doc.images : [],
    })) as Species[];
  } catch (error) {
    console.error("FAILED_TO_FETCH_SPECIES_LIST:", error);
  }

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <SpeciesDashboard species={speciesList} />
      </div>
    </main>
  );
}