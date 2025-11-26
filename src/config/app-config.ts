import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "Velocity Funds CRM",
  version: packageJson.version,
  copyright: `(c) ${currentYear}, Velocity Funds CRM.`,
  meta: {
    title: "Velocity Funds Admin Dashboard",
    description:
      "Internal admin dashboard for Velocity Funds \u2013 trader evaluations, risk, and payouts.",
  },
};
