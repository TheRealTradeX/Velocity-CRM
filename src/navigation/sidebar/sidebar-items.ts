import {
  Users,
  LayoutDashboard,
  Banknote,
  Gauge,
  LineChart,
  ReceiptText,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  subItems?: NavSubItem[];
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Dashboards",
    items: [
      {
        title: "VID",
        url: "/dashboard/default",
        icon: LayoutDashboard,
      },
      {
        title: "Trader Dashboard",
        url: "/trader",
        icon: LineChart,
      },
      {
        title: "Risk Overview",
        url: "/admin/risk",
        icon: Gauge,
      },
      {
        title: "Payouts",
        url: "/admin/payouts",
        icon: Banknote,
      },
    ],
  },
  {
    id: 2,
    label: "Management",
    items: [
      {
        title: "Traders",
        url: "/admin/traders",
        icon: Users,
      },
      {
        title: "Accounts",
        url: "/admin/accounts",
        icon: LayoutDashboard,
      },
      {
        title: "Evaluations",
        url: "/admin/evaluations",
        icon: ReceiptText,
      },
    ],
  },
  {
    id: 3,
    label: "System",
    items: [
      {
        title: "Settings",
        url: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];
