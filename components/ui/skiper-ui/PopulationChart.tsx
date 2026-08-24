"use client";

type PopulationData = {
  [year: string]: number | string;
};

interface PopulationChartProps {
  population?: PopulationData;
}

export default function PopulationChart({
  population,
}: PopulationChartProps) {
  if (!population) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Population
        </h2>

        <p className="text-slate-500 mt-2">
          Population information is not available.
        </p>
      </div>
    );
  }

  const data = Object.entries(population)
    .filter(
      ([year, value]) =>
        /^\d{4}$/.test(year) &&
        typeof value === "number"
    )
    .map(([year, value]) => ({
      year: Number(year),
      population: value as number,
    }))
    .sort((a, b) => a.year - b.year);

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Population
        </h2>

        <p className="text-slate-500 mt-2">
          No population records available.
        </p>
      </div>
    );
  }

  // -----------------------------
  // GRAPH SETTINGS
  // -----------------------------

  const width = 900;
  const height = 400;

  const paddingLeft = 75;
  const paddingRight = 30;
  const paddingTop = 30;
  const paddingBottom = 60;

  const graphWidth =
    width - paddingLeft - paddingRight;

  const graphHeight =
    height - paddingTop - paddingBottom;

  const maxPopulation =
    Math.max(...data.map((item) => item.population)) * 1.1;

  const minPopulation = 0;

  const getX = (index: number) => {
    if (data.length === 1) {
      return paddingLeft + graphWidth / 2;
    }

    return (
      paddingLeft +
      (index / (data.length - 1)) * graphWidth
    );
  };

  const getY = (population: number) => {
    return (
      paddingTop +
      graphHeight -
      ((population - minPopulation) /
        (maxPopulation - minPopulation)) *
        graphHeight
    );
  };

  const points = data
    .map(
      (item, index) =>
        `${getX(index)},${getY(item.population)}`
    )
    .join(" ");

  // -----------------------------
  // Y AXIS VALUES
  // -----------------------------

  const yAxisValues = [0, 0.25, 0.5, 0.75, 1].map(
    (percentage) =>
      Math.round(maxPopulation * percentage)
  );

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">

      {/* HEADER */}

      <div className="mb-8">
        <p className="text-sm font-bold text-purple-600 uppercase tracking-wide">
          Population
        </p>

        <h2 className="text-3xl font-bold text-slate-900 mt-1">
          Population Trend
        </h2>

        <p className="text-sm text-slate-500 mt-2">
          Estimated population over time
        </p>
      </div>

      {/* ========================= */}
      {/* GRAPH */}
      {/* ========================= */}

      <div className="w-full overflow-x-auto">

        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full min-w-[700px] h-auto"
        >

          {/* GRID */}

          {yAxisValues.map((value, index) => {
            const y = getY(value);

            return (
              <g key={index}>

                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeDasharray="5 5"
                />

                <text
                  x={paddingLeft - 12}
                  y={y + 5}
                  textAnchor="end"
                  fontSize="12"
                  fill="#64748b"
                >
                  {value.toLocaleString()}
                </text>

              </g>
            );
          })}

          {/* X AXIS */}

          <line
            x1={paddingLeft}
            y1={paddingTop + graphHeight}
            x2={width - paddingRight}
            y2={paddingTop + graphHeight}
            stroke="#94a3b8"
          />

          {/* Y AXIS */}

          <line
            x1={paddingLeft}
            y1={paddingTop}
            x2={paddingLeft}
            y2={paddingTop + graphHeight}
            stroke="#94a3b8"
          />

          {/* GRAPH LINE */}

          <polyline
            points={points}
            fill="none"
            stroke="#2563eb"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* DATA POINTS */}

          {data.map((item, index) => {

            const x = getX(index);
            const y = getY(item.population);

            return (
              <g key={item.year}>

                {/* POINT */}

                <circle
                  cx={x}
                  cy={y}
                  r="7"
                  fill="white"
                  stroke="#2563eb"
                  strokeWidth="4"
                />

                {/* POPULATION LABEL */}

                <text
                  x={x}
                  y={y - 15}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="bold"
                  fill="#334155"
                >
                  {item.population.toLocaleString()}
                </text>

                {/* YEAR */}

                <text
                  x={x}
                  y={height - 25}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#64748b"
                >
                  {item.year}
                </text>

              </g>
            );
          })}

        </svg>

      </div>

      {/* ========================= */}
      {/* TABLE */}
      {/* ========================= */}

      <div className="mt-10">

        <h3 className="text-lg font-bold text-slate-900 mb-4">
          Population Records
        </h3>

        <div className="overflow-hidden rounded-xl border border-slate-200">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>
                <th className="text-left px-5 py-3 text-sm font-bold text-slate-600">
                  Year
                </th>

                <th className="text-right px-5 py-3 text-sm font-bold text-slate-600">
                  Population
                </th>

                <th className="text-right px-5 py-3 text-sm font-bold text-slate-600">
                  Individuals
                </th>
              </tr>

            </thead>

            <tbody>

              {data.map((item) => (

                <tr
                  key={item.year}
                  className="border-t border-slate-100"
                >

                  <td className="px-5 py-4 font-semibold text-slate-800">
                    {item.year}
                  </td>

                  <td className="px-5 py-4 text-right font-bold text-slate-800">
                    {item.population.toLocaleString()}
                  </td>

                  <td className="px-5 py-4 text-right text-slate-500">
                    individuals
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* ========================= */}
      {/* TRAJECTORY */}
      {/* ========================= */}

      {typeof population.trajectory === "string" && (

        <div className="mt-6 rounded-xl bg-red-50 border border-red-100 p-5">

          <p className="text-sm text-slate-500">
            Population trajectory
          </p>

          <p className="text-2xl font-bold text-red-600 mt-1">
            {population.trajectory}
          </p>

        </div>

      )}

    </div>
  );
}