import SpeciesDashboard from "@/components/ui/skiper-ui/SpeciesDashboard";
import ErrorCircle from "@/components//ui/skiper-ui/errorcircle";

export default function SpeciesPage() {
  return (
    <main className="min-h-screen">
      <SpeciesDashboard />
       <section className="relative z-20 mt-8 w-full">
          <ErrorCircle />
        </section>
    </main>
  );
}