"use client";

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts";

type Metric = { label: string; value: number };

export function TraderScoreRadar({ data, score }: { data: Metric[]; score: number }) {
  return (
    <div className="glass-card h-full">
      <div className="flex items-center justify-between px-4 pt-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--velocity-muted)]">Score</p>
          <p className="text-3xl font-semibold text-[color:var(--velocity-accent)]">{score.toFixed(2)}</p>
        </div>
      </div>
      <div className="h-64 px-2 pb-4 pt-2">
        <ResponsiveContainer>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="rgba(148,163,184,0.25)" />
            <PolarAngleAxis dataKey="label" stroke="var(--velocity-muted)" tick={{ fill: "var(--velocity-muted)", fontSize: 11 }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              dataKey="value"
              stroke="var(--velocity-accent)"
              fill="var(--velocity-accent)"
              fillOpacity={0.25}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
