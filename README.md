# Velocity CRM – Admin Dashboard for Velocity Funds

Velocity CRM is the internal-facing admin dashboard for **Velocity Funds**, a futures prop firm and capital allocation company.

This app is used by the Velocity team to:

- Monitor trader performance and risk
- Review evaluation accounts and funded accounts
- Track daily PnL, win rate, and drawdown
- Manage payouts, compliance, and internal operations

It is **not** the public marketing site or trader-facing landing page – it’s the internal “command center” for Velocity Funds.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **UI Library:** React
- **Design System:** shadcn/ui
- **Styling:** Tailwind CSS
- **State / Data:** React hooks + server components (Next.js conventions)
- **Build Tooling:** Turbopack, ESLint, Prettier

---

## Features

### Dashboards

- **Trader Dashboard**
  - Account summary (status, account id)
  - Current balance and total PnL
  - Today’s PnL and remaining daily loss
  - Drawdown usage and remaining risk
  - Tabs for:
    - Equity Curve (chart placeholder)
    - Evaluation Rules snapshot
    - Daily Performance table (PnL, win rate, contracts, max DD, notes)

- **Default / CRM / Finance Dashboards (template)**
  - Pre-built layouts from the base template
  - Can be repurposed into:
    - Risk Management
    - Finance / Payouts
    - Support & Compliance views

### Layout & Navigation

- Responsive sidebar navigation with sections for:
  - Dashboards (Trader, Default, CRM, Finance)
  - Future pages (Analytics, E-commerce, Academy, etc.)
- Collapsible sidebar and “Quick Create” entry point
- User profile section in the sidebar with name + email

### Theming & UI

- Dark theme by default
- Uses shadcn/ui components for a consistent look:
  - Cards, Tabs, Tables, Badges, Buttons, etc.
- Tailwind-based styling for fast customization

---

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **npm** or **pnpm** or **yarn**

Verify Node:

```bash
node -v
```
