import { useMemo, useState } from "react";
import { RESOURCES, CATEGORIES } from "./resources.data";

export default function LearningResources() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const list = useMemo(() => {
    return RESOURCES.filter((r) => {
      const matchesCategory =
        category === "All" ? true : r.category === category;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <div className="min-h-[80vh] flex">
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Learning Resources</h1>
          <p className="text-gray-600">
            Curated links for learning and reference — filter by category or
            search.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1 rounded-full text-sm border ${
                  category === cat
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, tag or description…"
            className="w-full md:w-80 border rounded px-3 py-2"
          />
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((r) => (
            <a
              key={r.id}
              href={r.url}
              target="_blank"
              rel="noreferrer"
              className="group bg-white rounded-xl border hover:shadow transition p-4 flex flex-col"
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">{r.emoji}</div>
                <div className="min-w-0">
                  <div className="font-semibold truncate">{r.title}</div>
                  <div className="text-xs text-gray-500">{r.category}</div>
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-3 flex-1">
                {r.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-1">
                {r.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs bg-gray-100 text-gray-700 rounded px-2 py-0.5"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-4 text-emerald-700 text-sm font-medium group-hover:underline">
                Visit →
              </div>
            </a>
          ))}
        </div>

        {!list.length && (
          <div className="text-gray-500 text-sm mt-6">No resources found.</div>
        )}
      </div>
    </div>
  );
}
