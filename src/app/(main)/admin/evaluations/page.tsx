import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EvaluationsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Evaluations</h1>
        <p className="text-sm text-muted-foreground">
          Monitor evaluation phases, rule adherence, and readiness for funding.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Evaluation pipeline placeholder</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Plug in evaluation cohorts, phase transitions, and risk notes here.
        </CardContent>
      </Card>
    </div>
  );
}
