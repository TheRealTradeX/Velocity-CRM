import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "Velocity CRM",
  version: packageJson.version,
  copyright: `(c) ${currentYear}, Velocity Funds.`,
  url: "https://app.velocityfunds.io",
  meta: {
    title: "Velocity CRM - Admin Dashboard for Velocity Funds",
    description:
      "Internal command center for Velocity Funds, a futures prop firm.",
  },
};
