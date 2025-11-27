import type { Metadata } from "next";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const metaDescription = "Velocity Funds trader portal – manage evaluations, funded accounts, payouts, and risk.";

export const metadata: Metadata = {
  title: "Payout Certificates – Velocity Funds",
  description: metaDescription,
};

export default function PayoutCertificatesPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Payout Certificates</h1>
        <p className="text-sm text-muted-foreground">Download your official payout certificates.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Payout certificates placeholder</CardTitle>
          <CardDescription>Download your official payout certificates.</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Provide certificate downloads and verification details here.
        </CardContent>
      </Card>
    </div>
  );
}
