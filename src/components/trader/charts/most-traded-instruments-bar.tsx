type InstrumentStat = {
  symbol: string;
  wins: number;
  losses: number;
};

export function MostTradedInstrumentsBar({ instruments }: { instruments: InstrumentStat[] }) {
  return (
    <div className="glass-card h-full p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--velocity-muted)]">
        Most Traded Instruments
      </p>
      <div className="mt-4 space-y-3">
        {instruments.map((inst) => {
          const total = inst.wins + inst.losses || 1;
          const winPct = (inst.wins / total) * 100;
          const lossPct = 100 - winPct;
          return (
            <div key={inst.symbol} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">{inst.symbol}</span>
                <span className="text-xs text-[color:var(--velocity-muted)]">
                  {inst.wins}W / {inst.losses}L
                </span>
              </div>
              <div className="relative h-3 overflow-hidden rounded-full bg-[color:var(--velocity-border)]/60">
                <div
                  className="absolute left-0 top-0 h-full bg-[color:var(--velocity-accent)]"
                  style={{ width: `${winPct}%` }}
                />
                <div
                  className="absolute right-0 top-0 h-full bg-[color:var(--velocity-danger)]"
                  style={{ width: `${lossPct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
