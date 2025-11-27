"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { ChartPie, Gauge, TrendingDown, TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ReferenceLine,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { CalendarDay } from "@/data/mockMetrics";
import { getMetricsForAccount } from "@/data/mockMetrics";
import { mockAccounts } from "@/data/mockAccounts";
import { cn } from "@/lib/utils";

const emerald = "var(--velocity-accent)";
const danger = "var(--velocity-danger)";

export function MetricsRiskClient() {
  const searchParams = useSearchParams();
  const [accountScope, setAccountScope] = useState<"all" | "evaluation" | "funded">("all");
  const [selectedAccountId, setSelectedAccountId] = useState<string | "all">("all");

  const scopedAccounts = useMemo(
    () =>
      mockAccounts.filter((account) => {
        if (accountScope === "all") return true;
        if (accountScope === "funded") return account.model === "funded";
        return account.model !== "funded";
      }),
    [accountScope],
  );

  useEffect(() => {
    const initial = searchParams.get("accountId");
    if (initial) {
      setSelectedAccountId(initial);
    }
  }, [searchParams]);

  useEffect(() => {
    if (selectedAccountId !== "all" && !scopedAccounts.some((account) => account.id === selectedAccountId)) {
      setSelectedAccountId(scopedAccounts[0]?.id ?? "all");
    }
  }, [selectedAccountId, scopedAccounts]);

  const selectedAccount =
    selectedAccountId === "all" ? null : mockAccounts.find((account) => account.id === selectedAccountId) ?? null;

  const metrics = useMemo(() => getMetricsForAccount(selectedAccount?.id), [selectedAccount?.id]);

  const calendarCells = useMemo(() => buildCalendarCells(metrics.calendarMonth.days), [metrics.calendarMonth.days]);
  const totalPnL = useMemo(
    () =>
      metrics.calendarMonth.days.reduce(
        (acc, day) => (typeof day.pnl === "number" ? acc + day.pnl : acc),
        0,
      ),
    [metrics.calendarMonth.days],
  );
  const profitableDays = useMemo(
    () => metrics.calendarMonth.days.filter((day) => typeof day.pnl === "number" && day.pnl > 0).length,
    [metrics.calendarMonth.days],
  );

  const metricCards = [
    { label: "Average Win", value: metrics.metricsOverview.avgWin, prefix: "$", icon: TrendingUp, precision: 2 },
    { label: "Average Loss", value: metrics.metricsOverview.avgLoss, prefix: "$", icon: TrendingDown, precision: 2 },
    { label: "Win Ratio", value: metrics.metricsOverview.winRate * 100, suffix: "%", icon: ChartPie, precision: 0 },
    { label: "Profit Factor", value: metrics.metricsOverview.profitFactor, icon: Gauge, precision: 1 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--velocity-muted)]">
            Velocity Funds
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">Metrics &amp; Risk</h1>
          <p className="text-sm text-muted-foreground">
            Monitor your VelocityStarter and VelocityFunded accounts in one place.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Select value={accountScope} onValueChange={(value: "all" | "evaluation" | "funded") => setAccountScope(value)}>
            <SelectTrigger className="w-44 border-border/70 bg-[color:var(--velocity-card)]/80">
              <SelectValue placeholder="Scope" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All accounts</SelectItem>
              <SelectItem value="evaluation">Evaluations only</SelectItem>
              <SelectItem value="funded">Funded only</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedAccountId} onValueChange={(value) => setSelectedAccountId(value as string)}>
            <SelectTrigger className="w-52 border-border/70 bg-[color:var(--velocity-card)]/80">
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All accounts</SelectItem>
              {scopedAccounts.map((account) => (
                <SelectItem key={account.id} value={account.id}>
                  {account.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metricCards.map((card) => (
          <MetricCard
            key={card.label}
            label={card.label}
            value={card.value}
            prefix={card.prefix}
            suffix={card.suffix}
            icon={card.icon}
          />
        ))}
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">Trading Objectives</CardTitle>
          <CardDescription>FT-style rules and eligibility checks for your active accounts.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <ObjectiveCard
            label="Minimum Profitable Days"
            description="Profitable sessions completed vs requirement."
            progress={(metrics.tradingObjectives.profitableDays.completed / metrics.tradingObjectives.profitableDays.required) * 100}
            detail={`${metrics.tradingObjectives.profitableDays.completed} of ${metrics.tradingObjectives.profitableDays.required} profitable days completed`}
            tone="success"
          />
          <ObjectiveCard
            label="Maximum EOD Trailing Loss"
            description="Remaining buffer from starting equity."
            progress={Math.max(
              0,
              Math.min(
                100,
                (metrics.tradingObjectives.trailingLoss.remainingBuffer /
                  metrics.tradingObjectives.trailingLoss.startingEquity) *
                  100,
              ),
            )}
            detail={`Today starting equity $${metrics.tradingObjectives.trailingLoss.startingEquity.toLocaleString()} \u2022 Buffer $${metrics.tradingObjectives.trailingLoss.remainingBuffer.toLocaleString()}`}
            tone="info"
          />
          <ObjectiveCard
            label="HFT Profit Percentage"
            description="Latency-sensitive trades passing profitability rule."
            progress={metrics.tradingObjectives.hftProfit.value * 100}
            detail={`${Math.round(metrics.tradingObjectives.hftProfit.value * 100)}% passing`}
            tone={metrics.tradingObjectives.hftProfit.passed ? "success" : "alert"}
          />
          <ObjectiveCard
            label="Maximum Daily Loss"
            description="Current drawdown vs allowed max daily loss."
            progress={Math.min(100, (metrics.tradingObjectives.maxDailyLoss.current / metrics.tradingObjectives.maxDailyLoss.limit) * 100)}
            detail={`$${metrics.tradingObjectives.maxDailyLoss.current.toLocaleString()} of $${metrics.tradingObjectives.maxDailyLoss.limit.toLocaleString()}`}
            tone="alert"
          />
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">Daily Summary</CardTitle>
          <CardDescription>Calendar-coded profit and loss with weekly summaries.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-3">
            <div className="grid grid-cols-7 gap-2 text-center text-[11px] uppercase tracking-wide text-muted-foreground">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                <span key={`${day}-${index}`}>{day}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {calendarCells.map((cell, idx) => (
                <div
                  key={`${cell.day ?? "blank"}-${idx}`}
                  className={cn(
                    "relative aspect-square rounded-lg border border-border/60 text-center text-xs font-semibold",
                    getDayTone(cell.pnl),
                  )}
                >
                  {cell.day ? <span className="absolute left-1 top-1 text-[10px] text-muted-foreground">{cell.day}</span> : null}
                  {typeof cell.pnl === "number" ? (
                    <span className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold">
                      {cell.pnl > 0 ? "+" : ""}
                      {Math.abs(cell.pnl)}
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline" className="border-emerald-500/40 bg-emerald-500/10 text-emerald-200">
                PnL: ${totalPnL.toLocaleString()}
              </Badge>
              <Badge variant="outline" className="border-[color:var(--velocity-border)]">
                Profitable Days: {profitableDays}
              </Badge>
              {selectedAccount ? (
                <Badge variant="outline" className="border-[color:var(--velocity-border)] bg-[rgba(255,255,255,0.02)]">
                  {selectedAccount.label}
                </Badge>
              ) : null}
            </div>
            </div>

          <div className="space-y-3 rounded-xl border border-border/70 bg-[rgba(255,255,255,0.02)] p-3">
            {metrics.weeklySummaries.map((week) => (
              <div
                key={`${week.label}-${week.range}`}
                className="flex items-center justify-between rounded-lg border border-border/60 bg-[rgba(255,255,255,0.02)] px-3 py-2"
              >
                <div>
                  <p className="text-sm font-semibold">{week.label}</p>
                  <p className="text-xs text-muted-foreground">{week.range}</p>
                </div>
                <div className="text-right">
                  <p className={cn("text-sm font-semibold", week.pnl >= 0 ? "text-emerald-300" : "text-destructive")}>
                    {week.pnl >= 0 ? "+" : "-"}${Math.abs(week.pnl).toLocaleString()}
                  </p>
                  <p className="text-[11px] text-muted-foreground">{week.trades} trades</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <WinDonut title="Short Analysis" winRate={metrics.shortLongAnalysis.short.winRate} pnl={metrics.shortLongAnalysis.short.pnl} />
        <WinDonut title="Long Analysis" winRate={metrics.shortLongAnalysis.long.winRate} pnl={metrics.shortLongAnalysis.long.pnl} />
      </div>

      <div className="grid gap-4 xl:grid-cols-4 md:grid-cols-2">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">PnL Distribution by Duration</CardTitle>
            <CardDescription>FundingTicks-style time-in-trade distribution.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              id="pnl-distribution"
              config={{ pnl: { label: "PnL", color: emerald } }}
              className="h-[240px]"
            >
              <BarChart data={metrics.pnlDistributionByDuration}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="bucket" stroke="var(--border)" />
                <YAxis stroke="var(--border)" tickFormatter={(value) => `$${value}`} />
                <ReferenceLine y={0} stroke="var(--border)" />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar dataKey="pnl" radius={[8, 8, 4, 4]} fill="var(--color-pnl)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">PnL by Trade Duration</CardTitle>
            <CardDescription>Scatter view of PnL vs holding time.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer id="trade-duration" config={{ pnl: { label: "PnL", color: emerald } }} className="h-[240px]">
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="durationSeconds" name="Duration" stroke="var(--border)" tickFormatter={(value) => `${value}s`} />
                <YAxis dataKey="pnl" name="PnL" stroke="var(--border)" />
                <ReferenceLine y={0} stroke="var(--border)" />
                <Tooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value, _name, entry) => [`$${Number(value).toLocaleString()}`, entry.payload.label]}
                      labelFormatter={(value) => `Duration ${value}s`}
                    />
                  }
                />
                <Scatter data={metrics.pnlByTradeDuration} fill="var(--color-pnl)" />
              </ScatterChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">Instrument Profit Analysis</CardTitle>
            <CardDescription>Profit per symbol across the account set.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer id="instrument-profit" config={{ pnl: { label: "PnL", color: emerald } }} className="h-[240px]">
              <BarChart data={metrics.instrumentProfit}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="symbol" stroke="var(--border)" />
                <YAxis stroke="var(--border)" />
                <ReferenceLine y={0} stroke="var(--border)" />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar dataKey="pnl" radius={[8, 8, 4, 4]} fillOpacity={0.95}>
                  {metrics.instrumentProfit.map((item) => (
                    <Cell key={item.symbol} fill={item.pnl >= 0 ? "var(--color-pnl)" : danger} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">Instrument Volume Analysis</CardTitle>
            <CardDescription>Lots/contracts traded per symbol.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              id="instrument-volume"
              config={{ volume: { label: "Volume", color: "var(--chart-2)" } }}
              className="h-[240px]"
            >
              <BarChart data={metrics.instrumentVolume}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="symbol" stroke="var(--border)" />
                <YAxis stroke="var(--border)" />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar dataKey="volume" radius={[8, 8, 4, 4]} fill="var(--color-volume)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">Equity Curve</CardTitle>
          <CardDescription>Session-by-session equity progression.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            id="equity-curve"
            config={{
              equity: { label: "Equity", color: emerald },
            }}
            className="h-[260px]"
          >
            <LineChart
              data={mockAccounts.map((account) => ({
                name: account.label,
                equity: account.balance,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--border)" tick={{ fontSize: 10 }} />
              <YAxis stroke="var(--border)" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
              <Tooltip content={<ChartTooltipContent />} />
              <Line dataKey="equity" stroke="var(--color-equity)" strokeWidth={2.2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

function MetricCard({
  label,
  value,
  prefix,
  suffix,
  precision,
  icon: Icon,
}: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  precision?: number;
  icon?: typeof Gauge;
}) {
  const decimals = typeof precision === "number" ? precision : suffix ? 0 : 2;
  return (
    <Card className="glass-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardDescription>{label}</CardDescription>
          <CardTitle className="text-2xl">
            {prefix}
            {typeof value === "number" ? value.toFixed(decimals) : value}
            {suffix}
          </CardTitle>
        </div>
        {Icon ? <Icon className="size-5 text-emerald-300" /> : null}
      </CardHeader>
    </Card>
  );
}

function ObjectiveCard({
  label,
  description,
  progress,
  detail,
  tone,
}: {
  label: string;
  description: string;
  progress: number;
  detail: string;
  tone: "success" | "info" | "alert";
}) {
  const progressValue = Math.min(100, Math.max(0, progress));
  return (
    <div className="rounded-xl border border-border/60 bg-[rgba(255,255,255,0.02)] p-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold">{label}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <Badge
          variant="outline"
          className={cn(
            tone === "success" ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200" : "",
            tone === "info" ? "border-sky-500/40 bg-sky-500/10 text-sky-100" : "",
            tone === "alert" ? "border-amber-500/40 bg-amber-500/10 text-amber-100" : "",
          )}
        >
          {tone === "success" ? "On Track" : tone === "info" ? "Watch" : "Guardrail"}
        </Badge>
      </div>
      <div className="mt-3 space-y-2">
        <Progress value={progressValue} className="h-2 bg-[rgba(255,255,255,0.06)]" />
        <p className="text-xs text-muted-foreground">{detail}</p>
      </div>
    </div>
  );
}

function WinDonut({ title, winRate, pnl }: { title: string; winRate: number; pnl: number }) {
  const data = [
    { name: "Wins", value: Math.round(winRate * 100), fill: emerald },
    { name: "Losses", value: 100 - Math.round(winRate * 100), fill: "rgba(255,255,255,0.08)" },
  ];
  const chartId = `donut-${title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>Win rate, count, and PnL mix.</CardDescription>
      </CardHeader>
      <CardContent className="relative flex items-center gap-6">
        <ChartContainer id={chartId} config={{ wins: { label: "Win Rate", color: emerald } }} className="h-[220px]">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={80} stroke="none">
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.fill as string} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ChartContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-3xl font-semibold text-emerald-300">{Math.round(winRate * 100)}%</p>
            <p className="text-xs text-muted-foreground">Win Rate</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="rounded-lg border border-border/60 bg-[rgba(255,255,255,0.02)] px-3 py-2 text-sm">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">PnL</p>
            <p className={cn("font-semibold", pnl >= 0 ? "text-emerald-300" : "text-destructive")}>
              {pnl >= 0 ? "+" : "-"}${Math.abs(pnl).toLocaleString()}
            </p>
          </div>
          <Link
            href="/trader/evaluations"
            className="text-xs text-emerald-200 underline-offset-4 hover:text-emerald-100 hover:underline"
          >
            Jump to Evaluation Overview
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

function getDayTone(pnl: number | null) {
  if (pnl === null) return "bg-[rgba(255,255,255,0.02)] text-muted-foreground";
  if (pnl > 0) return "bg-emerald-500/10 text-emerald-200";
  if (pnl < 0) return "bg-destructive/10 text-destructive";
  return "bg-[rgba(255,255,255,0.04)] text-muted-foreground";
}

function buildCalendarCells(days: CalendarDay[]) {
  if (!days.length) return [];
  const firstDate = new Date(days[0].date);
  const year = firstDate.getFullYear();
  const month = firstDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const map = new Map<number, number | null>();
  days.forEach((day) => map.set(new Date(day.date).getDate(), day.pnl));

  const offset = new Date(year, month, 1).getDay();
  const cells: { day: number | null; pnl: number | null }[] = [];
  for (let i = 0; i < offset; i += 1) {
    cells.push({ day: null, pnl: null });
  }
  for (let d = 1; d <= daysInMonth; d += 1) {
    cells.push({ day: d, pnl: map.get(d) ?? null });
  }
  return cells;
}
