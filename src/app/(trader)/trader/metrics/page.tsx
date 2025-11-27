import type { Metadata } from "next";

import { MetricsRiskClient } from "./_components/metrics-risk-client";

const metaDescription = "Velocity Funds trader portal – monitor funding metrics, risk, and objectives across accounts.";

export const metadata: Metadata = {
  title: "Metrics & Risk – Velocity Funds",
  description: metaDescription,
};

export default function MetricsRiskPage() {
  return (
    <div className="space-y-6">
      <MetricsRiskClient />
    </div>
  );
}
