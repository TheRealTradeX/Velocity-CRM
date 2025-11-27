export type TraderAccountStatus = "new" | "ongoing" | "passed" | "live" | "archived";

export interface TraderAccount {
  id: string;
  label: string;
  model: "one-step" | "two-step" | "funded";
  phase: string;
  size: number;
  balance: number;
  profitTarget: number;
  profitTargetProgress: number;
  pnl: number;
  pnlPercent: number;
  status: TraderAccountStatus;
  tradingDisabled: boolean;
  awaitingVelocityFunded: boolean;
  isArchived: boolean;
  createdAt: string;
  platform: "tradovate" | "rithmic" | "cqg";
  statusBeforeArchive?: TraderAccountStatus;
}

export const mockAccounts: TraderAccount[] = [
  {
    id: "acc-50k-starter-phase1",
    label: "50K Velocity Starter \u2013 Student",
    model: "one-step",
    phase: "Phase 1",
    size: 50000,
    balance: 49780,
    profitTarget: 2500,
    profitTargetProgress: 0.18,
    pnl: -220,
    pnlPercent: -0.44,
    status: "new",
    tradingDisabled: false,
    awaitingVelocityFunded: false,
    isArchived: false,
    createdAt: "2025-11-18",
    platform: "tradovate",
  },
  {
    id: "acc-100k-starter-phase2",
    label: "100K Velocity Starter \u2013 Pro",
    model: "two-step",
    phase: "Phase 2",
    size: 100000,
    balance: 105700,
    profitTarget: 6000,
    profitTargetProgress: 0.95,
    pnl: 5700,
    pnlPercent: 5.7,
    status: "passed",
    tradingDisabled: false,
    awaitingVelocityFunded: true,
    isArchived: false,
    createdAt: "2025-10-28",
    platform: "cqg",
  },
  {
    id: "acc-150k-funded-master",
    label: "150K Velocity Funded \u2013 Master",
    model: "funded",
    phase: "Live",
    size: 150000,
    balance: 157200,
    profitTarget: 9000,
    profitTargetProgress: 0.85,
    pnl: 7200,
    pnlPercent: 4.8,
    status: "live",
    tradingDisabled: false,
    awaitingVelocityFunded: false,
    isArchived: false,
    createdAt: "2025-10-12",
    platform: "rithmic",
  },
  {
    id: "acc-25k-starter-archived",
    label: "25K Velocity Starter \u2013 Archived",
    model: "one-step",
    phase: "Phase 1",
    size: 25000,
    balance: 24800,
    profitTarget: 1500,
    profitTargetProgress: 0.52,
    pnl: -200,
    pnlPercent: -0.8,
    status: "archived",
    tradingDisabled: true,
    awaitingVelocityFunded: false,
    isArchived: true,
    createdAt: "2025-09-05",
    platform: "tradovate",
  },
];
