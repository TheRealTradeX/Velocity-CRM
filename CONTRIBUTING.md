# Contributing to Velocity CRM

Thanks for your interest in improving **Velocity CRM**, the internal admin dashboard for Velocity Funds. This guide covers how to set up your environment and contribute changes.

---

## Overview

This project is built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, and **shadcn/ui**. We keep the codebase modular, scalable, and easy to extend.

---

## Project Layout

We use a colocation-based file system so each feature keeps its own pages, components, and logic.

```
src
|-- app              # Next.js routes (App Router)
|-- app/(auth)       # Auth layouts & screens
|-- app/(main)       # Main dashboard routes
|-- components       # Shared UI components
|-- hooks            # Reusable hooks
|-- lib              # Config & utilities
|-- styles           # Tailwind / theme setup
`-- types            # TypeScript definitions
```

---

## Getting Started

### Fork and Clone the Repository

1. Fork this repository on GitHub.
2. Clone your fork
   ```bash
   git clone https://github.com/YOUR_USERNAME/velocity-crm.git
   cd velocity-crm
   ```
3. Install dependencies
   ```bash
   npm install
   ```
4. Run the dev server
   ```bash
   npm run dev
   ```
   App will be available at http://localhost:3000.

---

## Contribution Flow

- Create a new branch before working on changes:
  ```bash
  git checkout -b feature/my-update
  ```
- Use clear commit messages:
  ```bash
  git commit -m "feat: add finance dashboard screen"
  ```
- Open a Pull Request once ready. If your change adds a new UI screen or component, include a screenshot in your PR description.

---

## Where to Contribute

- External pages: landing pages or other non-dashboard routes -> `src/app/(external)/`
- Auth screens: login, register, and authentication layouts -> `src/app/(main)/auth/`
- Dashboard screens: feature dashboards like CRM, Finance, Analytics -> `src/app/(main)/dashboard/`
- Components: reusable UI goes in `src/components/`
- Hooks: custom logic goes in `src/hooks/`
- Themes: new presets under `src/styles/presets/`

---

## Guidelines

- Prefer TypeScript types over `any`.
- Follow shadcn/ui style and Tailwind v4 conventions.
- Keep accessibility in mind (ARIA, keyboard navigation).
- Avoid unnecessary dependencies; prefer existing utilities where possible.
- Husky pre-commit hooks run linting and formatting automatically.

---

## Questions & Support

- Open an issue in this repository for bugs, suggestions, or requests.

Your contributions keep this project improving. Thank you!
