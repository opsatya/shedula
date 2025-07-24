# Shedula

A modern, mobile-first doctor discovery and appointment scheduling web application built with React, TypeScript, Tailwind CSS, and the **shadcn/ui** component library. Shedula provides an elegant interface for patients to search for doctors, view availability, and book appointments while showcasing best-in-class front-end patterns such as **TanStack Query** for data-fetching and **React Router** for client-side routing.

---

## ✨ Features

• Responsive, PWA-ready UI that looks great on mobile and desktop
• Doctor listing with search, filters, and favourite toggling
• OTP-based secure authentication flow
• Re-usable headless UI components powered by `@radix-ui` and **shadcn/ui**
• Global toast/sonner notifications and tooltips
• API-ready data layer built on **TanStack Query**
• Strictly typed codebase with **TypeScript**

---

## 🛠️ Tech Stack

| Layer              | Tooling / Libraries |
|--------------------|---------------------|
| Front-end          | React 18 + Vite     |
| Styling            | Tailwind CSS 3, CV-A, tailwind-merge |
| UI Components      | shadcn/ui, Radix Primitives |
| State & Data       | TanStack Query      |
| Forms & Validation | React Hook Form, Zod |
| Routing            | React Router DOM v6 |
| Icons              | Lucide React        |
| Build              | Vite                |
| Linting            | ESLint (typescript-eslint) |

---

## 🚀 Getting Started

### Prerequisites

• Node.js ≥ 18
• pnpm / npm / yarn (examples use `npm`)

### Installation

```bash
# Clone the repo
git clone https://github.com/your-org/shedula.git && cd shedula

# Install dependencies
npm install
```

### Development

```bash
# Start a hot-reloading dev server on http://localhost:5173
npm run dev
```

### Production Build

```bash
npm run build     # Output bundled assets to dist/

# (optional) preview the production build locally
npm run preview   # http://localhost:4173
```

### Additional Scripts

| Script            | Purpose                               |
|-------------------|---------------------------------------|
| `npm run lint`    | Lint the entire codebase with ESLint   |
| `npm run build:dev` | Build in development mode (faster, with sourcemaps) |

---

## 📁 Project Structure (excerpt)

```
.
├─ public/               # Static assets copied as-is
├─ src/
│  ├─ components/        # Re-usable UI + feature components
│  ├─ pages/             # Route-level components
│  ├─ hooks/             # Custom React hooks
│  ├─ lib/               # Utility helpers (e.g. cn.ts)
│  ├─ App.tsx           # Application shell & router
│  └─ main.tsx          # Entry point bootstrapping React
├─ tailwind.config.ts    # Tailwind configuration
├─ vite.config.ts        # Vite configuration
└─ eslint.config.js      # Linting rules
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feat/amazing-feature`
3. Commit your changes: `git commit -m "feat: add amazing feature"`
4. Push to the branch: `git push origin feat/amazing-feature`
5. Open a Pull Request

Please ensure your code adheres to the existing linting rules and is covered by adequate documentation/tests.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
