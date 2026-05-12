function buildHistogramData(
  results: { price: string }[],
  binCount = 6
) {
  const prices = results.map(r => parseInt(r.price.replace(/\D/g, "")));
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const binSize = Math.ceil((max - min) / binCount);

  const bins = Array.from({ length: binCount }, (_, i) => {
    const from = min + i * binSize;
    const to = from + binSize;
    return {
      range: `₦${(from / 1000).toFixed(0)}k–${(to / 1000).toFixed(0)}k`,
      count: prices.filter(p => p >= from && p < to).length,
    };
  });

  return bins.filter(b => b.count > 0);
}

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

type Result = { price: string; source: string };

export function PriceHistogram({ results }: { results: Result[] }) {
  const data = buildHistogramData(results);

  return (
    <div className="rounded-xl border border-border p-4">
      <p className="text-sm font-medium text-muted-foreground mb-3">
        Price distribution
      </p>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} barCategoryGap="20%">
          <XAxis
            dataKey="range"
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={24}
          />
          <Tooltip
            formatter={(val: number) => [`${val} results`, "Count"]}
            cursor={{ fill: "var(--muted)", opacity: 0.4 }}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {data.map((_, i) => (
              <Cell
                key={i}
                fill={i === 0 ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.35)"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}