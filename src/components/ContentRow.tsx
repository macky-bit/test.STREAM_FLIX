import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Show } from "../types";
import { TitleCard } from "./TitleCard";

export function ContentRow({
  title,
  shows,
  size = "md",
  onSelect,
}: {
  title: string;
  shows: (Show & { progress?: number })[];
  size?: "sm" | "md" | "lg";
  onSelect?: (show: Show) => void;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (dir: "left" | "right") => {
    const row = rowRef.current;
    if (!row) return;
    const amount = row.clientWidth * 0.75;
    row.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const checkScroll = () => {
    const row = rowRef.current;
    if (!row) return;
    setCanScrollLeft(row.scrollLeft > 0);
    setCanScrollRight(row.scrollLeft + row.clientWidth < row.scrollWidth - 4);
  };

  useEffect(() => {
    const row = rowRef.current;
    if (row) {
      row.addEventListener("scroll", checkScroll);
      checkScroll();
      return () => row.removeEventListener("scroll", checkScroll);
    }
  }, []);

  return (
    <div className="mb-8 relative group/row">
      <h2 className="font-['Barlow_Condensed'] text-white font-bold text-xl md:text-2xl tracking-wide px-4 md:px-12 mb-3 flex items-center gap-2">
        {title}
        <span className="text-[#e50914] text-sm font-semibold opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center gap-1 cursor-pointer">
          Explore All <ChevronRight className="w-3 h-3" />
        </span>
      </h2>
      <div className="relative">
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-0 bottom-0 z-20 w-12 bg-gradient-to-r from-black/80 to-transparent flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-0 bottom-0 z-20 w-12 bg-gradient-to-l from-black/80 to-transparent flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        )}
        <div
          ref={rowRef}
          className="flex gap-2 overflow-x-auto px-4 md:px-12 pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {shows.map((show) => (
            <TitleCard key={show.id} show={show} size={size} onSelect={onSelect} />
          ))}
        </div>
      </div>
    </div>
  );
}
