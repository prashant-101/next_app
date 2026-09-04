import SpeciesDetail from "@/components/ui/skiper-ui/speciesDetail";
import ErrorCircle from "@/components/ui/skiper-ui/errorcircle";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

async function getSpeciesData(id: string) {
  try {
    await connectDB();
    const db = mongoose.connection.db;
    if (!db) return null;

    const queryConditions: Array<Record<string, unknown>> = [{ id: id }];

    if (mongoose.Types.ObjectId.isValid(id)) {
      queryConditions.push({ _id: new mongoose.Types.ObjectId(id) });
    }

    const animal = await db.collection("species").findOne({
      $or: queryConditions,
    });

    if (!animal) return null;

    // Convert BSON ObjectId to plain string for safe React component rendering
    return {
      ...animal,
      _id: animal._id.toString(),
    };
  } catch (error) {
    console.error("Error fetching species data:", error);
    return null;
  }
}

export default async function SpeciesPage({ params }: Props) {
  const { id } = await params;
  const species = await getSpeciesData(id);

  if (!species) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-800">
            Species not found
          </h1>
          <p className="text-slate-500 mt-2">
            The requested species could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SpeciesDetail species={species} />
      <section className="relative z-20 mt-8 w-full">
        <ErrorCircle />
      </section>
    </div>
  );
}