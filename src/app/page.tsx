// src/app/page.tsx
"use client";

import { useState } from "react";
import MealCard from "@/components/meal-card";

type Meal = { idMeal: string; strMeal: string; strMealThumb: string };

// اگر .env.local ست نشده بود، توی لوکال از پروکسی اکسپرس استفاده کن
const FALLBACK_BASE =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1")
    ? "http://127.0.0.1:8080/mealdb"
    : "";

// ✅ این خطِ حیاتی بود که توی کدت نبود
const BASE = process.env.NEXT_PUBLIC_PROXY_BASE || FALLBACK_BASE;

async function getJSON(url: string) {
  const r = await fetch(url, { cache: "no-store" });
  const text = await r.text();
  if (!r.ok) throw new Error(`HTTP ${r.status}: ${text.slice(0, 120)}`);
  try {
    return JSON.parse(text);
  } catch {
    throw new Error("Invalid JSON");
  }
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const categories = ["Beef", "Chicken", "Dessert", "Seafood"];

  const searchMeals = async (q: string) => {
    if (!BASE) {
      setErr("Set NEXT_PUBLIC_PROXY_BASE in .env.local");
      return;
    }
    setLoading(true);
    setErr("");
    try {
      const d = await getJSON(`${BASE}/search.php?s=${encodeURIComponent(q)}`);
setMeals(Array.isArray(d.meals) ? d.meals.filter(Boolean) : []);
    } catch (e: any) {
      setErr(e.message || "Network error");
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  const byCategory = async (c: string) => {
    if (!BASE) {
      setErr("Set NEXT_PUBLIC_PROXY_BASE in .env.local");
      return;
    }
    setLoading(true);
    setErr("");
    try {
      const d = await getJSON(`${BASE}/filter.php?c=${encodeURIComponent(c)}`);
setMeals(Array.isArray(d.meals) ? d.meals.filter(Boolean) : []);
    } catch (e: any) {
      setErr(e.message || "Network error");
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-6">
      <h1 className="text-3xl md:text-4xl font-semibold">Find your next recipe</h1>

      <div className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search recipes (e.g., pasta)…"
          className="flex-1 border rounded-lg px-4 py-2"
        />
        <button
          onClick={() => searchMeals(query)}
          className="border rounded-lg px-4 py-2"
        >
          Search
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => byCategory(c)}
            className="px-4 py-2 border rounded-full hover:bg-gray-100"
          >
            {c}
          </button>
        ))}
      </div>

      {loading && <p>Loading…</p>}
      {err && <p className="text-red-500">{err}</p>}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {meals.map((m) => (
          <MealCard key={m.idMeal} meal={m} />
        ))}
      </div>
    </section>
  );
}
