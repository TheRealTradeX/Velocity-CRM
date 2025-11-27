import { BadgeMinus as Bear, BadgePlus as Bull } from "lucide-react";

export function BehavioralBiasCard({ biasLongPercent }: { biasLongPercent: number }) {
  const longPercent = Math.min(Math.max(biasLongPercent, 0), 100);
  const shortPercent = 100 - longPercent;

  return (
    <div className="glass-card h-full p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--velocity-muted)]">
            Behavioral Bias
          </p>
          <p className="text-lg font-semibold">Rather {longPercent >= 50 ? "Bull" : "Bear"}</p>
        </div>
        <div className="flex items-center gap-2 text-[color:var(--velocity-muted)]">
          <Bear className="size-5" />
          <Bull className="size-5" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-xs text-[color:var(--velocity-muted)]">
          <span>Short</span>
          <span>Long</span>
        </div>
        <div className="relative h-3 overflow-hidden rounded-full bg-[color:var(--velocity-border)]/60">
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-[color:var(--velocity-accent)]"
            style={{ width: `${longPercent}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-[color:var(--velocity-muted)]">
          <span>{shortPercent.toFixed(1)}%</span>
          <span className="text-[color:var(--velocity-accent)]">{longPercent.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
}
