import type { Metadata } from "next";
import Link from "next/link";

import { BehavioralBiasCard } from "@/components/trader/charts/behavioral-bias-card";
import { DailyPerformanceChart } from "@/components/trader/charts/daily-performance-chart";
import { MostTradedInstrumentsBar } from "@/components/trader/charts/most-traded-instruments-bar";
import { ProfitabilityGauge } from "@/components/trader/charts/profitability-gauge";
import { SessionWinRates } from "@/components/trader/charts/session-win-rates";
import { TraderScoreRadar } from "@/components/trader/charts/trader-score-radar";
import { Card } from "@/components/ui/card";

const metaDescription = "Velocity Funds trader portal – manage evaluations, funded accounts, payouts, and risk.";

export const metadata: Metadata = {
  title: "Trader Home – Velocity Funds",
  description: metaDescription,
};

const BUY_CHALLENGE_PATH = "/trader/new-challenge";

const scoreData = [
  { label: "Daily Return", value: 72 },
  { label: "Consistency", value: 68 },
  { label: "Calmar Ratio", value: 61 },
  { label: "WR", value: 78 },
  { label: "SL usage", value: 58 },
  { label: "RR", value: 74 },
];

const dailyPerformance = [
  { day: "Mon", value: 920 },
  { day: "Tue", value: -2300 },
  { day: "Wed", value: 1600 },
  { day: "Thu", value: 950 },
  { day: "Fri", value: 2500 },
];

const instruments = [
  { symbol: "NQZ5", wins: 77, losses: 39 },
  { symbol: "MNQZ5", wins: 9, losses: 17 },
];

const sessions = [
  { label: "New York", winRate: 63.8 },
  { label: "London", winRate: 28.4 },
  { label: "Asia", winRate: 44.4 },
];

export default function TraderHomePage() {
  return (
    <div className="relative space-y-10">
      <div className="absolute inset-0 -z-10 bg-[color:var(--velocity-bg)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(52,211,153,0.18),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.18),transparent_30%),radial-gradient(circle_at_60%_60%,rgba(52,211,153,0.12),transparent_30%)]" />
      </div>

      <section className="glass-card grid gap-8 overflow-hidden bg-gradient-to-br from-[rgba(15,23,42,0.8)] via-[rgba(15,23,42,0.6)] to-[rgba(15,23,42,0.3)] p-8 lg:grid-cols-2 lg:p-10">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--velocity-muted)]">
              Velocity Funds
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-[color:var(--velocity-text)] md:text-5xl">
              Accelerate
              <br />
              Your <span className="text-[color:var(--velocity-accent)]">Edge</span>
            </h1>
            <p className="max-w-2xl text-sm text-[color:var(--velocity-muted)] md:text-base">
              Velocity Funds backs disciplined traders with transparent rules, fast payouts, and real scaling. Prove your
              edge in a ruleset that mirrors real risk.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={BUY_CHALLENGE_PATH}
              className="bg-[linear-gradient(120deg,#34d399,#16a34a)] text-black rounded-full px-5 py-2.5 text-sm font-semibold shadow-[0_12px_35px_rgba(52,211,153,0.35)] transition hover:shadow-[0_16px_40px_rgba(52,211,153,0.5)]"
            >
              Get Funded
            </Link>
            <Link
              href="/rules"
              className="text-[color:var(--velocity-text)] text-sm font-semibold underline-offset-4 hover:text-[color:var(--velocity-accent)] hover:underline"
            >
              View Rules
            </Link>
          </div>
        </div>
        <div className="glass-card min-h-[260px] bg-[radial-gradient(circle_at_30%_20%,rgba(52,211,153,0.25),transparent_40%),radial-gradient(circle_at_80%_40%,rgba(59,130,246,0.18),transparent_30%),linear-gradient(135deg,rgba(15,23,42,0.8),rgba(2,6,23,0.8))]" />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <TraderScoreRadar data={scoreData} score={31.48} />
        <BehavioralBiasCard biasLongPercent={60} />
        <DailyPerformanceChart data={dailyPerformance} />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="glass-card p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--velocity-muted)]">Level</p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--velocity-text)]">Bronze</p>
          <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
            <div>
              <p className="text-[color:var(--velocity-muted)]">Total Reward</p>
              <p className="text-[color:var(--velocity-accent)] font-semibold">$0.00</p>
            </div>
            <div>
              <p className="text-[color:var(--velocity-muted)]">Highest Reward</p>
              <p className="text-[color:var(--velocity-accent)] font-semibold">$0.00</p>
            </div>
            <div>
              <p className="text-[color:var(--velocity-muted)]">Count</p>
              <p className="text-[color:var(--velocity-text)] font-semibold">0</p>
            </div>
          </div>
        </Card>
        <ProfitabilityGauge totalTrades={142} winRate={60.6} />
        <Card className="glass-card p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--velocity-muted)]">
            Holding Period
          </p>
          <p className="mt-2 text-lg font-semibold text-[color:var(--velocity-text)]">Avg: 1m 42s</p>
          <div className="mt-4 space-y-2 text-sm text-[color:var(--velocity-muted)]">
            <div className="flex items-center justify-between">
              <span>Best Day</span>
              <span className="text-[color:var(--velocity-accent)]">Thu</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Trades Taken</span>
              <span className="text-[color:var(--velocity-text)] font-semibold">142</span>
            </div>
          </div>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <MostTradedInstrumentsBar instruments={instruments} />
        <SessionWinRates sessions={sessions} />
      </section>
    </div>
  );
}
