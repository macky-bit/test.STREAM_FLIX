import { useEffect, useState } from "react";
import { tmdb, toShow } from "../lib/tmdb";
import type { TMDBData } from "../types";

export function useTMDB(): TMDBData {
  const [state, setState] = useState<TMDBData>({
    featured: null,
    trending: [],
    newReleases: [],
    action: [],
    acclaimed: [],
    topTen: [],
    continueWatching: [],
    recommended: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    async function load() {
      try {
        // Fire all requests in parallel
        const [trendingRaw, newRaw, actionRaw, topRatedRaw, tvRaw] =
          await Promise.all([
            tmdb("/trending/movie/week"),
            tmdb("/movie/now_playing"),
            tmdb("/discover/movie", {
              with_genres: "28,53",
              sort_by: "popularity.desc",
            }),
            tmdb("/movie/top_rated"),
            tmdb("/trending/tv/week"),
          ]);

        const trending = trendingRaw.map((m) => toShow(m, false, "movie")).slice(0, 8);
        const newReleases = newRaw.map((m) => toShow(m, false, "movie")).slice(0, 8);
        const action = actionRaw.map((m) => toShow(m, false, "movie")).slice(0, 8);
        const acclaimed = topRatedRaw.map((m) => toShow(m, false, "movie")).slice(0, 8);
        const topTen = trending.slice(0, 8);
        const recommended = tvRaw.map((m) => toShow(m, false, "tv")).slice(0, 8);

        // Pick the first trending movie as the hero — fetch its backdrop
        const heroRaw = trendingRaw[0];
        const featured = heroRaw ? toShow(heroRaw, true, "movie") : null;

        // Fake "continue watching" from a mix of rows with random progress
        const continueWatching = [
          ...trending.slice(1, 3),
          ...newReleases.slice(0, 2),
        ].map((s, i) => ({ ...s, progress: [68, 32, 85, 15][i] ?? 50 }));

        setState({
          featured,
          trending,
          newReleases,
          action,
          acclaimed,
          topTen,
          continueWatching,
          recommended,
          loading: false,
          error: null,
        });
      } catch (e) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: "Failed to load content from TMDB. Check your API key.",
        }));
      }
    }
    load();
  }, []);

  return state;
}
