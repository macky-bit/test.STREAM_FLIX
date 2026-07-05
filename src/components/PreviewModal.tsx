import { useEffect, useState } from "react";
import { Play, Plus, ThumbsUp, X, Volume2, VolumeX } from "lucide-react";
import type { Show } from "../types";
import { fetchTrailerKey, fetchSimilar } from "../lib/tmdb";

export function PreviewModal({
  show,
  onClose,
  onSelect,
}: {
  show: Show | null;
  onClose: () => void;
  /** Lets "More Like This" cards re-open the modal with a different title. */
  onSelect?: (show: Show) => void;
}) {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [muted, setMuted] = useState(true);
  const [similar, setSimilar] = useState<Show[]>([]);
  const [loadingTrailer, setLoadingTrailer] = useState(false);

  // Close on Escape
  useEffect(() => {
    if (!show) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show, onClose]);

  // Lock body scroll while open
  useEffect(() => {
    if (!show) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [show]);

  // Load trailer + similar titles whenever the selected show changes
  useEffect(() => {
    if (!show) {
      setTrailerKey(null);
      setSimilar([]);
      return;
    }
    let cancelled = false;
    setTrailerKey(null);
    setMuted(true);
    setLoadingTrailer(true);

    Promise.all([
      fetchTrailerKey(show.id, show.mediaType ?? "movie"),
      fetchSimilar(show.id, show.mediaType ?? "movie"),
    ]).then(([key, sim]) => {
      if (cancelled) return;
      setTrailerKey(key);
      setSimilar(sim);
      setLoadingTrailer(false);
    });

    return () => {
      cancelled = true;
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/80 backdrop-blur-sm p-4 md:p-10"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#181818] rounded-md overflow-hidden shadow-2xl my-4 md:my-8 animate-[modalIn_0.2s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes modalIn {
            from { opacity: 0; transform: scale(0.96); }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-[#181818] flex items-center justify-center hover:bg-[#2a2a2a] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* ─── Trailer / hero media ─────────────────────────────────── */}
        <div className="relative w-full aspect-video bg-black">
          {trailerKey ? (
            <iframe
              key={trailerKey}
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=${
                muted ? 1 : 0
              }&controls=0&loop=1&playlist=${trailerKey}&modestbranding=1&rel=0&showinfo=0`}
              title={`${show.title} trailer`}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : (
            <img
              src={show.hero ?? show.image}
              alt={show.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {/* Gradient for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-black/40 pointer-events-none" />

          {/* Title + actions over the video, Netflix-style */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 flex items-end justify-between">
            <div>
              <h2 className="font-['Barlow_Condensed'] text-white font-extrabold text-3xl md:text-5xl leading-none tracking-tight mb-3 drop-shadow-lg">
                {show.title}
              </h2>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 bg-white text-black px-5 md:px-6 py-2 rounded-sm font-semibold hover:bg-white/90 transition-colors font-['Barlow_Condensed'] text-base md:text-lg tracking-wide">
                  <Play className="w-5 h-5 fill-black" />
                  Play
                </button>
                <button className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-white/60 flex items-center justify-center hover:border-white transition-colors bg-black/20">
                  <Plus className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </button>
                <button className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-white/60 flex items-center justify-center hover:border-white transition-colors bg-black/20">
                  <ThumbsUp className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </button>
              </div>
            </div>

            {trailerKey && (
              <button
                onClick={() => setMuted((m) => !m)}
                className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-white/60 flex items-center justify-center hover:border-white transition-colors bg-black/20 flex-shrink-0"
                aria-label={muted ? "Unmute" : "Mute"}
              >
                {muted ? (
                  <VolumeX className="w-4 h-4 md:w-5 md:h-5 text-white" />
                ) : (
                  <Volume2 className="w-4 h-4 md:w-5 md:h-5 text-white" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* ─── Details ────────────────────────────────────────────────── */}
        <div className="p-4 md:p-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className="text-green-400 font-semibold text-sm">
                  {show.match}% Match
                </span>
                <span className="text-white/70 text-sm">{show.year}</span>
                <span className="border border-white/40 text-white/70 text-xs px-1.5 py-0.5 rounded-sm">
                  {show.rating}
                </span>
                {show.duration && (
                  <span className="text-white/70 text-sm">
                    {show.duration}
                  </span>
                )}
                {!trailerKey && !loadingTrailer && (
                  <span className="text-white/40 text-xs italic">
                    No trailer available
                  </span>
                )}
              </div>
              <p className="text-white/85 text-sm md:text-base leading-relaxed">
                {show.description || "No description available."}
              </p>
            </div>
            <div className="text-sm text-white/50 space-y-2">
              {show.genres.length > 0 && (
                <p>
                  <span className="text-white/40">Genres: </span>
                  {show.genres.join(", ")}
                </p>
              )}
            </div>
          </div>

          {/* More Like This */}
          {similar.length > 0 && (
            <div className="mt-8">
              <h3 className="font-['Barlow_Condensed'] text-white font-bold text-xl tracking-wide mb-4">
                More Like This
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {similar.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => onSelect?.(s)}
                    className="cursor-pointer group bg-[#141414] rounded-sm overflow-hidden"
                  >
                    <div
                      className="relative overflow-hidden"
                      style={{ aspectRatio: "16/9" }}
                    >
                      <img
                        src={s.hero ?? s.image}
                        alt={s.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-green-400 text-xs font-semibold">
                          {s.match}% Match
                        </span>
                        <span className="text-white/50 text-xs border border-white/30 px-1 rounded-sm">
                          {s.rating}
                        </span>
                      </div>
                      <p className="text-white/80 text-xs line-clamp-2">
                        {s.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
