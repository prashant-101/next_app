import SpeciesDetail from "@/components/ui/skiper-ui/speciesDetail";
import ErrorCircle from "@/components/ui/skiper-ui/errorcircle";
type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SpeciesPage({ params }: Props) {
  const { id } = await params;

  const response = await fetch(
    `http://localhost:3000/api/species/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
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

  const species = await response.json();

  return (
    <div>
      <SpeciesDetail species={species} />
      <section className="relative z-20 mt-8 w-full">
        <ErrorCircle />
      </section>
    </div>
  );
}