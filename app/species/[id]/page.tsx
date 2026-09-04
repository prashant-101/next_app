import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";

type Species = {
  _id: string;
  id: string;
  commonName: string;
  scientificName: string;
  category: string;
  iucnStatus: string;
  family?: string;
  location?: string;
  foodAndDiet?: string;
  natureAndActivity?: string;
  spatialDistribution?: string;
  description?: string;
  images?: string[];
  population?: Record<string, number | string>;
  distribution?: {
    provinces?: string[];
    districts?: string[];
  };
};

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function SpeciesDetailPage({
  params,
}: PageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  let animal: Species;

  try {
    console.log("DETAIL PAGE ID:", id);

    const mongoose = await connectDB();
    const db = mongoose.connection.db;

    if (!db) {
      throw new Error("MongoDB database is unavailable");
    }

    const result = await db.collection("species").findOne({
      id: id,
    });

    if (!result) {
      console.log("Species not found:", id);
      notFound();
    }

    animal = {
      ...result,
      _id: result._id.toString(),
    } as Species;

    console.log("SPECIES FOUND:", animal.commonName);
  } catch (error) {
    console.error("SPECIES DETAIL PAGE ERROR:", error);
    throw error;
  }

  // JSX is OUTSIDE try/catch
  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-6xl">

        <h1 className="text-4xl font-bold">
          {animal.commonName}
        </h1>

        <p className="mt-2 text-lg italic text-gray-600">
          {animal.scientificName}
        </p>

        {animal.images && animal.images.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {animal.images.map((image, index) => (
              <img
                key={`${image}-${index}`}
                src={image}
                alt={`${animal.commonName} ${index + 1}`}
                className="h-80 w-full rounded-xl object-cover"
              />
            ))}
          </div>
        )}

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div>
            <strong>Category:</strong>{" "}
            {animal.category}
          </div>

          <div>
            <strong>IUCN Status:</strong>{" "}
            {animal.iucnStatus}
          </div>

          <div>
            <strong>Family:</strong>{" "}
            {animal.family || "N/A"}
          </div>

          <div>
            <strong>Location:</strong>{" "}
            {animal.location || "N/A"}
          </div>
        </div>

        {animal.description && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold">
              Description
            </h2>

            <p className="mt-4 leading-7">
              {animal.description}
            </p>
          </section>
        )}

        {animal.foodAndDiet && (
          <section className="mt-8">
            <h2 className="text-2xl font-bold">
              Food & Diet
            </h2>

            <p className="mt-3">
              {animal.foodAndDiet}
            </p>
          </section>
        )}

        {animal.natureAndActivity && (
          <section className="mt-8">
            <h2 className="text-2xl font-bold">
              Nature & Activity
            </h2>

            <p className="mt-3">
              {animal.natureAndActivity}
            </p>
          </section>
        )}

        {animal.spatialDistribution && (
          <section className="mt-8">
            <h2 className="text-2xl font-bold">
              Spatial Distribution
            </h2>

            <p className="mt-3">
              {animal.spatialDistribution}
            </p>
          </section>
        )}

        {animal.distribution && (
          <section className="mt-8">
            <h2 className="text-2xl font-bold">
              Distribution
            </h2>

            <div className="mt-3">
              <p>
                <strong>Provinces:</strong>{" "}
                {animal.distribution.provinces?.join(", ") || "N/A"}
              </p>

              <p className="mt-2">
                <strong>Districts:</strong>{" "}
                {animal.distribution.districts?.join(", ") || "N/A"}
              </p>
            </div>
          </section>
        )}

      </div>
    </main>
  );
}