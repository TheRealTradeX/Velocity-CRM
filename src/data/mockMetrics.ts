export interface MetricsOverview {
  avgWin: number;
  avgLoss: number;
  winRate: number;
  profitFactor: number;
}

export interface CalendarDay {
  date: string;
  pnl: number | null;
}

export interface WeeklySummary {
  label: string;
  range: string;
  pnl: number;
  trades: number;
}

export interface AccountMetrics {
  accountId: string;
  metricsOverview: MetricsOverview;
  tradingObjectives: {
    profitableDays: { required: number; completed: number };
    trailingLoss: { startingEquity: number; remainingBuffer: number };
    hftProfit: { value: number; passed: boolean };
    maxDailyLoss: { limit: number; current: number };
  };
  calendarMonth: { monthLabel: string; days: CalendarDay[] };
  weeklySummaries: WeeklySummary[];
  shortLongAnalysis: {
    short: { wins: number; winRate: number; pnl: number };
    long: { wins: number; winRate: number; pnl: number };
  };
  pnlDistributionByDuration: { bucket: string; pnl: number }[];
  pnlByTradeDuration: { id: string; label: string; durationSeconds: number; pnl: number }[];
  instrumentProfit: { symbol: string; pnl: number }[];
  instrumentVolume: { symbol: string; volume: number }[];
}

const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" });

function deterministicNumber(seed: number, min: number, max: number) {
  const normalized = Math.abs(Math.sin(seed * 17.23) + Math.cos(seed * 3.7)) % 1;
  return Math.round(min + (max - min) * normalized);
}

function generateWeekdayPnL(seed: number, index: number) {
  const base = deterministicNumber(seed + index, 180, 820);
  return base;
}

function generateCalendar(seed: number): { monthLabel: string; days: CalendarDay[] } {
  const today = new Date();
  const monthLabel = monthFormatter.format(today);
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: CalendarDay[] = [];

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay();
    const iso = date.toISOString().split("T")[0];
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      days.push({ date: iso, pnl: null });
      continue;
    }
    const pnl = generateWeekdayPnL(seed, day);
    days.push({ date: iso, pnl });
  }

  return { monthLabel, days };
}

