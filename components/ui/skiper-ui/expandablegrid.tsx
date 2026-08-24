// components/ExpandableGrid.tsx
"use client";

import { useState } from "react";

type Box = {
  id: number;
  label: string;
  stat: string;
  details: string;
  keyFact: string;
  source: string;
  color: string;
  imageUrl: string;
};

type ExpandableGridProps = {
  className?: string;
};

const initialBoxes: Box[] = [
  {
    id: 1,
    label: "First Country to Double Its Wild Tigers",
    stat: "355 wild tigers (2022), up from 121 in 2009",
    keyFact:
      "Covered 18,900+ sq km in the National Tiger and Prey Survey 2022",
    details:
      "Nepal became the first country to meet the global TX2 goal of doubling its wild tigers, rising from 121 in 2009 to 355 in the National Tiger and Prey Survey 2022 — a survey covering more than 18,900 sq km and led by the Department of National Parks and Wildlife Conservation. The Bengal tiger remains Endangered globally, making Nepal's Terai Arc population one of the species' most important recovery stories.",
    source: "WWF — National Tiger and Prey Survey 2022",
    color: "bg-gray-300 text-black",
    imageUrl:
      "https://cdn.getyourguide.com/image/format=auto%2Cfit=crop%2Cgravity=auto%2Cquality=60%2Cwidth=1920%2Cdpr=1/tour_img/ef6233f55ee1f7b371a0014f6da5d38da19666c46ff663267083fa5385ec9fda.jpg",
  },
  {
    id: 2,
    label: "Rhinos Rising, Backed by Zero-Poaching Years",
    stat: "752 greater one-horned rhinos (2021 National Rhino Count)",
    keyFact:
      "16% population increase sustained by consecutive zero-poaching years",
    details:
      "Nepal's greater one-horned rhino population reached 752 in the 2021 National Rhino Count, a 16% rise from 645 in 2015, sustained by repeated zero-poaching years — a rare achievement for a species prized in the illegal horn trade. Globally the species is Vulnerable but increasing, and Chitwan National Park holds the second-largest population on Earth.",
    source: "WWF / DNPWC — National Rhino Count 2021",
    color: "bg-gray-300 text-black",
    imageUrl:
      "https://th.bing.com/th/id/R.6b145176aff317f7d1a57b8e967a464a?rik=1VRovgOc3fX0wg&pid=ImgRaw&r=0",
  },
  {
    id: 3,
    label: "World's First Vulture Safe Zone",
    stat: ">90% vulture crash the safe-zone model set out to reverse",
    keyFact:
      "Diclofenac veterinary ban initiated in 2006 across western Terai",
    details:
      "After the veterinary drug diclofenac drove South Asia's vultures to declines of more than 90% in the 1990s–2000s, Nepal banned its veterinary use in 2006 and declared the world's first Vulture Safe Zone — a landscape across the western Terai kept diclofenac-free through community action, supported by captive breeding and release. The White-rumped Vulture, Critically Endangered, is the flagship of this recovery.",
    source: "Bird Conservation Nepal — Vulture Conservation Program",
    color: "bg-gray-300 text-black",
    imageUrl:
      "https://tse4.mm.bing.net/th/id/OIP.6ddqvvP-gtjJli_ixo8CJwHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: 4,
    label: "Guardian Range of the Snow Leopard",
    stat: ">10% of the world's snow leopards live in Nepal",
    keyFact:
      "Estimated 300–400 cats across high-elevation Himalayan ranges",
    details:
      "Nepal's high Himalaya holds over a tenth of the global snow leopard population — an estimated 300–400 cats — across a network of trans-Himalayan protected areas including Sagarmatha, the highest-elevation protected area on Earth. The species is Vulnerable globally and notoriously hard to count; Nepal's national assessment is among the most systematic in its range.",
    source: "IUCN Red List (Panthera uncia) / Snow Leopard Trust",
    color: "bg-gray-300 text-black",
    imageUrl:
      "https://traveldudes.com/wp-content/uploads/2024/09/Snow-Leopard-in-the-mountains-in-Nepal-1920x1097.jpg",
  },
];

export default function ExpandableGrid({
  className = "",
}: ExpandableGridProps) {
  const [expandedId, setExpandedId] = useState<number>(initialBoxes[0].id);

  const expanded =
    initialBoxes.find((b) => b.id === expandedId) || initialBoxes[0];

  const others = initialBoxes.filter((b) => b.id !== expanded.id);

  return (
    <div
      className={`w-full overflow-y-auto bg-white p-6 flex flex-col items-center ${className}`}
    >
      {/* Top Main Expanded Box */}
      <div
        className={`relative z-20 w-[85vw] min-h-[58vh] p-8 rounded-3xl shadow-2xl mb-6 flex flex-col justify-between transition-all duration-300 ${expanded.color}`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          {/* Main Info Column */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-widest font-semibold opacity-75">
              Conservation Feature Story
            </span>

            <h1 className="font-extrabold text-3xl leading-tight">
              {expanded.label}
            </h1>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl my-2 border border-white/10">
              <p className="font-bold text-xl">{expanded.stat}</p>

              <p className="text-xs opacity-85 mt-1 font-medium">
                📌 {expanded.keyFact}
              </p>
            </div>

            <p className="text-sm leading-relaxed opacity-90">
              {expanded.details}
            </p>
          </div>

          {/* Web Image Column */}
          <div className="lg:col-span-2 flex flex-col h-full justify-between">
            <div className="w-full h-[240px] rounded-2xl overflow-hidden shadow-inner bg-black/20 relative">
              <img
                className="w-full h-full object-cover"
                src={expanded.imageUrl}
                alt={expanded.label}
              />
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t border-white/20 flex flex-wrap justify-between items-center text-xs opacity-80">
          <span>Official Report Data</span>

          <span className="font-medium">
            Source: {expanded.source}
          </span>
        </div>
      </div>

      {/* Lower Grid View */}
      <div className="grid grid-cols-3 gap-5 w-[85vw]">
        {others.map((box) => (
          <div
            key={box.id}
            onClick={() => setExpandedId(box.id)}
            className={`relative min-h-[22vh] p-6 rounded-2xl cursor-pointer transition-all duration-300 shadow-xl flex flex-col justify-between hover:scale-[1.015] hover:shadow-2xl overflow-hidden ${box.color}`}
          >
            <div className="absolute top-3 right-3 text-lg opacity-80 z-10">
              ⋮
            </div>

            <div>
              <p className="font-bold text-base line-clamp-1 pr-6">
                {box.label}
              </p>

              <p className="text-xs font-semibold mt-1 opacity-90 line-clamp-1">
                {box.stat}
              </p>

              <p className="mt-3 text-xs opacity-80 line-clamp-3 leading-relaxed">
                {box.details}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-white/10 mt-2">
              <img
                src={box.imageUrl}
                alt={box.label}
                className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
              />

              <div className="text-[11px] opacity-75 truncate">
                Source: {box.source}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}