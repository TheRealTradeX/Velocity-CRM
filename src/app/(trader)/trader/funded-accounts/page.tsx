import type { Metadata } from "next";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const metaDescription = "Velocity Funds trader portal – manage evaluations, funded accounts, payouts, and risk.";

export const metadata: Metadata = {
  title: "Funded Accounts – Velocity Funds",
  description: metaDescription,
};

export default function FundedAccountsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Funded Accounts</h1>
        <p className="text-sm text-muted-foreground">Overview of your funded accounts and allocations.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Funded accounts placeholder</CardTitle>
          <CardDescription>Overview of your funded accounts and allocations.</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Surface funded account balances, allocations, and drawdown buffers here.
        </CardContent>
      </Card>
    </div>
  );
}
