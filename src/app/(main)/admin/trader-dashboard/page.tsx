import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TraderDashboardPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Trader Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          High-level view of trader performance, risk, and compliance signals.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Snapshot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm text-muted-foreground">
            <p>Account status, current balance, and drawdown usage will surface here.</p>
            <p>Replace this placeholder with live trader telemetry.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
