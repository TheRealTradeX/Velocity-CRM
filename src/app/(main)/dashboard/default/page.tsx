import type { Metadata } from "next";

import { ChartAreaInteractive } from "./_components/chart-area-interactive";
import { DataTable } from "./_components/data-table";
import data from "./_components/data.json";
import { SectionCards } from "./_components/section-cards";

export const metadata: Metadata = {
  title: "Velocity Intelligence Dashboard (VID) | Velocity CRM",
  description:
    "Internal business intelligence dashboard for Velocity Funds – revenue, visitors, accounts, and growth metrics.",
};

export default function Page() {
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Velocity Intelligence Dashboard (VID)</h1>
        <p className="text-sm text-muted-foreground">
          Real-time revenue, customer, and operational analytics for Velocity Funds.
        </p>
      </div>
      <SectionCards />
      <ChartAreaInteractive />
      <DataTable data={data} />
    </div>
  );
}
