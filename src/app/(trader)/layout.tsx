"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { Home, Gauge, Wallet2, HandCoins, Bell, Medal, ClipboardList } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navLinks = [
  { href: "/trader", label: "Trader Home", icon: Home },
  { href: "/trader/evaluations", label: "Evaluation Overview", icon: ClipboardList },
  { href: "/trader/funded-accounts", label: "Funded Accounts", icon: Wallet2 },
  { href: "/trader/payouts", label: "Payout Requests", icon: HandCoins },
  { href: "/trader/metrics", label: "Metrics & Risk", icon: Gauge },
  { href: "/trader/certificates", label: "Payout Certificates", icon: Medal },
  { href: "/trader/notifications", label: "Notifications", icon: Bell },
];

const trader = { name: "Jefrey Peralta", email: "trader@velocityfunds.io" };

export default function TraderLayout({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[color:var(--velocity-bg)] text-foreground">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="relative border-border/70 bg-[color:var(--velocity-card)]/80 px-6 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)] lg:w-72 lg:border-r lg:border-border/60">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(52,211,153,0.16),transparent_30%),radial-gradient(circle_at_90%_10%,rgba(14,165,233,0.12),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent)]" />
          <Link href="/trader" className="flex items-center gap-3">
            <div className="bg-emerald-500/20 text-emerald-300 flex size-11 items-center justify-center rounded-full text-lg font-semibold shadow-[0_10px_40px_rgba(52,211,153,0.35)]">
              VF
            </div>
            <div className="leading-tight">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--velocity-muted)]">
                Velocity Funds
              </p>
              <p className="text-lg font-semibold">Trader Portal</p>
            </div>
          </Link>
          <nav className="relative mt-7 space-y-1 text-sm font-medium">
            {navLinks.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "flex items-center gap-2 rounded-lg px-3 py-2 transition-all border border-transparent",
                    "text-[color:var(--velocity-muted)] hover:text-foreground hover:bg-[rgba(255,255,255,0.02)] hover:border-[color:var(--velocity-border)]",
                    isActive ? "border-[color:var(--velocity-accent)]/50 bg-[rgba(52,211,153,0.06)] text-foreground shadow-[0_15px_50px_rgba(52,211,153,0.22)]" : "",
                  ].join(" ")}
                >
                  {Icon ? <Icon className="size-4 text-emerald-300" /> : null}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="flex-1 bg-background">
          <div className="mx-auto w-full max-w-screen-2xl px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-10">
            <div className="mb-4 flex flex-col gap-3 lg:mb-6 lg:flex-row lg:items-center lg:justify-end">
              <div className="flex items-center gap-3 rounded-full border border-border/70 bg-[color:var(--velocity-card)]/90 px-4 py-2 shadow-[0_12px_30px_rgba(0,0,0,0.45)]">
                <div className="text-right leading-tight">
                  <div className="text-sm font-semibold">{trader.name}</div>
                  <div className="text-xs text-muted-foreground">{trader.email}</div>
                </div>
                <Avatar className="size-10">
                  <AvatarFallback className="bg-emerald-500/20 text-emerald-300 text-sm font-semibold">JP</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className="space-y-6">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
