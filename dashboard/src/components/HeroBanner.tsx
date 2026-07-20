import { useState } from "react";
import { Play, Info, Volume2, VolumeX } from "lucide-react";
import type { Show } from "../types";

export function HeroBanner({
  show,
  onMoreInfo,
}: {
  show: Show;
  onMoreInfo?: (show: Show) => void;
}) {
  const [muted, setMuted] = useState(true);

  return (
    <div
      className="relative w-full"
      style={{ height: "85vh", minHeight: "500px" }}
    >
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <img
          src={show.hero}
          alt={show.title}
          className="w-full h-full object-cover opacity-60"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

      <div className="absolute bottom-[20%] left-4 md:left-12 max-w-lg md:max-w-xl">
        <p className="font-['Barlow_Condensed'] text-[#e50914] font-bold text-sm tracking-[0.2em] uppercase mb-3">
          #1 in Films Today
        </p>
        <h1 className="font-['Barlow_Condensed'] text-white font-extrabold text-5xl md:text-7xl leading-none tracking-tight mb-4">
          {show.title}
        </h1>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-green-400 font-semibold text-sm">
            {show.match}% Match
          </span>
          <span className="text-white/70 text-sm">{show.year}</span>
          <span className="border border-white/40 text-white/70 text-xs px-1.5 py-0.5 rounded-sm">
            {show.rating}
          </span>
          <span className="text-white/70 text-sm">{show.duration}</span>
        </div>
        <p className="text-white/80 text-sm md:text-base leading-relaxed mb-6 max-w-md">
          {show.description}
        </p>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-sm font-semibold hover:bg-white/90 transition-colors font-['Barlow_Condensed'] text-lg tracking-wide">
            <Play className="w-5 h-5 fill-black" />
            Play
          </button>
          <button
            onClick={() => onMoreInfo?.(show)}
            className="flex items-center gap-2 bg-white/20 text-white px-6 py-2.5 rounded-sm font-semibold hover:bg-white/30 transition-colors backdrop-blur-sm font-['Barlow_Condensed'] text-lg tracking-wide"
          >
            <Info className="w-5 h-5" />
            More Info
          </button>
        </div>
      </div>

      <div className="absolute bottom-[22%] right-6 md:right-12 flex flex-col items-center gap-3">
        <button
          onClick={() => setMuted(!muted)}
          className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center hover:border-white transition-colors"
        >
          {muted ? (
            <VolumeX className="w-4 h-4 text-white" />
          ) : (
            <Volume2 className="w-4 h-4 text-white" />
          )}
        </button>
        <span className="bg-[#e50914]/90 text-white text-xs font-bold px-3 py-1 font-['Barlow_Condensed'] tracking-widest border-l-2 border-white/60">
          {show.rating}
        </span>
      </div>
    </div>
  );
}
