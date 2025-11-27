import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AccountsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Accounts</h1>
        <p className="text-sm text-muted-foreground">
          Manage evaluation and funded accounts, balances, and rule sets.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Accounts table placeholder</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Replace this block with account lists, lifecycle status, and flags.
        </CardContent>
      </Card>
    </div>
  );
}
