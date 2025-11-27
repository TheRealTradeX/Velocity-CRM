import type { Metadata } from "next";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const metaDescription = "Velocity Funds trader portal – manage evaluations, funded accounts, payouts, and risk.";

export const metadata: Metadata = {
  title: "Payout Requests – Velocity Funds",
  description: metaDescription,
};

export default function PayoutRequestsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Payout Requests</h1>
        <p className="text-sm text-muted-foreground">Request payouts and view payout history.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Payout requests placeholder</CardTitle>
          <CardDescription>Request payouts and view payout history.</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Add payout initiation, eligibility checks, and payment timeline here.
        </CardContent>
      </Card>
    </div>
  );
}
