import { notFound } from "next/navigation";
import SpeciesDetail from "@/components/ui/skiper-ui/SpeciesDetail";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SpeciesPage({
  params,
}: PageProps) {
  const { id } = await params;

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    "http://localhost:3000";

  try {
    const response = await fetch(
      `${baseUrl}/api/species/${encodeURIComponent(id)}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      notFound();
    }

    const species = await response.json();

    return <SpeciesDetail species={species} />;
  } catch (error) {
    console.error("Failed to load species:", error);

    notFound();
  }
}