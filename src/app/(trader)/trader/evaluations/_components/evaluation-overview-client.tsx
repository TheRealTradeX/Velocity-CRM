"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ComponentType, type ReactNode } from "react";

import {
  AlertCircle,
  Archive,
  ArrowUpRight,
  Ban,
  CheckCircle2,
  Gauge,
  MoreVertical,
  Sparkles,
  Target,
  Wallet2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { evaluationAccountSizes, evaluationModels, evaluationPlatforms } from "@/config/evaluations";
import { TraderAccount, mockAccounts } from "@/data/mockAccounts";
import { cn } from "@/lib/utils";

const modelLabels = evaluationModels.reduce<Record<string, string>>(
  (acc, model) => ({ ...acc, [model.value]: model.label }),
  {},
);
const platformLabels = evaluationPlatforms.reduce<Record<string, string>>(
  (acc, platform) => ({ ...acc, [platform.value]: platform.label }),
  {},
);
const sizeLabels = evaluationAccountSizes.reduce<Record<number, string>>(
  (acc, size) => ({ ...acc, [size.value]: size.label }),
  {},
);

export function EvaluationOverviewClient() {
  const [accounts, setAccounts] = useState<TraderAccount[]>(mockAccounts);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"compact" | "expanded">("expanded");
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    if (!selectedAccountId) {
      const firstActive = accounts.find((account) => !account.isArchived) ?? accounts[0];
      if (firstActive) {
        setSelectedAccountId(firstActive.id);
      }
      return;
    }

    const selected = accounts.find((account) => account.id === selectedAccountId);
    if (!selected) {
      setSelectedAccountId(null);
      return;
    }

    if (selected.isArchived && !showArchived) {
      const nextActive = accounts.find((account) => !account.isArchived);
      setSelectedAccountId(nextActive?.id ?? null);
    }
  }, [accounts, selectedAccountId, showArchived]);

  const selectedAccount = useMemo(
    () => accounts.find((account) => account.id === selectedAccountId) ?? null,
    [accounts, selectedAccountId],
  );

  const visibleAccounts = useMemo(
    () => accounts.filter((account) => (showArchived ? true : !account.isArchived)),
    [accounts, showArchived],
  );

  const archiveCounts = useMemo(
    () => ({
      active: accounts.filter((account) => !account.isArchived).length,
      archived: accounts.filter((account) => account.isArchived).length,
    }),
    [accounts],
  );

  const handleArchiveToggle = (id: string) => {
    setAccounts((prev) =>
      prev.map((account) => {
        if (account.id !== id) return account;
        if (account.isArchived) {
          return {
            ...account,
            isArchived: false,
            status: account.statusBeforeArchive ?? (account.status === "archived" ? "ongoing" : account.status),
            statusBeforeArchive: undefined,
          };
        }
        return {
          ...account,
          isArchived: true,
          statusBeforeArchive: account.status,
          status: "archived",
        };
      }),
    );
  };

  const handleSelectAccount = (id: string) => {
    setSelectedAccountId(id);
  };

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--velocity-muted)]">
            Velocity Funds
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">Evaluation Overview</h1>
          <p className="text-sm text-muted-foreground">
            Toggle compact or expanded cards, archive old accounts, and drill into Metrics &amp; Risk.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Badge variant="outline" className="border-[color:var(--velocity-border)] bg-[rgba(255,255,255,0.03)]">
            Active {archiveCounts.active}
          </Badge>
          <Badge variant="outline" className="border-[color:var(--velocity-border)] bg-[rgba(255,255,255,0.03)]">
            Archived {archiveCounts.archived}
          </Badge>
          <Button
            asChild
            size="sm"
            className="bg-[linear-gradient(120deg,#34d399,#22d3ee)] text-black hover:shadow-[0_16px_42px_rgba(52,211,153,0.35)]"
          >
            <Link href="/trader/new-challenge" className="flex items-center gap-2">
              <Sparkles className="size-4" />
              Start New Evaluation
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-5">
          <div className="glass-card flex flex-wrap items-center justify-between gap-3 p-4">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--velocity-muted)]">View</p>
              <p className="text-sm text-muted-foreground">Switch between compact and expanded FT-style cards.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                size="sm"
                variant={viewMode === "compact" ? "secondary" : "ghost"}
                className={cn(
                  "border border-border/70 px-3",
                  viewMode === "compact" ? "bg-emerald-500/10 text-emerald-200" : "",
                )}
                onClick={() => setViewMode("compact")}
              >
                Compact View
              </Button>
              <Button
                size="sm"
                variant={viewMode === "expanded" ? "secondary" : "ghost"}
                className={cn(
                  "border border-border/70 px-3",
                  viewMode === "expanded" ? "bg-emerald-500/10 text-emerald-200" : "",
                )}
                onClick={() => setViewMode("expanded")}
              >
                Expanded View
              </Button>
              <Separator orientation="vertical" className="h-8 bg-border/70" />
              <div className="flex items-center gap-2">
                <Switch id="show-archived" checked={showArchived} onCheckedChange={(checked) => setShowArchived(!!checked)} />
                <LabelMini htmlFor="show-archived">Show Archived</LabelMini>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {visibleAccounts.map((account) => (
              <AccountCard
                key={account.id}
                account={account}
                viewMode={viewMode}
                onSelect={handleSelectAccount}
                selected={account.id === selectedAccountId}
                onToggleArchive={handleArchiveToggle}
              />
            ))}
          </div>
        </div>

        <div className="lg:col-span-7">
          {!selectedAccount ? (
            <Card className="glass-card h-full min-h-[360px] border-dashed border-emerald-500/40">
              <CardHeader className="items-center text-center">
                <div className="bg-emerald-500/10 text-emerald-300 mb-3 flex size-12 items-center justify-center rounded-full shadow-[0_15px_50px_rgba(52,211,153,0.3)]">
                  <Gauge className="size-6" />
                </div>
                <CardTitle className="text-xl">Select an account to view details</CardTitle>
                <CardDescription className="max-w-md">
                  Choose an evaluation or funded account from the list to see detailed performance and rule stats.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Button
                  asChild
                  variant="default"
                  className="bg-[linear-gradient(120deg,#34d399,#22d3ee)] text-black hover:shadow-[0_18px_50px_rgba(52,211,153,0.32)]"
                >
                  <Link href="/trader/new-challenge">Get Funded</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <AccountDetailPanel account={selectedAccount} />
          )}
        </div>
      </div>
    </>
  );
}

