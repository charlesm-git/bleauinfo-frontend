# 🧗 Bleau.Info Statistics — Frontend

Frontend application for visualizing bouldering statistics from [bleau.info](https://bleau.info). Built to provide climbers with insights and data exploration capabilities not available on the original site.

## 🧭 Overview

**Bleau.Info Statistics** lets climbers explore data from Fontainebleau through interactive charts and tables:

- **Best rated** boulders by grade
- **Most ascended** boulders
- **Statistical breakdowns** by grade, time, area, and style
- **Area browsing** with detailed boulder listings
- **Boulder detail** pages with ascent data
- **Full-text search** across boulders and areas
- **Boulder recommender** — get personalized suggestions based on boulders you've climbed

## 📦 Tech Stack

| Component | Technology |
|-----------|-----------|
| Framework | React 19 + React Router v7 (SSR) |
| Build Tool | Vite |
| Styling | Tailwind CSS v4 |
| UI Components | Radix UI (shadcn/ui pattern) |
| Charts | Recharts |
| Tables | TanStack Table |
| Deployment | Docker (Node 22 Alpine) → Google Cloud Run |

## 🏗️ Project Structure

```
app/
├── root.tsx              # App shell & layout
├── routes.ts             # Route definitions
├── config.ts             # API base URL configuration
├── components/ui/        # Reusable UI components (shadcn/ui)
├── content/              # Markdown content for static pages
├── data/                 # Data fetching & helpers
├── lib/                  # Utilities & hooks
├── routes/               # Page components
│   ├── home.tsx
│   ├── best-rated.tsx
│   ├── most-ascents.tsx
│   ├── boulder-detail.tsx
│   ├── search.tsx
│   ├── recommender.tsx
│   ├── areas/            # Area list & detail
│   └── statistics/       # Grade, time, area, style
├── types/                # TypeScript type definitions
└── ui/                   # Layout & shared UI
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Type checking
npm run typecheck

# Production build
npm run build
npm run start
```

## 🔧 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | Base URL of the bleauinfo-api |

## 🐳 Docker

```bash
docker build -t bleauinfo-frontend .
docker run -p 3000:3000 bleauinfo-frontend
```