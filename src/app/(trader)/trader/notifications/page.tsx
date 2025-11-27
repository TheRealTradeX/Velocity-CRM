import type { Metadata } from "next";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const metaDescription = "Velocity Funds trader portal – manage evaluations, funded accounts, payouts, and risk.";

export const metadata: Metadata = {
  title: "Notifications – Velocity Funds",
  description: metaDescription,
};

export default function NotificationsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Notifications</h1>
        <p className="text-sm text-muted-foreground">System messages, evaluation updates, and payout alerts.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Notifications placeholder</CardTitle>
          <CardDescription>System messages, evaluation updates, and payout alerts.</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Show alerts, system notices, and payout updates here.
        </CardContent>
      </Card>
    </div>
  );
}
