import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";
import { notFound } from "next/navigation";

// Force dynamic execution to bypass static caching on Vercel
export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getSpeciesData(id: string) {
  try {
    await connectDB();
    const db = mongoose.connection.db;
    if (!db) return null;

    const queryConditions: Record<string, unknown>[] = [{ id }];

    if (mongoose.Types.ObjectId.isValid(id)) {
      queryConditions.push({ _id: new mongoose.Types.ObjectId(id) });
    }

    const animal = await db.collection("species").findOne({
      $or: queryConditions,
    });

    if (!animal) return null;

    // Convert BSON ObjectId to plain string to avoid React hydration issues
    return {
      ...animal,
      _id: animal._id.toString(),
    };
  } catch (error) {
    console.error("Error fetching species in Server Component:", error);
    return null;
  }
}

export default async function SpeciesDetailPage({ params }: PageProps) {
  const { id } = await params;
  const species = await getSpeciesData(id);

  if (!species) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">{species.name || species.title}</h1>
      {species.scientificName && (
        <p className="text-lg italic text-gray-600">{species.scientificName}</p>
      )}
      <p className="text-gray-800 leading-relaxed">
        {species.description || "No description available for this species."}
      </p>
    </main>
  );
}