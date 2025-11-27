import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RiskOverviewPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Risk Overview</h1>
        <p className="text-sm text-muted-foreground">
          Portfolio-level risk view for Velocity Funds - exposures, limits, and alerts.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Risk dashboard placeholder</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Add drawdown breaches, daily loss monitors, and alerting widgets here.
        </CardContent>
      </Card>
    </div>
  );
}
