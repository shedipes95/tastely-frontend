// src/app/recipe/[id]/page.tsx
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

const BASE =
  process.env.NEXT_PUBLIC_PROXY_BASE || "http://127.0.0.1:8080/mealdb";

async function fetchMeal(id: string) {
  const r = await fetch(`${BASE}/lookup.php?i=${id}`, { cache: "no-store" });
  const d = await r.json();
  const meal = d?.meals?.[0];
  if (!meal) return null;

  const ingredients: { ing: string; ms: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const ms = meal[`strMeasure${i}`];
    if (ing && String(ing).trim()) {
      ingredients.push({ ing: String(ing).trim(), ms: String(ms || "").trim() });
    }
  }
  return { meal, ingredients };
}

export default async function RecipePage({ params }: { params: { id: string } }) {
  const data = await fetchMeal(params.id);
  if (!data) {
    return (
      <section className="space-y-4">
        <Link href="/" className="text-blue-600 hover:underline">← Back</Link>
        <p>Recipe not found.</p>
      </section>
    );
  }
  const { meal, ingredients } = data;

  return (
    <section className="space-y-6">
      <Link href="/" className="text-sm text-blue-600 hover:underline">← Back</Link>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border">
          <Image
            src={meal.strMealThumb || "/placeholder.svg"}
            alt={meal.strMeal}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-semibold">{meal.strMeal}</h1>
          <p className="text-sm text-gray-600">
            {meal.strArea || "—"} • {meal.strCategory || "—"}
            {meal.strTags ? ` • ${meal.strTags}` : ""}
          </p>

          <h2 className="text-xl font-semibold mt-4">Ingredients</h2>
          <ul className="list-disc pl-5 space-y-1">
            {ingredients.map((it, i) => (
              <li key={i}>{it.ms ? `${it.ms} ` : ""}{it.ing}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Instructions</h2>
        {(meal.strInstructions || "")
          .split(/\r?\n/)
          .filter(Boolean)
          .map((line: string, i: number) => (
            <p key={i} className="leading-7">{line}</p>
          ))}
      </div>

      {meal.strYoutube && (
        <p>
          <a
            href={meal.strYoutube}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
          >
            Watch on YouTube
          </a>
        </p>
      )}
    </section>
  );
}
