import type { Metadata } from "next";

import { EvaluationOverviewClient } from "./_components/evaluation-overview-client";

const metaDescription =
  "Velocity Funds trader portal – manage evaluations, funded accounts, payouts, and risk in one place.";

export const metadata: Metadata = {
  title: "Evaluation Overview – Velocity Funds",
  description: metaDescription,
};

export default function EvaluationOverviewPage() {
  return (
    <div className="space-y-6">
      <EvaluationOverviewClient />
    </div>
  );
}
