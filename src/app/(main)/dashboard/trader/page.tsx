import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Trader Dashboard | Velocity Funds",
  description: "Performance, risk, and rules for your Velocity Funds account.",
}

const mockSummary = {
  accountId: "VF-50K-00123",
  status: "Funded",
  startingBalance: 50000,
  currentBalance: 53120,
  totalPnl: 3120,
  todayPnl: 480,
  maxDailyLoss: 1500,
  dailyLossUsed: 320,
  maxDrawdown: 2500,
  drawdownUsed: 380,
  daysTraded: 12,
  minDaysRequired: 5,
  winRate: 78,
}

const mockDaily = [
  { date: "2025-11-17", pnl: 620, winRate: 80, contracts: 12, maxDd: -190, note: "Clean trend, no rule hits" },
  { date: "2025-11-18", pnl: 410, winRate: 75, contracts: 10, maxDd: -220, note: "Minor pullback, within DD" },
  { date: "2025-11-19", pnl: 540, winRate: 82, contracts: 14, maxDd: -160, note: "London + NY session" },
  { date: "2025-11-20", pnl: 1070, winRate: 79, contracts: 18, maxDd: -210, note: "Best day this cycle" },
  { date: "2025-11-21", pnl: 480, winRate: 76, contracts: 9, maxDd: -130, note: "Short morning session" },
]

function formatCurrency(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  })
}

export default function TraderDashboardPage() {
  const ddRemaining = mockSummary.maxDrawdown - mockSummary.drawdownUsed
  const dailyLossRemaining = mockSummary.maxDailyLoss - mockSummary.dailyLossUsed

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Trader Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Velocity Funds account overview — performance, risk, and rules in one place.
        </p>
      </div>

      {/* KPI row */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Account</CardTitle>
            <Badge variant="outline" className="text-xs">
              {mockSummary.status}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-semibold">{mockSummary.accountId}</div>
            <p className="mt-1 text-xs text-muted-foreground">
              {mockSummary.daysTraded} / {mockSummary.minDaysRequired} min days traded
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(mockSummary.currentBalance)}</div>
            <p className="mt-1 text-xs text-muted-foreground">
              Started at {formatCurrency(mockSummary.startingBalance)} · PnL{" "}
              <span className={cn(mockSummary.totalPnl >= 0 ? "text-emerald-500" : "text-red-500")}>
                {formatCurrency(mockSummary.totalPnl)}
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today&apos;s PnL</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={cn(
                "text-2xl font-bold",
                mockSummary.todayPnl >= 0 ? "text-emerald-500" : "text-red-500",
              )}
            >
              {formatCurrency(mockSummary.todayPnl)}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Daily loss remaining:{" "}
              <span className={dailyLossRemaining > 0 ? "text-emerald-500" : "text-red-500"}>
                {formatCurrency(dailyLossRemaining)}
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Max drawdown: {formatCurrency(mockSummary.maxDrawdown)}
            </p>
            <p className="text-xs text-muted-foreground">
              Used: {formatCurrency(mockSummary.drawdownUsed)}
            </p>
            <p className="mt-1 text-xs">
              DD remaining:{" "}
              <span className={ddRemaining > 0 ? "text-emerald-500" : "text-red-500"}>
                {formatCurrency(ddRemaining)}
              </span>
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Win rate: <span className="font-medium">{mockSummary.winRate}%</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="equity" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="equity">Equity Curve</TabsTrigger>
          <TabsTrigger value="rules">Rules</TabsTrigger>
          <TabsTrigger value="daily">Daily Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="equity" className="mt-4">
          <Card className="h-72">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Equity Curve (placeholder)</CardTitle>
            </CardHeader>
            <CardContent className="flex h-full items-center justify-center">
              <p className="text-sm text-muted-foreground">
                Later we’ll plug in a real chart from your backend data.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Evaluation Rules Snapshot</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Target:</span> 6% net profit (example)
                </p>
                <p>
                  <span className="font-medium">Min trading days:</span>{" "}
                  {mockSummary.minDaysRequired} · currently {mockSummary.daysTraded}
                </p>
                <p>
                  <span className="font-medium">Max daily loss:</span>{" "}
                  {formatCurrency(mockSummary.maxDailyLoss)}
                </p>
                <p>
                  <span className="font-medium">Max overall drawdown:</span>{" "}
                  {formatCurrency(mockSummary.maxDrawdown)}
                </p>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>This should mirror the official Velocity Funds rulebook.</p>
                <p>Later: automatic flags when rules are broken.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="daily" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Daily Performance</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-border text-xs text-muted-foreground">
                  <tr>
                    <th className="py-2 pr-4">Date</th>
                    <th className="py-2 pr-4">Net PnL</th>
                    <th className="py-2 pr-4">Win rate</th>
                    <th className="py-2 pr-4">Contracts</th>
                    <th className="py-2 pr-4">Max DD</th>
                    <th className="py-2 pr-4">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {mockDaily.map((day) => (
                    <tr key={day.date} className="border-b border-border/50 last:border-0">
                      <td className="py-2 pr-4 align-top">{day.date}</td>
                      <td
                        className={cn(
                          "py-2 pr-4 align-top font-medium",
                          day.pnl >= 0 ? "text-emerald-500" : "text-red-500",
                        )}
                      >
                        {formatCurrency(day.pnl)}
                      </td>
                      <td className="py-2 pr-4 align-top">{day.winRate}%</td>
                      <td className="py-2 pr-4 align-top">{day.contracts}</td>
                      <td className="py-2 pr-4 align-top">{formatCurrency(day.maxDd)}</td>
                      <td className="py-2 pr-4 align-top text-xs text-muted-foreground">{day.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
