import { useState } from "react";

export function CategoryTabs() {
  const [active, setActive] = useState("All");
  const categories = [
    "All",
    "Action",
    "Drama",
    "Sci-Fi",
    "Horror",
    "Documentary",
    "Comedy",
    "Romance",
  ];

  return (
    <div
      className="flex items-center gap-2 px-4 md:px-12 py-4 overflow-x-auto scrollbar-hide"
      style={{ scrollbarWidth: "none" }}
    >
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
            active === cat
              ? "bg-white text-black"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
