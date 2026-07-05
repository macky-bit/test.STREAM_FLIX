import type { Show } from "../types";

export function TopTenRow({
  shows,
  onSelect,
}: {
  shows: Show[];
  onSelect?: (show: Show) => void;
}) {
  const top10 = shows.slice(0, 8);

  return (
    <div className="mb-8">
      <h2 className="font-['Barlow_Condensed'] text-white font-bold text-xl md:text-2xl tracking-wide px-4 md:px-12 mb-3">
        Top 10 in Your Country Today
      </h2>
      <div
        className="flex gap-0 overflow-x-auto px-4 md:px-12 pb-4"
        style={{ scrollbarWidth: "none" }}
      >
        {top10.map((show, i) => (
          <div
            key={show.id}
            className="flex-shrink-0 relative cursor-pointer group"
            onClick={() => onSelect?.(show)}
          >
            <span
              className="absolute left-0 bottom-0 font-['Barlow_Condensed'] font-extrabold text-[#141414] leading-none select-none z-10"
              style={{
                fontSize: "clamp(6rem, 10vw, 9rem)",
                WebkitTextStroke: "2px rgba(255,255,255,0.15)",
              }}
            >
              {i + 1}
            </span>
            <div
              className="relative ml-10 overflow-hidden rounded-sm bg-[#141414]"
              style={{ width: "120px", aspectRatio: "2/3" }}
            >
              <img
                src={show.image}
                alt={show.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
