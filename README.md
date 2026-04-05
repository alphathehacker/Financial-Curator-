# Finease - Premium Finance Dashboard

A high-fidelity, interactive finance dashboard built to provide users with deep insights into their fiscal health. This project follows a modern, "Financial Curator" aesthetic with a focus on data visualization, role-based access, and seamless user experience.

## ✨ Key Features

### 1. Market Intelligence Overview
- **Real-time Metrics**: Dynamic cards for Burn Rate and Growth with historical deltas.
- **Capital Trajectory**: A high-precision bar chart visualizing quarterly performance with active month highlighting.
- **Smart Savings**: Interactive donut chart tracking progress against specific financial goals (e.g., Holiday Fund 2024).

### 2. Statistical Insights
- **Monthly Analysis**: Condensed summaries of recent spending patterns and market stances.
- **Automated Forecast**: Statistical modeling of future liquidity surplus with actionable reallocation strategies.

### 3. Transaction Management (Requirement 2)
- **Advanced Filtering**: Filter by category (Food, Entertainment, etc.) and type (Income/Expense).
- **Search & Sort**: Real-time search by transaction name or vendor.
- **Exporting**: (Optional Enhancement) Support for data extraction.

### 4. Role-Based Access Control (RBAC) (Requirement 3)
- **Viewer Mode**: Read-only access to all dashboards and logs. Modification buttons are hidden.
- **Admin Mode**: Full control to add, edit, and categorize transactions.
- **Live Switcher**: A persistent role toggle in the sidebar for easy evaluation.

### 5. Premium UI/UX (Requirement 6)
- **Responsive Design**: Fully fluid layout using Tailwind CSS.
- **Theme Support**: Seamless Dark/Light mode transitions with a persistent state.
- **Smooth Interaction**: Animations powered by `framer-motion` for a weighted, premium feel.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS v4 (Adaptive Utility System)
- **State Management**: React Context & Hooks (Persisted via LocalStorage)
- **Visuals**: Recharts (Customized for Dark Mode)
- **Icons**: Lucide React
- **Animations**: Framer Motion

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## 📖 Design Philosophy & Approach

### Component-Based Architecture
The project is built with modularity in mind. Each section (Analytics, Budget, Transactions) is an isolated component that consumes a centralized state from `App.jsx`. This ensures scalability and clean code separation.

### RBAC Simulation
Instead of complex backend logic, roles are simulated via a global `role` state. Conditional rendering is used to prune restricted actions (like the "Add Transaction" button in Budget or Transactions) when the user is in **Viewer** mode.

### Visual Synthesis
The design (Market Intelligence style) focuses on **Visual Weight**. Key figures are bold and large, while secondary metadata is muted and italicized, guiding the user's eye to the most important data points first.

---

© 2024 Financial Curator Intelligence Platform. All Data Encrypted.
