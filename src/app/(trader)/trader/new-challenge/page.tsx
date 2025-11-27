"use client";

import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { evaluationAccountSizes, evaluationModels, evaluationPlatforms } from "@/config/evaluations";

export default function NewChallengePage() {
  const [selectedModel, setSelectedModel] = useState<string>(evaluationModels[0]?.value ?? "one-step");
  const [selectedSize, setSelectedSize] = useState<number>(evaluationAccountSizes[2]?.value ?? 100000);
  const [selectedPlatform, setSelectedPlatform] = useState<string>(evaluationPlatforms[0]?.value ?? "tradovate");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const basePrice = useMemo(
    () => evaluationAccountSizes.find((size) => size.value === selectedSize)?.basePrice ?? 230,
    [selectedSize],
  );
  const discount = 0;
  const total = basePrice - discount;

  const handleSubmit = () => {
    console.log("New challenge selection:", {
      model: selectedModel,
      size: selectedSize,
      platform: selectedPlatform,
      acceptedTerms,
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--velocity-muted)]">
          VelocityFunds.io
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Start New Evaluation</h1>
        <p className="text-sm text-muted-foreground">
          Configure your Velocity Starter or Velocity Funded account, then proceed to checkout.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Model</CardTitle>
              <CardDescription>Select your evaluation model.</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedModel} onValueChange={setSelectedModel} className="grid gap-3">
                {evaluationModels.map((option) => (
                  <label
                    key={option.value}
                    className={[
                      "flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors",
                      selectedModel === option.value
                        ? "border-emerald-500/60 bg-emerald-500/5"
                        : "border-border/70 hover:bg-accent/10",
                      option.comingSoon ? "cursor-not-allowed opacity-60" : "",
                    ].join(" ")}
                  >
                    <RadioGroupItem
                      value={option.value}
                      disabled={option.comingSoon}
                      className="mt-1"
                      aria-label={option.label}
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{option.label}</span>
                        {option.badge ? (
                          <Badge variant="outline" className="border-emerald-500/40 text-emerald-200">
                            {option.badge}
                          </Badge>
                        ) : null}
                        {option.comingSoon ? (
                          <Badge variant="outline" className="border-border/60 text-muted-foreground">
                            Coming soon
                          </Badge>
                        ) : null}
                      </div>
                      {option.description ? (
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      ) : null}
                    </div>
                  </label>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Account Size</CardTitle>
              <CardDescription>Choose your evaluation account notional.</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={String(selectedSize)}
                onValueChange={(value) => setSelectedSize(Number(value))}
                className="grid gap-3 sm:grid-cols-2"
              >
                {evaluationAccountSizes.map((option) => (
                  <label
                    key={option.value}
                    className={[
                      "flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors",
                      selectedSize === option.value
                        ? "border-emerald-500/60 bg-emerald-500/5"
                        : "border-border/70 hover:bg-accent/10",
                    ].join(" ")}
                  >
                    <div className="space-y-1">
                      <span className="font-semibold">{option.label}</span>
                      <p className="text-xs text-muted-foreground">SIM evaluation with rule-based payout eligibility.</p>
                    </div>
                    <RadioGroupItem value={String(option.value)} aria-label={option.label} />
                  </label>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Trading Platform</CardTitle>
              <CardDescription>Select your preferred execution venue.</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedPlatform}
                onValueChange={setSelectedPlatform}
                className="grid gap-3 sm:grid-cols-2"
              >
                {evaluationPlatforms.map((option) => (
                  <label
                    key={option.value}
                    className={[
                      "flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors",
                      selectedPlatform === option.value
                        ? "border-emerald-500/60 bg-emerald-500/5"
                        : "border-border/70 hover:bg-accent/10",
                    ].join(" ")}
                  >
                    <div className="space-y-1">
                      <span className="font-semibold">{option.label}</span>
                      <p className="text-xs text-muted-foreground">{option.note ?? "Low-latency futures execution."}</p>
                    </div>
                    <RadioGroupItem value={option.value} aria-label={option.label} />
                  </label>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4">
          <Card className="glass-card sticky top-4">
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
              <CardDescription>Review your evaluation setup.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 rounded-lg border border-border/70 bg-card/60 p-3">
                <SummaryRow
                  label="Model"
                  value={evaluationModels.find((m) => m.value === selectedModel)?.label || ""}
                />
                <SummaryRow
                  label="Account Size"
                  value={evaluationAccountSizes.find((s) => s.value === selectedSize)?.label || ""}
                />
                <SummaryRow
                  label="Platform"
                  value={evaluationPlatforms.find((p) => p.value === selectedPlatform)?.label || ""}
                />
              </div>

              <div className="space-y-2">
                <SummaryRow label="Base Price" value={`$${basePrice.toFixed(2)}`} />
                <SummaryRow label="Discount" value={`-$${discount.toFixed(2)}`} />
                <div className="flex items-center justify-between border-t border-border/60 pt-3">
                  <span className="text-sm font-semibold">Total</span>
                  <span className="text-xl font-semibold text-emerald-300">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Checkbox
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(Boolean(checked))}
                  className="mt-0.5"
                />
                <Label htmlFor="terms" className="text-sm leading-snug text-muted-foreground">
                  I agree with the Terms of Use and Evaluation Rules.
                </Label>
              </div>

              <Button
                className="w-full bg-emerald-500 text-emerald-950 hover:bg-emerald-500/90"
                disabled={!acceptedTerms}
                onClick={handleSubmit}
              >
                Continue to Payment
              </Button>
              <p className="text-center text-xs text-muted-foreground">Pricing is mirrored from VelocityFunds.io.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
