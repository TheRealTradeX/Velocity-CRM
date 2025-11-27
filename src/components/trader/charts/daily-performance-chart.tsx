"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type DayPerformance = { day: string; value: number };

export function DailyPerformanceChart({ data }: { data: DayPerformance[] }) {
  return (
    <div className="glass-card h-full p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--velocity-muted)]">
            Trading Day Performance
          </p>
          <p className="text-lg font-semibold">This Week</p>
        </div>
        <div className="text-xs text-[color:var(--velocity-muted)]">PnL by day</div>
      </div>
      <div className="h-56 pt-2">
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="day" stroke="var(--velocity-border)" />
            <YAxis stroke="var(--velocity-border)" />
            <Tooltip
              contentStyle={{ background: "#0f172a", border: "1px solid rgba(148,163,184,0.2)", borderRadius: 12 }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, "PnL"]}
            />
            <Bar
              dataKey="value"
              radius={[6, 6, 0, 0]}
              fillOpacity={0.9}
              fill={(entry) => (entry.value >= 0 ? "var(--velocity-accent)" : "var(--velocity-danger)")}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
