import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function SpeciesDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const mongoose = await connectDB();
  const db = mongoose.connection.db;

  if (!db) {
    throw new Error("Database unavailable");
  }

  const animal = await db.collection("species").findOne({ id });

  if (!animal) {
    notFound();
  }

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-4xl font-bold">
        {String(animal.commonName)}
      </h1>

      <p className="mt-4">
        Scientific name: {String(animal.scientificName)}
      </p>

      <p className="mt-4">
        Category: {String(animal.category)}
      </p>

      <p className="mt-4">
        IUCN Status: {String(animal.iucnStatus)}
      </p>
    </main>
  );
}