function summarizeWeeks(calendar: { monthLabel: string; days: CalendarDay[] }): WeeklySummary[] {
  const summaries: WeeklySummary[] = [];
  let weekIndex = 0;
  let cursor = 0;
  while (cursor < calendar.days.length) {
    const slice = calendar.days.slice(cursor, cursor + 7);
    const startDate = slice.find((d) => d.date)?.date;
    const endDate = slice.filter((d) => d.date).at(-1)?.date;
    const pnl = slice.reduce((acc, day) => (day.pnl ?? 0) + acc, 0);
    const trades = slice.filter((day) => typeof day.pnl === "number").length * 2;
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const range = `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} \u2013 ${end.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
      summaries.push({
        label: `Week ${weekIndex + 1}`,
        range,
        pnl,
        trades,
      });
    }
    weekIndex += 1;
    cursor += 7;
  }
  return summaries;
}

function baseMetrics(seed: number): Omit<AccountMetrics, "accountId" | "calendarMonth" | "weeklySummaries"> {
  return {
    metricsOverview: {
      avgWin: 320 + deterministicNumber(seed, 10, 120),
      avgLoss: -1 * (60 + deterministicNumber(seed, 5, 45)),
      winRate: 0.6 + deterministicNumber(seed, 1, 10) / 100,
      profitFactor: 6 + deterministicNumber(seed, 1, 30) / 10,
    },
    tradingObjectives: {
      profitableDays: { required: 10, completed: 7 + (seed % 3) },
      trailingLoss: { startingEquity: 150000 + seed * 5000, remainingBuffer: 5000 + seed * 400 },
      hftProfit: { value: 0.6 + (seed % 3) * 0.08, passed: true },
      maxDailyLoss: { limit: 4500 + seed * 200, current: 900 + seed * 80 },
    },
    shortLongAnalysis: {
      short: { wins: 12 + seed * 2, winRate: 0.58 + seed * 0.03, pnl: 2800 + seed * 250 },
      long: { wins: 15 + seed * 2, winRate: 0.64 + seed * 0.02, pnl: 3400 + seed * 180 },
    },
    pnlDistributionByDuration: [
      { bucket: "<30s", pnl: -80 - seed * 10 },
      { bucket: "30s\u20131m", pnl: 420 + seed * 40 },
      { bucket: "1\u20132m", pnl: 760 + seed * 60 },
      { bucket: "2\u20133m", pnl: 530 + seed * 35 },
      { bucket: ">3m", pnl: 120 + seed * 10 },
    ],
    pnlByTradeDuration: [
      { id: `t1-${seed}`, label: "T1", durationSeconds: 35, pnl: 180 + seed * 20 },
      { id: `t2-${seed}`, label: "T2", durationSeconds: 65, pnl: 320 + seed * 30 },
      { id: `t3-${seed}`, label: "T3", durationSeconds: 95, pnl: 510 + seed * 25 },
      { id: `t4-${seed}`, label: "T4", durationSeconds: 140, pnl: -120 + seed * 15 },
      { id: `t5-${seed}`, label: "T5", durationSeconds: 190, pnl: 720 + seed * 40 },
      { id: `t6-${seed}`, label: "T6", durationSeconds: 240, pnl: 160 + seed * 18 },
      { id: `t7-${seed}`, label: "T7", durationSeconds: 300, pnl: 40 + seed * 12 },
    ],
    instrumentProfit: [
      { symbol: "NQZ5", pnl: 3200 + seed * 220 },
      { symbol: "MNQZ5", pnl: 980 + seed * 80 },
      { symbol: "ESZ5", pnl: 1440 + seed * 120 },
      { symbol: "CLZ5", pnl: 120 + seed * 40 },
    ],
    instrumentVolume: [
      { symbol: "NQZ5", volume: 30 + seed * 6 },
      { symbol: "MNQZ5", volume: 24 + seed * 4 },
      { symbol: "ESZ5", volume: 18 + seed * 3 },
      { symbol: "CLZ5", volume: 14 + seed * 2 },
    ],
  };
}

const accountSeeds: Record<string, number> = {
  "acc-50k-starter-phase1": 1,
  "acc-100k-starter-phase2": 2,
  "acc-150k-funded-master": 3,
  "acc-25k-starter-archived": 4,
};

function buildAccountMetrics(accountId: string): AccountMetrics {
  const seed = accountSeeds[accountId] ?? 1;
  const calendarMonth = generateCalendar(seed);
  const weeklySummaries = summarizeWeeks(calendarMonth);
  return {
    accountId,
    calendarMonth,
    weeklySummaries,
    ...baseMetrics(seed),
  };
}

const defaultAccountId = "acc-50k-starter-phase1";

export const accountMetrics: Record<string, AccountMetrics> = Object.keys(accountSeeds).reduce((acc, id) => {
  acc[id] = buildAccountMetrics(id);
  return acc;
}, {} as Record<string, AccountMetrics>);

export function getMetricsForAccount(accountId?: string): AccountMetrics {
  const key = accountId && accountMetrics[accountId] ? accountId : defaultAccountId;
  return accountMetrics[key] ?? accountMetrics[defaultAccountId];
}

// Backwards compatibility exports for any legacy imports.
export const metricsOverview = accountMetrics[defaultAccountId].metricsOverview;
export const tradingObjectives = accountMetrics[defaultAccountId].tradingObjectives;
export const calendarMonth = accountMetrics[defaultAccountId].calendarMonth;
export const weeklySummaries = accountMetrics[defaultAccountId].weeklySummaries;
export const shortLongAnalysis = accountMetrics[defaultAccountId].shortLongAnalysis;
export const pnlDistributionByDuration = accountMetrics[defaultAccountId].pnlDistributionByDuration;
export const pnlByTradeDuration = accountMetrics[defaultAccountId].pnlByTradeDuration;
export const instrumentProfit = accountMetrics[defaultAccountId].instrumentProfit;
export const instrumentVolume = accountMetrics[defaultAccountId].instrumentVolume;
