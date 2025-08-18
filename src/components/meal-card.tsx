"use client";
import Image from "next/image";
import Link from "next/link";

const FALLBACK =
  "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect width='100%25' height='100%25' fill='%23eee'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='%23999'%3ENo%20image%3C/text%3E%3C/svg%3E";

export default function MealCard({ meal }: { meal: any }) {
  if (!meal) return null;
  const img =
    typeof meal.strMealThumb === "string" && meal.strMealThumb.trim()
      ? meal.strMealThumb
      : FALLBACK;
  const title = meal?.strMeal || "Unknown meal";

  return (
    <Link
      href={`/recipe/${meal.idMeal}`}
      className="group block rounded-2xl border overflow-hidden"
    >
      <div className="relative h-48 w-full">
        <Image src={img} alt={title} fill className="object-cover group-hover:scale-105 transition" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold">{title}</h3>
      </div>
    </Link>
  );
}
