import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TradersPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Traders</h1>
        <p className="text-sm text-muted-foreground">
          Directory of Velocity traders with roles, desks, and current evaluation status.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Trader roster placeholder</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Add roster, KYC status, and recent performance snapshots here.
        </CardContent>
      </Card>
    </div>
  );
}