function AccountCard({
  account,
  selected,
  viewMode,
  onSelect,
  onToggleArchive,
}: {
  account: TraderAccount;
  selected: boolean;
  viewMode: "compact" | "expanded";
  onSelect: (id: string) => void;
  onToggleArchive: (id: string) => void;
}) {
  const profitTargetPercent = Math.round(account.profitTargetProgress * 100);
  const pnlPositive = account.pnl >= 0;

  const statusLabel: Record<TraderAccount["status"], string> = {
    new: "New",
    ongoing: "Ongoing",
    passed: "Passed",
    live: "Live",
    archived: "Archived",
  };

  return (
    <Card
      className={cn(
        "glass-card cursor-pointer transition-all",
        selected ? "border-[color:var(--velocity-accent)]/60 shadow-[0_18px_50px_rgba(52,211,153,0.28)]" : "",
        account.isArchived ? "opacity-75" : "",
      )}
      onClick={() => onSelect(account.id)}
    >
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Badge
              variant="outline"
              className="border-[color:var(--velocity-border)] bg-[rgba(255,255,255,0.03)] text-[color:var(--velocity-muted)]"
            >
              {modelLabels[account.model] ?? account.model}
            </Badge>
            <span className="text-[color:var(--velocity-muted)]">{account.phase}</span>
            {account.isArchived ? <Badge variant="outline">Archived</Badge> : null}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold">{account.label}</p>
            <Badge variant="outline" className={statusBadge(account.status, account.isArchived)}>
              {statusLabel[account.status]}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            {sizeLabels[account.size] ?? `$${account.size.toLocaleString()}`} ·{" "}
            {platformLabels[account.platform] ?? account.platform}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-foreground">
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem
              onClick={(event) => {
                event.stopPropagation();
                onToggleArchive(account.id);
              }}
            >
              <Archive className="mr-2 size-4" />
              {account.isArchived ? "Unarchive account" : "Archive account"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Balance</span>
          <span className="font-semibold">${account.balance.toLocaleString()}</span>
        </div>
        {viewMode === "expanded" ? (
          <>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Profit Target</span>
              <span className="text-xs text-muted-foreground">
                {profitTargetPercent}% of ${account.profitTarget.toLocaleString()}
              </span>
            </div>
            <Progress value={profitTargetPercent} className="h-2 bg-[rgba(255,255,255,0.06)]" />
          </>
        ) : null}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">P&amp;L</span>
          <span className={cn("font-semibold", pnlPositive ? "text-emerald-300" : "text-destructive")}>
            {pnlPositive ? "+" : "-"}${Math.abs(account.pnl).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Profit %</span>
          <span className={cn("font-semibold", pnlPositive ? "text-emerald-300" : "text-destructive")}>
            {pnlPositive ? "+" : ""}
            {account.pnlPercent}%
          </span>
        </div>
        {viewMode === "expanded" ? (
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Created</span>
            <span>{new Date(account.createdAt).toLocaleDateString()}</span>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

function AccountDetailPanel({ account }: { account: TraderAccount }) {
  const profitTargetPercent = Math.round(account.profitTargetProgress * 100);
  const pnlPositive = account.pnl >= 0;

  const banners = [
    account.tradingDisabled
      ? {
          tone: "warning" as const,
          icon: Ban,
          text: "Trading Disabled \u2013 Trading is currently disabled for this account.",
        }
      : null,
    account.awaitingVelocityFunded
      ? {
          tone: "info" as const,
          icon: AlertCircle,
          text: "Phase Two Pending \u2013 Your VelocityFunded account is being prepared.",
        }
      : null,
  ].filter(Boolean) as { tone: "warning" | "info"; icon: ComponentType<{ className?: string }>; text: string }[];

  return (
    <Card className="glass-card h-full min-h-[380px]">
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle className="text-lg">{account.label}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Badge variant="outline" className="border-[color:var(--velocity-border)]">
                {modelLabels[account.model] ?? account.model}
              </Badge>
              <span className="text-muted-foreground">{account.phase}</span>
            </CardDescription>
          </div>
          <Badge variant="outline" className={statusBadge(account.status, account.isArchived)}>
            {account.status === "archived" ? "Archived" : account.status === "live" ? "Live" : "In Progress"}
          </Badge>
        </div>

        {banners.length ? (
          <div className="space-y-2">
            {banners.map((banner, idx) => {
              const Icon = banner.icon;
              return (
                <div
                  key={`${banner.text}-${idx}`}
                  className={cn(
                    "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm",
                    banner.tone === "warning"
                      ? "border-amber-500/40 bg-amber-500/10 text-amber-100"
                      : "border-emerald-500/30 bg-emerald-500/10 text-emerald-100",
                  )}
                >
                  <Icon className="size-4" />
                  <span>{banner.text}</span>
                </div>
              );
            })}
          </div>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <InfoStat label="Account Size" value={sizeLabels[account.size] ?? `$${account.size.toLocaleString()}`} />
          <InfoStat label="Platform" value={platformLabels[account.platform] ?? account.platform} />
          <InfoStat label="Balance" value={`$${account.balance.toLocaleString()}`} icon={Wallet2} />
          <InfoStat
            label="P&L"
            value={`${pnlPositive ? "+" : "-"}$${Math.abs(account.pnl).toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
            icon={Gauge}
            accent={pnlPositive ? "positive" : "negative"}
          />
          <InfoStat
            label="Profit %"
            value={`${pnlPositive ? "+" : ""}${account.pnlPercent}%`}
            accent={pnlPositive ? "positive" : "negative"}
          />
          <InfoStat label="Created" value={new Date(account.createdAt).toLocaleDateString()} />
        </div>

        <div className="space-y-3 rounded-xl border border-border/70 bg-[rgba(255,255,255,0.02)] p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Profit Target</span>
            <span className="text-muted-foreground">
              {profitTargetPercent}% of ${account.profitTarget.toLocaleString()}
            </span>
          </div>
          <Progress value={profitTargetPercent} className="h-2 bg-[rgba(255,255,255,0.06)]" />
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <SmallStat label="Status" value={account.status === "archived" ? "Archived" : "Active"} icon={CheckCircle2} />
          <SmallStat
            label="Next Step"
            value={account.status === "passed" ? "Funded Upgrade" : "Stay Consistent"}
            icon={Target}
          />
          <SmallStat label="Risk" value={account.tradingDisabled ? "Disabled" : "Enabled"} icon={Ban} />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground">
            View the Metrics &amp; Risk dashboard with FundingTicks-style analytics.
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" asChild className="border-emerald-500/50 text-emerald-200 hover:bg-emerald-500/10">
              <Link href={`/trader/metrics?accountId=${account.id}`} className="flex items-center gap-2">
                View Metrics &amp; Risk <ArrowUpRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" className="bg-emerald-500/15 text-emerald-100 hover:bg-emerald-500/25">
              <Link href="/trader/new-challenge">Start New Evaluation</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function InfoStat({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string;
  icon?: ComponentType<{ className?: string }>;
  accent?: "positive" | "negative";
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border/60 bg-[rgba(255,255,255,0.02)] px-3 py-3">
      <div className="space-y-0.5">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
        <p
          className={cn(
            "text-base font-semibold",
            accent === "positive" ? "text-emerald-300" : "",
            accent === "negative" ? "text-destructive" : "",
          )}
        >
          {value}
        </p>
      </div>
      {Icon ? <Icon className="size-4 text-muted-foreground" /> : null}
    </div>
  );
}

function SmallStat({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-[rgba(255,255,255,0.02)] px-3 py-2">
      <div className="rounded-full bg-[rgba(52,211,153,0.1)] p-2 text-emerald-200">
        <Icon className="size-4" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}

function statusBadge(status: TraderAccount["status"], archived: boolean) {
  if (archived || status === "archived") {
    return "border-border/60 bg-[rgba(255,255,255,0.04)] text-muted-foreground";
  }
  if (status === "passed" || status === "live") {
    return "border-emerald-500/40 bg-emerald-500/10 text-emerald-200";
  }
  return "border-blue-500/40 bg-blue-500/10 text-blue-100";
}

function LabelMini({ children, htmlFor }: { children: ReactNode; htmlFor: string }) {
  return (
    <label htmlFor={htmlFor} className="text-xs text-muted-foreground">
      {children}
    </label>
  );
}
