import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Configure Velocity CRM preferences and system defaults.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Settings placeholder</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Add toggles for permissions, notifications, and platform integrations here.
        </CardContent>
      </Card>
    </div>
  );
}
