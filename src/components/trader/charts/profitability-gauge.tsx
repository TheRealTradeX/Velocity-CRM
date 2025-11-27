"use client";

import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";

export function ProfitabilityGauge({
  totalTrades,
  winRate,
}: {
  totalTrades: number;
  winRate: number;
}) {
  const clampedWinRate = Math.max(0, Math.min(100, winRate));
  const data = [
    {
      name: "Win Rate",
      value: clampedWinRate,
      fill: "var(--velocity-accent)",
    },
  ];

  return (
    <div className="glass-card h-full p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--velocity-muted)]">
            Profitability
          </p>
          <p className="text-lg font-semibold text-[color:var(--velocity-accent)]">{winRate.toFixed(1)}%</p>
          <p className="text-xs text-[color:var(--velocity-muted)]">Trades: {totalTrades}</p>
        </div>
      </div>
      <div className="h-48">
        <ResponsiveContainer>
          <RadialBarChart
            data={data}
            startAngle={180}
            endAngle={0}
            innerRadius={80}
            outerRadius={100}
            barSize={12}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar
              dataKey="value"
              background
              isAnimationActive={false}
              cornerRadius={999}
              fill="var(--velocity-accent)"
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
