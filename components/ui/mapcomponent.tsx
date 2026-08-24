"use client";

import React, { useEffect, useRef, useState } from "react";

type Area = {
  id: string;
  name: string;
  type: "National Park" | "Conservation Area";
  shape: "poly" | "rect";
  coords: string;
  location: string;
  habitat: string;
  wildlife: string[];
  description: string;
};

const areas: Area[] = [
  {
    id: "chitwan",
    name: "Chitwan National Park",
    type: "National Park",
    shape: "poly",
    coords:
      "2133,1791,2148,1766,2093,1744,2077,1704,2021,1660,2015,1607,1984,1619,1981,1588,1880,1598,1756,1595,1783,1532,1727,1591,1637,1604,1656,1641,1694,1654,1719,1620,1778,1651,1787,1617,1917,1688,1973,1695,1964,1738,2069,1757,2113,1794",
    location: "Southern Nepal",
    habitat: "Sal forests, grasslands, wetlands and riverine forests.",
    wildlife: [
      "Greater One-horned Rhinoceros",
      "Bengal Tiger",
      "Gharial",
      "Asian Elephant",
    ],
    description:
      "One of Nepal's most important lowland protected areas, supporting globally threatened species and diverse Terai ecosystems.",
  },

  {
    id: "shivapuri",
    name: "Shivapuri Nagarjun",
    type: "National Park",
    shape: "rect",
    coords: "461,719,560,772",
    location: "Bagmati Province",
    habitat: "Mountain forests and watershed ecosystems.",
    wildlife: [
      "Leopard",
      "Himalayan Black Bear",
      "Wild Boar",
      "Rhesus Monkey",
    ],
    description:
      "A forested protected area in the hills north of Kathmandu, important for biodiversity and watershed protection.",
  },

  {
    id: "banke-bardia",
    name: "Banke / Bardia",
    type: "National Park",
    shape: "poly",
    coords:
      "770,1310,733,1273,708,1260,659,1245,622,1205,588,1177,544,1174,560,1152,561,1115,576,1081,623,1121,707,1186,831,1304,902,1313,948,1375,951,1406,898,1384,849,1372,837,1350,793,1335,737,1295,747,1308",
    location: "Western Terai",
    habitat: "Sal forests, riverine forests, grasslands and wetlands.",
    wildlife: [
      "Bengal Tiger",
      "Greater One-horned Rhinoceros",
      "Asian Elephant",
      "Gharial",
    ],
    description:
      "The western Terai protected landscape provides important habitat for large mammals and river ecosystems.",
  },

  {
    id: "suklaphanta",
    name: "Shuklaphanta",
    type: "National Park",
    shape: "poly",
    coords:
      "159,1000,224,1015,237,882,206,922,162,929,144,907,116,950,89,987,114,1022,133,994,148,1003,133,994",
    location: "Sudurpashchim Province",
    habitat: "Grasslands, sal forests and wetland ecosystems.",
    wildlife: [
      "Swamp Deer",
      "Bengal Tiger",
      "Leopard",
      "Wild Elephant",
    ],
    description:
      "A western Terai protected area known for its extensive grasslands and important wildlife populations.",
  },

  {
    id: "koshitappu",
    name: "Koshi Tappu",
    type: "National Park",
    shape: "rect",
    coords: "2901,1970,2950,2031",
    location: "Koshi Province",
    habitat: "River, wetland and floodplain ecosystems.",
    wildlife: [
      "Wild Water Buffalo",
      "Gharial",
      "Ganges River Dolphin",
      "Migratory Birds",
    ],
    description:
      "A major wetland ecosystem associated with the Koshi River and its surrounding floodplains.",
  },

  {
    id: "rara",
    name: "Rara National Park",
    type: "National Park",
    shape: "rect",
    coords: "874,677,920,711",
    location: "Karnali Province",
    habitat: "Conifer forests, alpine ecosystems and freshwater habitats.",
    wildlife: [
      "Musk Deer",
      "Red Panda",
      "Himalayan Black Bear",
      "Himalayan Goral",
    ],
    description:
      "A high-altitude protected area centered around Rara Lake and surrounding mountain ecosystems.",
  },

  {
    id: "makalu-barun",
    name: "Makalu-Barun",
    type: "National Park",
    shape: "poly",
    coords:
      "2733,1505,2702,1422,2585,1397,2566,1307,2535,1322,2532,1400,2498,1443,2479,1397,2415,1322,2381,1356,2436,1446,2470,1469,2501,1500,2547,1481,2628,1583,2699,1552",
    location: "Eastern Nepal",
    habitat: "Subtropical forests to alpine and high Himalayan ecosystems.",
    wildlife: [
      "Red Panda",
      "Snow Leopard",
      "Himalayan Tahr",
      "Musk Deer",
    ],
    description:
      "A highly diverse protected landscape extending from lower forests to high Himalayan ecosystems.",
  },

  {
    id: "manaslu",
    name: "Manaslu Conservation Area",
    type: "Conservation Area",
    shape: "poly",
    coords:
      "1881,1052,1928,1055,1965,1098,2027,1123,2076,1126,2117,1090,2151,1093,2154,1127,2151,1155,2129,1174,2086,1179,2082,1195,2082,1210,2055,1222,2045,1238,2021,1222,1996,1219,1959,1219,1912,1176,1890,1102,1878,1077",
    location: "Gandaki Province",
    habitat: "Mountain forests, alpine meadows and high Himalayan ecosystems.",
    wildlife: [
      "Snow Leopard",
      "Blue Sheep",
      "Himalayan Tahr",
      "Musk Deer",
    ],
    description:
      "A community-based conservation landscape protecting diverse Himalayan habitats around the Manaslu region.",
  },

  {
    id: "sagarmatha",
    name: "Sagarmatha",
    type: "National Park",
    shape: "poly",
    coords:
      "2787,1337,2812,1380,2896,1414,2849,1495,2734,1492,2685,1433,2706,1371,2737,1358,2762,1339",
    location: "Koshi Province",
    habitat: "Alpine meadows, mountain forests and high Himalayan ecosystems.",
    wildlife: [
      "Snow Leopard",
      "Himalayan Tahr",
      "Musk Deer",
      "Red Panda",
    ],
    description:
      "A high-altitude protected area containing some of Nepal's most iconic Himalayan ecosystems.",
  },

  {
    id: "langtang",
    name: "Langtang",
    type: "National Park",
    shape: "poly",
    coords:
      "2234,1263,2254,1235,2319,1241,2358,1191,2420,1294,2424,1328,2387,1359,2378,1402,2276,1390,2179,1362,2172,1350,2219,1319,2225,1285",
    location: "Bagmati Province",
    habitat: "Oak, rhododendron, conifer and alpine habitats.",
    wildlife: [
      "Red Panda",
      "Himalayan Black Bear",
      "Himalayan Tahr",
      "Leopard",
    ],
    description:
      "A diverse Himalayan protected area extending from mountain forests to alpine environments.",
  },

  {
    id: "kanchenjunga",
    name: "Kanchenjunga",
    type: "Conservation Area",
    shape: "poly",
    coords:
      "3195,1443,3276,1390,3350,1399,3387,1430,3369,1511,3338,1576,3347,1622,3300,1622,3248,1622,3217,1607,3189,1536,3170,1474",
    location: "Koshi Province",
    habitat: "Temperate forests, alpine meadows and high Himalayan habitats.",
    wildlife: [
      "Snow Leopard",
      "Red Panda",
      "Himalayan Black Bear",
      "Musk Deer",
    ],
    description:
      "A community-managed protected area containing important eastern Himalayan ecosystems.",
  },

  {
    id: "api-nampa",
    name: "Api Nampa",
    type: "Conservation Area",
    shape: "poly",
    coords:
      "406,416,431,342,474,339,505,389,505,407,496,441,483,478,496,531,502,562,471,568,428,584,403,596,353,590,347,568,319,568,294,534,294,500,313,460,350,469",
    location: "Sudurpashchim Province",
    habitat: "Mountain forests, alpine meadows and high-altitude ecosystems.",
    wildlife: [
      "Snow Leopard",
      "Blue Sheep",
      "Himalayan Tahr",
      "Musk Deer",
    ],
    description:
      "A protected western Himalayan landscape containing important high-altitude habitats.",
  },

  {
    id: "shey-phoksundo",
    name: "Shey-Phoksundo",
    type: "National Park",
    shape: "poly",
    coords:
      "1116,612,1174,575,1190,606,1215,612,1240,612,1261,627,1292,633,1305,655,1329,655,1326,674,1323,702,1295,705,1305,733,1329,761,1323,776,1302,798,1302,816,1311,829,1317,854,1258,916,1240,906,1221,925,1199,894,1168,869,1128,866,1094,826,1091,801,1113,779,1097,742,1075,711,1082,674,1094,652",
    location: "Karnali Province",
    habitat: "Alpine meadows, high mountain valleys and trans-Himalayan ecosystems.",
    wildlife: [
      "Snow Leopard",
      "Blue Sheep",
      "Himalayan Tahr",
      "Musk Deer",
    ],
    description:
      "Nepal's largest national park, protecting extensive high-altitude ecosystems.",
  },
];

