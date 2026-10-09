# Financial Curator

A personal finance dashboard UI built with React and Vite. It turns sample income/expense data into a clear picture of financial health: burn rate, growth, savings goals and spending by category.

## Features

- **Overview cards** — burn rate and growth figures with historical deltas
- **Capital trajectory chart** — quarterly performance bar chart (Recharts), current month highlighted
- **Savings goals** — donut charts tracking progress against individual goals
- **Transaction tools** — filter by category or income/expense, live search
- **Viewer / Admin modes** — a role toggle that shows how the interface adapts to read-only vs full-control users (simulated in state, no backend)
- **Dark / light theme** — with the preference saved automatically

## What is real vs mock

This is a front-end dashboard: the figures, transactions and forecasts are **sample/mock data** used to demonstrate the UI and the calculations. There is no live bank or market-data connection.

## Tech stack

- React 19 + Vite
- Tailwind CSS, Recharts, Framer Motion, Lucide icons

## Run locally

```bash
git clone https://github.com/alphathehacker/Financial-Curator-
cd Financial-Curator-
npm install
npm run dev
```

## Screenshots

_(to be added)_
