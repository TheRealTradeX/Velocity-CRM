type SessionStat = {
  label: string;
  winRate: number;
};

export function SessionWinRates({ sessions }: { sessions: SessionStat[] }) {
  return (
    <div className="glass-card h-full p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--velocity-muted)]">
        Session Win Rates
      </p>
      <div className="mt-4 space-y-3">
        {sessions.map((session) => (
          <div key={session.label} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>{session.label}</span>
              <span className="text-[color:var(--velocity-accent)] font-semibold">{session.winRate.toFixed(1)}%</span>
            </div>
            <div className="relative h-2 overflow-hidden rounded-full bg-[color:var(--velocity-border)]/60">
              <div
                className="absolute left-0 top-0 h-full bg-[color:var(--velocity-accent)]"
                style={{ width: `${session.winRate}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
