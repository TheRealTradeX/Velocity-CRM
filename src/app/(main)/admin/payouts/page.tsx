import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PayoutsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Payouts</h1>
        <p className="text-sm text-muted-foreground">
          Track requested payouts, approvals, and processing status for funded traders.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Payout queue placeholder</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Surface payout requests, banking details, and release history here.
        </CardContent>
      </Card>
    </div>
  );
}
