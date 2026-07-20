import { useState } from "react";
import { Play, Plus, ThumbsUp } from "lucide-react";
import type { Show } from "../types";

export function TitleCard({
  show,
  size = "md",
  onSelect,
}: {
  show: Show & { progress?: number };
  size?: "sm" | "md" | "lg";
  onSelect?: (show: Show) => void;
}) {
  const [hovered, setHovered] = useState(false);

  const sizeClasses = {
    sm: "w-36 md:w-44",
    md: "w-44 md:w-52",
    lg: "w-52 md:w-64",
  };

  return (
    <div
      className={`${sizeClasses[size]} flex-shrink-0 relative group cursor-pointer`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect?.(show)}
    >
      <div
        className={`relative overflow-hidden rounded-sm bg-[#141414] transition-all duration-300 ${
          hovered ? "scale-110 z-10 shadow-2xl shadow-black/80" : "scale-100"
        }`}
        style={{ aspectRatio: "2/3" }}
      >
        <img
          src={show.image}
          alt={show.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {show.progress !== undefined && !hovered && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <div
              className="h-full bg-[#e50914]"
              style={{ width: `${show.progress}%` }}
            />
          </div>
        )}
        {hovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-3">
            <p className="font-['Barlow_Condensed'] text-white font-bold text-sm leading-tight mb-2">
              {show.title}
            </p>
            <div className="flex gap-1.5 mb-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect?.(show);
                }}
                className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-white/90 transition-colors"
              >
                <Play className="w-3.5 h-3.5 text-black fill-black ml-0.5" />
              </button>
              <button
                onClick={(e) => e.stopPropagation()}
                className="w-7 h-7 rounded-full border border-white/60 flex items-center justify-center hover:border-white transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-white" />
              </button>
              <button
                onClick={(e) => e.stopPropagation()}
                className="w-7 h-7 rounded-full border border-white/60 flex items-center justify-center hover:border-white transition-colors"
              >
                <ThumbsUp className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-green-400 text-xs font-semibold">
                {show.match}% Match
              </span>
              <span className="text-white/50 text-xs border border-white/30 px-1 rounded-sm">
                {show.rating}
              </span>
            </div>
            <div className="flex gap-1 flex-wrap mt-1">
              {show.genres.slice(0, 2).map((g) => (
                <span key={g} className="text-white/60 text-xs">
                  {g}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
