import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

type Result = { price: string; source: string };

function statsPerSource(results: Result[]) {
  const sources = [...new Set(results.map(r => r.source))];
  return sources.map(source => {
    const prices = results
      .filter(r => r.source === source)
      .map(r => parseInt(r.price.replace(/\D/g, "")));
    return {
      source,
      min: Math.min(...prices),
      avg: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length),
      max: Math.max(...prices),
    };
  });
}

const fmt = (val: number) => `₦${(val / 1000).toFixed(0)}k`;

export function PriceBySource({ results }: { results: Result[] }) {
  const data = statsPerSource(results);

  return (
    <div className="rounded-xl border border-border p-4">
      <p className="text-sm font-medium text-muted-foreground mb-3">
        Price by store
      </p>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} barCategoryGap="30%">
          <XAxis dataKey="source" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
          <YAxis tickFormatter={fmt} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} width={40} />
          <Tooltip formatter={(val: number) => fmt(val)} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="min" name="Lowest" fill="hsl(var(--primary) / 0.5)" radius={[4,4,0,0]} />
          <Bar dataKey="avg" name="Average" fill="hsl(var(--primary))" radius={[4,4,0,0]} />
          <Bar dataKey="max" name="Highest" fill="hsl(var(--primary) / 0.25)" radius={[4,4,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}