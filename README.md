# Tastely — Recipe Explorer

A small recipe browsing app built with Next.js (App Router), TypeScript, and Tailwind CSS. Search for meals, filter by category, and open a recipe to see its ingredients and instructions.

**Live demo: [tastely-frontend.vercel.app](https://tastely-frontend.vercel.app)** (deployed on Vercel, with the proxy also running on Vercel)

## What it does

- **Search** for meals by name (e.g. "pasta").
- **Filter** by category: Beef, Chicken, Dessert, Seafood.
- **View a recipe** on its own page — photo, area and category, full ingredient list with measures, step-by-step instructions, and a YouTube link when one is available.

Recipe data comes from [TheMealDB](https://www.themealdb.com/). The app talks to a small proxy service rather than the API directly, so the API base is kept out of the frontend and CORS is handled server-side.

## Why I built it

I wanted a focused project to practise the Next.js App Router properly — mixing client components (the search page, with its own loading and error states) and a server component (the recipe detail page, which fetches on the server). It's deliberately small and tidy rather than feature-heavy.

## Tech stack

- **Next.js 14** (App Router)
- **React 18** + **TypeScript**
- **Tailwind CSS** for styling
- **next/image** for optimised images
- Data via a **proxy** wrapping TheMealDB

## How it's put together

- `src/app/page.tsx` — home page. Client component handling search and category filtering, with loading and error handling.
- `src/app/recipe/[id]/page.tsx` — recipe detail. Server component that fetches one meal and builds the ingredient list.
- `src/components/meal-card.tsx` — the result card, with an inline SVG fallback when a meal has no image.

## Run it locally

The frontend expects a proxy that exposes TheMealDB endpoints (`/search.php`, `/filter.php`, `/lookup.php`) under a base URL.

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set the proxy base. Copy the example env file and fill it in:
   ```bash
   cp .env.local.example .env.local
   ```
   ```
   NEXT_PUBLIC_PROXY_BASE=https://your-proxy-host/mealdb
   ```
   If you leave it empty while running on localhost, the app falls back to `http://127.0.0.1:8080/mealdb`, so a local proxy on port 8080 works without any config.

3. Start the dev server:
   ```bash
   npm run dev
   ```
   Open http://localhost:3000.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint |

## Notes

- Remote images are allowed from `www.themealdb.com` via `next.config.mjs`.
- This is the frontend only; the proxy that serves the meal data lives separately in [mealdb-proxy-express](https://github.com/shedipes95/mealdb-proxy-express).
