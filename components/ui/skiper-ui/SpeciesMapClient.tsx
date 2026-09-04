'use client';

import dynamic from 'next/dynamic';

// Dynamic import with ssr: false is now isolated in a Client Component
const SpeciesMap = dynamic(() => import('./SpeciesMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[450px] w-full rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500">
      Loading map...
    </div>
  ),
});

interface SpeciesMapClientProps {
  location?: string;
  name: string;
}

export default function SpeciesMapClient({ location, name }: SpeciesMapClientProps) {
  return <SpeciesMap location={location} name={name} />;
}