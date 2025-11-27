export type EvaluationModelValue = "one-step" | "two-step" | "funded";

export interface EvaluationModel {
  value: EvaluationModelValue;
  label: string;
  description: string;
  badge?: string;
  comingSoon?: boolean;
}

export interface AccountSizeOption {
  value: number;
  label: string;
  basePrice: number;
}

export interface PlatformOption {
  value: "tradovate" | "rithmic" | "cqg";
  label: string;
  note?: string;
}

export const evaluationModels: EvaluationModel[] = [
  {
    value: "one-step",
    label: "Velocity Starter",
    description: "One-phase evaluation with trailing loss, daily guardrails, and quick funded upgrades.",
    badge: "Fast Track",
  },
  {
    value: "two-step",
    label: "Sim-Funded",
    description: "Two-step path mirroring our FT ruleset for traders who want the classic progression.",
    comingSoon: true,
  },
  {
    value: "funded",
    label: "Velocity Funded",
    description: "Live trading with scaling, payouts, and Velocity-funded risk coverage.",
  },
];

export const evaluationAccountSizes: AccountSizeOption[] = [
  { value: 25000, label: "$25,000", basePrice: 85 },
  { value: 50000, label: "$50,000", basePrice: 155 },
  { value: 100000, label: "$100,000", basePrice: 230 },
  { value: 150000, label: "$150,000", basePrice: 330 },
];

export const evaluationPlatforms: PlatformOption[] = [
  { value: "tradovate", label: "Tradovate", note: "Modern futures DOM, web, and mobile." },
  { value: "rithmic", label: "Rithmic", note: "Low-latency connectivity for active futures scalpers." },
  { value: "cqg", label: "CQG", note: "Desktop and mobile support with rich analytics." },
];

export const evaluationBasePrices: Record<number, number> = evaluationAccountSizes.reduce(
  (acc, size) => ({ ...acc, [size.value]: size.basePrice }),
  {},
);

export const VELOCITY_EVALUATION_CONFIG = {
  models: evaluationModels,
  accountSizes: evaluationAccountSizes,
  platforms: evaluationPlatforms,
  pricing: evaluationBasePrices,
};