function parseCoords(coords: string) {
  return coords.split(",").map(Number);
}

export default function MapComponent() {
  const imageRef = useRef<HTMLImageElement>(null);

  const [selected, setSelected] = useState<Area>(areas[0]);

  const [imageSize, setImageSize] = useState({
    width: 3500,
    height: 2100,
  });

  /*
   * IMPORTANT:
   *
   * These coordinates came directly from image-map.net.
   * We calculate the actual image dimensions and scale the
   * clickable areas with the image.
   */

  useEffect(() => {
    const updateSize = () => {
      const image = imageRef.current;

      if (!image) return;

      if (image.naturalWidth && image.naturalHeight) {
        setImageSize({
          width: image.naturalWidth,
          height: image.naturalHeight,
        });
      }
    };

    updateSize();

    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return (
    <section className="w-full">

      {/* =====================================================
          MAP
      ===================================================== */}

      <div className="overflow-hidden rounded-2xl border border-[#deded9] bg-white shadow-[0_10px_35px_rgba(0,0,0,0.05)]">

        <div className="relative w-full overflow-auto bg-[#ededeb]">

          <div
            className="relative mx-auto"
            style={{
              aspectRatio: `${imageSize.width}/${imageSize.height}`,
              width: "100%",
            }}
          >

            {/* =================================================
                ORIGINAL MAP IMAGE
            ================================================= */}

            <img
              ref={imageRef}
              src="/maps/nepal-protected-areas.jpg"
              alt="Nepal protected areas map"
              className="absolute inset-0 block h-full w-full object-contain"
              draggable={false}
              onLoad={() => {
                const image = imageRef.current;

                if (!image) return;

                setImageSize({
                  width: image.naturalWidth,
                  height: image.naturalHeight,
                });
              }}
            />


            {/* =================================================
                EXACTLY ALIGNED SVG
            ================================================= */}

            <svg
              className="absolute inset-0 h-full w-full"
              viewBox={`0 0 ${imageSize.width} ${imageSize.height}`}
              preserveAspectRatio="none"
            >

              {areas.map((area) => {
                const coords = parseCoords(area.coords);

                const isSelected = selected.id === area.id;

                if (area.shape === "rect") {
                  const x = Math.min(coords[0], coords[2]);
                  const y = Math.min(coords[1], coords[3]);

                  const width = Math.abs(coords[2] - coords[0]);
                  const height = Math.abs(coords[3] - coords[1]);

                  return (
                    <rect
                      key={area.id}
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      rx={12}
                      fill={
                        isSelected
                          ? "rgba(82,110,92,0.55)"
                          : "rgba(82,110,92,0.12)"
                      }
                      stroke={
                        isSelected
                          ? "#526e5c"
                          : "rgba(82,110,92,0.55)"
                      }
                      strokeWidth={isSelected ? 12 : 7}
                      className="cursor-pointer transition-all"
                      onClick={() => setSelected(area)}
                    />
                  );
                }

                const points: string[] = [];

                for (let i = 0; i < coords.length; i += 2) {
                  points.push(`${coords[i]},${coords[i + 1]}`);
                }

                return (
                  <polygon
                    key={area.id}
                    points={points.join(" ")}
                    fill={
                      isSelected
                        ? "rgba(82,110,92,0.55)"
                        : "rgba(82,110,92,0.12)"
                    }
                    stroke={
                      isSelected
                        ? "#526e5c"
                        : "rgba(82,110,92,0.55)"
                    }
                    strokeWidth={isSelected ? 12 : 7}
                    strokeLinejoin="round"
                    className="cursor-pointer transition-all"
                    onClick={() => setSelected(area)}
                  />
                );
              })}

            </svg>

          </div>

        </div>


        {/* =====================================================
            LEGEND
        ===================================================== */}

        <div className="flex flex-wrap items-center gap-6 border-t border-[#e5e5e1] bg-[#fafaf8] px-5 py-4">

          <div className="flex items-center gap-2">

            <span className="h-3 w-3 rounded-sm border border-[#526e5c] bg-[#526e5c]/20" />

            <span className="text-xs text-[#70706a]">
              National Park
            </span>

          </div>


          <div className="flex items-center gap-2">

            <span className="h-3 w-3 rounded-sm border border-[#8a978d] bg-[#8a978d]/20" />

            <span className="text-xs text-[#70706a]">
              Conservation Area
            </span>

          </div>


          <span className="ml-auto text-[10px] uppercase tracking-[0.18em] text-[#9a9a94]">
            Click a protected area
          </span>

        </div>

      </div>


      {/* =====================================================
          SELECTED AREA
      ===================================================== */}

      <div className="mt-5 overflow-hidden rounded-2xl border border-[#deded9] bg-white">

        <div className="grid lg:grid-cols-2">

          {/* LEFT */}

          <div className="p-6 md:p-8">

            <div className="flex items-center gap-2">

              <span className="h-2 w-2 rounded-full bg-[#526e5c]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#526e5c]">
                {selected.type}
              </span>

            </div>


            <h3 className="mt-4 text-2xl font-medium text-[#22221f] md:text-4xl">
              {selected.name}
            </h3>


            <p className="mt-2 text-xs uppercase tracking-[0.12em] text-[#999993]">
              {selected.location}
            </p>


            <p className="mt-6 text-sm leading-7 text-[#70706a]">
              {selected.description}
            </p>

          </div>


          {/* RIGHT */}

          <div className="border-t border-[#e5e5e1] bg-[#fafaf8] lg:border-l lg:border-t-0">

            <div className="border-b border-[#e5e5e1] p-6">

              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#999993]">
                Habitat
              </p>

              <p className="mt-3 text-sm leading-6 text-[#70706a]">
                {selected.habitat}
              </p>

            </div>


            <div className="p-6">

              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#999993]">
                Wildlife
              </p>

              <div className="mt-4 flex flex-wrap gap-2">

                {selected.wildlife.map((animal) => (
                  <span
                    key={animal}
                    className="rounded-full border border-[#deded9] bg-white px-3 py-1.5 text-[11px] text-[#666660]"
                  >
                    {animal}
                  </span>
                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}