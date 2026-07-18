// import { useState, useEffect, useRef } from "react";
// import {
//   Play,
//   Info,
//   Search,
//   Bell,
//   ChevronDown,
//   ChevronLeft,
//   ChevronRight,
//   Plus,
//   ThumbsUp,
//   X,
//   Volume2,
//   VolumeX,
// } from "lucide-react";

// // ─── TMDB CONFIG ────────────────────────────────────────────────────────────
// const TMDB_API_KEY = "80063cfa253b90bb6fb289cf86116b34"; // 🔑 api key
// const TMDB_BASE = "https://api.themoviedb.org/3";
// const TMDB_IMG = "https://image.tmdb.org/t/p";

// // Map TMDB genre IDs → names
// const GENRE_MAP: Record<number, string> = {
//   28: "Action",
//   12: "Adventure",
//   16: "Animation",
//   35: "Comedy",
//   80: "Crime",
//   99: "Documentary",
//   18: "Drama",
//   10751: "Family",
//   14: "Fantasy",
//   36: "Historical",
//   27: "Horror",
//   10402: "Music",
//   9648: "Mystery",
//   10749: "Romance",
//   878: "Sci-Fi",
//   53: "Thriller",
//   10770: "TV Movie",
//   37: "Western",
// };

// // Fetch helper — always returns [] on error so the UI never crashes
// async function tmdb<T>(
//   path: string,
//   params: Record<string, string> = {},
// ): Promise<T[]> {
//   try {
//     const url = new URL(`${TMDB_BASE}${path}`);
//     url.searchParams.set("api_key", TMDB_API_KEY);
//     url.searchParams.set("language", "en-US");
//     Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
//     const res = await fetch(url.toString());
//     if (!res.ok) throw new Error(`TMDB ${res.status}`);
//     const data = await res.json();
//     return data.results ?? [];
//   } catch (e) {
//     console.error("TMDB fetch error:", e);
//     return [];
//   }
// }

// // Convert a raw TMDB movie/TV item into our Show shape
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// function toShow(item: any, isHero = false): Show {
//   const title = item.title ?? item.name ?? "Untitled";
//   const year = (item.release_date ?? item.first_air_date ?? "").slice(0, 4);
//   const genres = ((item.genre_ids as number[]) ?? [])
//     .map((id) => GENRE_MAP[id])
//     .filter(Boolean)
//     .slice(0, 3) as string[];
//   const vote = Math.round((item.vote_average ?? 0) * 10);
//   return {
//     id: item.id,
//     title,
//     year,
//     rating: "TV-MA", // TMDB free tier doesn't expose cert; hard-code default
//     duration: "", // Would need a detail call per item — skipped for perf
//     genres,
//     image: item.poster_path
//       ? `${TMDB_IMG}/w342${item.poster_path}`
//       : "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400&h=600&fit=crop",
//     hero:
//       isHero && item.backdrop_path
//         ? `${TMDB_IMG}/original${item.backdrop_path}`
//         : undefined,
//     description: item.overview ?? "",
//     match: vote,
//   };
// }

// // ─── LOGO ───────────────────────────────────────────────────────────────────
// const LOGO_SVG = (
//   <svg
//     viewBox="0 0 111.81 30"
//     className="h-7 w-auto fill-[#e50914]"
//     aria-label="StreamFlix"
//   >
//     <path d="M0.66 22.02V20.82H3.78V22.26Q3.78 24.3 5.49 24.3Q6.33 24.3 6.765 23.805Q7.2 23.31 7.2 22.2Q7.2 20.88 6.6 19.875Q6.0 18.87 4.38 17.46Q2.34 15.66 1.53 14.205Q0.72 12.75 0.72 10.92Q0.72 8.43 1.98 7.065Q3.24 5.7 5.64 5.7Q8.01 5.7 9.225 7.065Q10.44 8.43 10.44 10.98V11.85H7.32V10.77Q7.32 9.69 6.9 9.195Q6.48 8.7 5.67 8.7Q4.02 8.7 4.02 10.71Q4.02 11.85 4.635 12.84Q5.25 13.83 6.87 15.24Q8.94 17.04 9.72 18.51Q10.5 19.98 10.5 21.96Q10.5 24.54 9.225 25.92Q7.95 27.3 5.52 27.3Q3.12 27.3 1.89 25.935Q0.66 24.57 0.66 22.02Z M14.97 9.0H11.52V6.0H21.72V9.0H18.27V27.0H14.97Z M23.31 6.0H28.2Q30.75 6.0 31.92 7.185Q33.09 8.37 33.09 10.83V12.12Q33.09 15.39 30.93 16.26V16.32Q32.13 16.68 32.625 17.79Q33.12 18.9 33.12 20.76V24.45Q33.12 25.35 33.18 25.905Q33.24 26.46 33.48 27.0H30.12Q29.94 26.49 29.88 26.04Q29.82 25.59 29.82 24.42V20.58Q29.82 19.14 29.355 18.57Q28.89 18.0 27.75 18.0H26.61V27.0H23.31ZM27.81 15.0Q28.8 15.0 29.295 14.49Q29.79 13.98 29.79 12.78V11.16Q29.79 10.02 29.385 9.51Q28.98 9.0 28.11 9.0H26.61V15.0Z M35.4 6.0H44.4V9.0H38.7V14.55H43.23V17.55H38.7V24.0H44.4V27.0H35.4Z M48.84 6.0H53.31L56.73 27.0H53.43L52.83 22.83V22.89H49.08L48.48 27.0H45.42ZM52.44 20.04 50.97 9.66H50.91L49.47 20.04Z M58.32 6.0H63.03L65.13 21.03H65.19L67.29 6.0H72.0V27.0H68.88V11.1H68.82L66.42 27.0H63.66L61.26 11.1H61.2V27.0H58.32Z M74.46 6.0H83.19V9.0H77.76V14.85H82.02V17.85H77.76V27.0H74.46Z M84.78 6.0H88.08V24.0H93.51V27.0H84.78Z M95.1 6.0H98.4V27.0H95.1Z M103.77 16.26 100.14 6.0H103.62L105.84 12.78H105.9L108.18 6.0H111.3L107.67 16.26L111.48 27.0H108.0L105.6 19.68H105.54L103.08 27.0H99.96Z" />
//   </svg>
// );

// interface Show {
//   id: number;
//   title: string;
//   year: string;
//   rating: string;
//   duration: string;
//   genres: string[];
//   image: string;
//   hero?: string;
//   description?: string;
//   match?: number;
// }

// // Static data removed — all content now comes from TMDB at runtime.

// function TitleCard({
//   show,
//   size = "md",
// }: {
//   show: Show & { progress?: number };
//   size?: "sm" | "md" | "lg";
// }) {
//   const [hovered, setHovered] = useState(false);

//   const sizeClasses = {
//     sm: "w-36 md:w-44",
//     md: "w-44 md:w-52",
//     lg: "w-52 md:w-64",
//   };

//   return (
//     <div
//       className={`${sizeClasses[size]} flex-shrink-0 relative group cursor-pointer`}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       <div
//         className={`relative overflow-hidden rounded-sm bg-[#141414] transition-all duration-300 ${
//           hovered ? "scale-110 z-10 shadow-2xl shadow-black/80" : "scale-100"
//         }`}
//         style={{ aspectRatio: "2/3" }}
//       >
//         <img
//           src={show.image}
//           alt={show.title}
//           className="w-full h-full object-cover"
//           loading="lazy"
//         />
//         {show.progress !== undefined && !hovered && (
//           <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
//             <div
//               className="h-full bg-[#e50914]"
//               style={{ width: `${show.progress}%` }}
//             />
//           </div>
//         )}
//         {hovered && (
//           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-3">
//             <p className="font-['Barlow_Condensed'] text-white font-bold text-sm leading-tight mb-2">
//               {show.title}
//             </p>
//             <div className="flex gap-1.5 mb-2">
//               <button className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-white/90 transition-colors">
//                 <Play className="w-3.5 h-3.5 text-black fill-black ml-0.5" />
//               </button>
//               <button className="w-7 h-7 rounded-full border border-white/60 flex items-center justify-center hover:border-white transition-colors">
//                 <Plus className="w-3.5 h-3.5 text-white" />
//               </button>
//               <button className="w-7 h-7 rounded-full border border-white/60 flex items-center justify-center hover:border-white transition-colors">
//                 <ThumbsUp className="w-3.5 h-3.5 text-white" />
//               </button>
//             </div>
//             <div className="flex items-center gap-1.5 flex-wrap">
//               <span className="text-green-400 text-xs font-semibold">
//                 {show.match}% Match
//               </span>
//               <span className="text-white/50 text-xs border border-white/30 px-1 rounded-sm">
//                 {show.rating}
//               </span>
//             </div>
//             <div className="flex gap-1 flex-wrap mt-1">
//               {show.genres.slice(0, 2).map((g) => (
//                 <span key={g} className="text-white/60 text-xs">
//                   {g}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function ContentRow({
//   title,
//   shows,
//   size = "md",
// }: {
//   title: string;
//   shows: (Show & { progress?: number })[];
//   size?: "sm" | "md" | "lg";
// }) {
//   const rowRef = useRef<HTMLDivElement>(null);
//   const [canScrollLeft, setCanScrollLeft] = useState(false);
//   const [canScrollRight, setCanScrollRight] = useState(true);

//   const scroll = (dir: "left" | "right") => {
//     const row = rowRef.current;
//     if (!row) return;
//     const amount = row.clientWidth * 0.75;
//     row.scrollBy({
//       left: dir === "left" ? -amount : amount,
//       behavior: "smooth",
//     });
//   };

//   const checkScroll = () => {
//     const row = rowRef.current;
//     if (!row) return;
//     setCanScrollLeft(row.scrollLeft > 0);
//     setCanScrollRight(row.scrollLeft + row.clientWidth < row.scrollWidth - 4);
//   };

//   useEffect(() => {
//     const row = rowRef.current;
//     if (row) {
//       row.addEventListener("scroll", checkScroll);
//       checkScroll();
//       return () => row.removeEventListener("scroll", checkScroll);
//     }
//   }, []);

//   return (
//     <div className="mb-8 relative group/row">
//       <h2 className="font-['Barlow_Condensed'] text-white font-bold text-xl md:text-2xl tracking-wide px-4 md:px-12 mb-3 flex items-center gap-2">
//         {title}
//         <span className="text-[#e50914] text-sm font-semibold opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center gap-1 cursor-pointer">
//           Explore All <ChevronRight className="w-3 h-3" />
//         </span>
//       </h2>
//       <div className="relative">
//         {canScrollLeft && (
//           <button
//             onClick={() => scroll("left")}
//             className="absolute left-0 top-0 bottom-0 z-20 w-12 bg-gradient-to-r from-black/80 to-transparent flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity"
//           >
//             <ChevronLeft className="w-6 h-6 text-white" />
//           </button>
//         )}
//         {canScrollRight && (
//           <button
//             onClick={() => scroll("right")}
//             className="absolute right-0 top-0 bottom-0 z-20 w-12 bg-gradient-to-l from-black/80 to-transparent flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity"
//           >
//             <ChevronRight className="w-6 h-6 text-white" />
//           </button>
//         )}
//         <div
//           ref={rowRef}
//           className="flex gap-2 overflow-x-auto px-4 md:px-12 pb-4 scrollbar-hide"
//           style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//         >
//           {shows.map((show) => (
//             <TitleCard key={show.id} show={show} size={size} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// function HeroBanner({ show }: { show: Show }) {
//   const [muted, setMuted] = useState(true);

//   return (
//     <div
//       className="relative w-full"
//       style={{ height: "85vh", minHeight: "500px" }}
//     >
//       <div className="absolute inset-0 bg-[#0a0a0a]">
//         <img
//           src={show.hero}
//           alt={show.title}
//           className="w-full h-full object-cover opacity-60"
//         />
//       </div>
//       <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
//       <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

//       <div className="absolute bottom-[20%] left-4 md:left-12 max-w-lg md:max-w-xl">
//         <p className="font-['Barlow_Condensed'] text-[#e50914] font-bold text-sm tracking-[0.2em] uppercase mb-3">
//           #1 in Films Today
//         </p>
//         <h1 className="font-['Barlow_Condensed'] text-white font-extrabold text-5xl md:text-7xl leading-none tracking-tight mb-4">
//           {show.title}
//         </h1>
//         <div className="flex items-center gap-3 mb-4">
//           <span className="text-green-400 font-semibold text-sm">
//             {show.match}% Match
//           </span>
//           <span className="text-white/70 text-sm">{show.year}</span>
//           <span className="border border-white/40 text-white/70 text-xs px-1.5 py-0.5 rounded-sm">
//             {show.rating}
//           </span>
//           <span className="text-white/70 text-sm">{show.duration}</span>
//         </div>
//         <p className="text-white/80 text-sm md:text-base leading-relaxed mb-6 max-w-md">
//           {show.description}
//         </p>
//         <div className="flex items-center gap-3">
//           <button className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-sm font-semibold hover:bg-white/90 transition-colors font-['Barlow_Condensed'] text-lg tracking-wide">
//             <Play className="w-5 h-5 fill-black" />
//             Play
//           </button>
//           <button className="flex items-center gap-2 bg-white/20 text-white px-6 py-2.5 rounded-sm font-semibold hover:bg-white/30 transition-colors backdrop-blur-sm font-['Barlow_Condensed'] text-lg tracking-wide">
//             <Info className="w-5 h-5" />
//             More Info
//           </button>
//         </div>
//       </div>

//       <div className="absolute bottom-[22%] right-6 md:right-12 flex flex-col items-center gap-3">
//         <button
//           onClick={() => setMuted(!muted)}
//           className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center hover:border-white transition-colors"
//         >
//           {muted ? (
//             <VolumeX className="w-4 h-4 text-white" />
//           ) : (
//             <Volume2 className="w-4 h-4 text-white" />
//           )}
//         </button>
//         <span className="bg-[#e50914]/90 text-white text-xs font-bold px-3 py-1 font-['Barlow_Condensed'] tracking-widest border-l-2 border-white/60">
//           {show.rating}
//         </span>
//       </div>
//     </div>
//   );
// }

// function Navbar({ scrolled }: { scrolled: boolean }) {
//   const [searchOpen, setSearchOpen] = useState(false);

//   const navLinks = [
//     "Home",
//     "TV Shows",
//     "Movies",
//     "New & Popular",
//     "My List",
//     "Browse by Language",
//   ];

//   return (
//     <nav
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//         scrolled
//           ? "bg-[#0a0a0a]"
//           : "bg-gradient-to-b from-black/80 to-transparent"
//       }`}
//     >
//       <div className="flex items-center justify-between px-4 md:px-12 py-4">
//         <div className="flex items-center gap-8">
//           {LOGO_SVG}
//           <div className="hidden md:flex items-center gap-5">
//             {navLinks.map((link) => (
//               <button
//                 key={link}
//                 className={`text-sm transition-colors ${
//                   link === "Home"
//                     ? "text-white font-semibold"
//                     : "text-white/70 hover:text-white"
//                 }`}
//               >
//                 {link}
//               </button>
//             ))}
//           </div>
//           <button className="md:hidden flex items-center gap-1 text-white text-sm font-semibold">
//             Browse <ChevronDown className="w-4 h-4" />
//           </button>
//         </div>

//         <div className="flex items-center gap-4">
//           <div className="flex items-center gap-2">
//             {searchOpen ? (
//               <div className="flex items-center gap-2 bg-black/80 border border-white/40 px-3 py-1.5 rounded-sm">
//                 <Search className="w-4 h-4 text-white" />
//                 <input
//                   autoFocus
//                   type="text"
//                   placeholder="Titles, people, genres"
//                   className="bg-transparent text-white text-sm outline-none w-40 placeholder-white/50"
//                 />
//                 <button onClick={() => setSearchOpen(false)}>
//                   <X className="w-4 h-4 text-white/60 hover:text-white" />
//                 </button>
//               </div>
//             ) : (
//               <button onClick={() => setSearchOpen(true)}>
//                 <Search className="w-5 h-5 text-white hover:text-white/70 transition-colors" />
//               </button>
//             )}
//           </div>
//           <button className="relative">
//             <Bell className="w-5 h-5 text-white hover:text-white/70 transition-colors" />
//             <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#e50914] rounded-full" />
//           </button>
//           <button className="flex items-center gap-2 group">
//             <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-[#e50914] to-[#8b1a1a] flex items-center justify-center">
//               <span className="text-white text-xs font-bold font-['Barlow_Condensed']">
//                 A
//               </span>
//             </div>
//             <ChevronDown className="w-4 h-4 text-white group-hover:rotate-180 transition-transform duration-200" />
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// }

// function CategoryTabs() {
//   const [active, setActive] = useState("All");
//   const categories = [
//     "All",
//     "Action",
//     "Drama",
//     "Sci-Fi",
//     "Horror",
//     "Documentary",
//     "Comedy",
//     "Romance",
//   ];

//   return (
//     <div
//       className="flex items-center gap-2 px-4 md:px-12 py-4 overflow-x-auto scrollbar-hide"
//       style={{ scrollbarWidth: "none" }}
//     >
//       {categories.map((cat) => (
//         <button
//           key={cat}
//           onClick={() => setActive(cat)}
//           className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
//             active === cat
//               ? "bg-white text-black"
//               : "bg-white/10 text-white hover:bg-white/20"
//           }`}
//         >
//           {cat}
//         </button>
//       ))}
//     </div>
//   );
// }

// function TopTenRow({ shows }: { shows: Show[] }) {
//   const top10 = shows.slice(0, 8);
//   const rowRef = useRef<HTMLDivElement>(null);

//   return (
//     <div className="mb-8">
//       <h2 className="font-['Barlow_Condensed'] text-white font-bold text-xl md:text-2xl tracking-wide px-4 md:px-12 mb-3">
//         Top 10 in Your Country Today
//       </h2>
//       <div
//         ref={rowRef}
//         className="flex gap-0 overflow-x-auto px-4 md:px-12 pb-4"
//         style={{ scrollbarWidth: "none" }}
//       >
//         {top10.map((show, i) => (
//           <div
//             key={show.id}
//             className="flex-shrink-0 relative cursor-pointer group"
//           >
//             <span
//               className="absolute left-0 bottom-0 font-['Barlow_Condensed'] font-extrabold text-[#141414] leading-none select-none z-10"
//               style={{
//                 fontSize: "clamp(6rem, 10vw, 9rem)",
//                 WebkitTextStroke: "2px rgba(255,255,255,0.15)",
//               }}
//             >
//               {i + 1}
//             </span>
//             <div
//               className="relative ml-10 overflow-hidden rounded-sm bg-[#141414]"
//               style={{ width: "120px", aspectRatio: "2/3" }}
//             >
//               <img
//                 src={show.image}
//                 alt={show.title}
//                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ─── TMDB DATA HOOK ──────────────────────────────────────────────────────────
// interface TMDBData {
//   featured: Show | null;
//   trending: Show[];
//   newReleases: Show[];
//   action: Show[];
//   acclaimed: Show[];
//   topTen: Show[];
//   continueWatching: (Show & { progress: number })[];
//   recommended: Show[];
//   loading: boolean;
//   error: string | null;
// }

// function useTMDB(): TMDBData {
//   const [state, setState] = useState<TMDBData>({
//     featured: null,
//     trending: [],
//     newReleases: [],
//     action: [],
//     acclaimed: [],
//     topTen: [],
//     continueWatching: [],
//     recommended: [],
//     loading: true,
//     error: null,
//   });

//   useEffect(() => {
//     async function load() {
//       try {
//         // Fire all requests in parallel
//         const [trendingRaw, newRaw, actionRaw, topRatedRaw, tvRaw] =
//           await Promise.all([
//             tmdb("/trending/movie/week"),
//             tmdb("/movie/now_playing"),
//             tmdb("/discover/movie", {
//               with_genres: "28,53",
//               sort_by: "popularity.desc",
//             }),
//             tmdb("/movie/top_rated"),
//             tmdb("/trending/tv/week"),
//           ]);

//         const trending = trendingRaw.map((m) => toShow(m)).slice(0, 8);
//         const newReleases = newRaw.map((m) => toShow(m)).slice(0, 8);
//         const action = actionRaw.map((m) => toShow(m)).slice(0, 8);
//         const acclaimed = topRatedRaw.map((m) => toShow(m)).slice(0, 8);
//         const topTen = trending.slice(0, 8);
//         const recommended = tvRaw.map((m) => toShow(m)).slice(0, 8);

//         // Pick the first trending movie as the hero — fetch its backdrop
//         const heroRaw = trendingRaw[0];
//         const featured = heroRaw ? toShow(heroRaw, true) : null;

//         // Fake "continue watching" from a mix of rows with random progress
//         const continueWatching = [
//           ...trending.slice(1, 3),
//           ...newReleases.slice(0, 2),
//         ].map((s, i) => ({ ...s, progress: [68, 32, 85, 15][i] ?? 50 }));

//         setState({
//           featured,
//           trending,
//           newReleases,
//           action,
//           acclaimed,
//           topTen,
//           continueWatching,
//           recommended,
//           loading: false,
//           error: null,
//         });
//       } catch (e) {
//         setState((prev) => ({
//           ...prev,
//           loading: false,
//           error: "Failed to load content from TMDB. Check your API key.",
//         }));
//       }
//     }
//     load();
//   }, []);

//   return state;
// }

// // ─── APP ─────────────────────────────────────────────────────────────────────
// export default function App() {
//   const [scrolled, setScrolled] = useState(false);
//   const {
//     featured,
//     trending,
//     newReleases,
//     action,
//     acclaimed,
//     topTen,
//     continueWatching,
//     recommended,
//     loading,
//     error,
//   } = useTMDB();

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 60);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#0a0a0a] font-['Inter']">
//       <Navbar scrolled={scrolled} />

//       {/* Loading state */}
//       {loading && (
//         <div className="flex items-center justify-center h-screen">
//           <div className="text-white/50 text-lg animate-pulse">
//             Loading StreamFlix…
//           </div>
//         </div>
//       )}

//       {/* Error state */}
//       {error && !loading && (
//         <div className="flex flex-col items-center justify-center h-screen gap-4">
//           <p className="text-[#e50914] font-semibold text-lg">{error}</p>
//           <p className="text-white/40 text-sm">
//             Get a free API key at{" "}
//             <a
//               href="https://www.themoviedb.org/settings/api"
//               target="_blank"
//               rel="noreferrer"
//               className="underline text-white/60 hover:text-white"
//             >
//               themoviedb.org
//             </a>{" "}
//             and replace{" "}
//             <code className="bg-white/10 px-1 rounded">YOUR_TMDB_API_KEY</code>{" "}
//             at the top of App.tsx.
//           </p>
//         </div>
//       )}

//       {/* Main content — only rendered once data is ready */}
//       {!loading && !error && featured && (
//         <>
//           <HeroBanner show={featured} />
//           <div className="relative z-10 -mt-24">
//             <CategoryTabs />
//             <ContentRow
//               title="Continue Watching"
//               shows={continueWatching}
//               size="md"
//             />
//             <TopTenRow shows={topTen} />
//             <ContentRow title="Trending Now" shows={trending} size="md" />
//             <ContentRow title="New Releases" shows={newReleases} size="md" />
//             <ContentRow title="Action & Thriller" shows={action} size="lg" />
//             <ContentRow
//               title="Critically Acclaimed"
//               shows={acclaimed}
//               size="md"
//             />
//             <ContentRow
//               title="Recommended TV Shows"
//               shows={recommended}
//               size="md"
//             />
//           </div>
//         </>
//       )}

//       <footer className="mt-16 px-4 md:px-12 pb-12 text-white/30 text-xs">
//         <div className="flex items-center gap-4 mb-6">
//           <a href="#" className="hover:text-white/60 transition-colors">
//             Audio Description
//           </a>
//           <a href="#" className="hover:text-white/60 transition-colors">
//             Help Center
//           </a>
//           <a href="#" className="hover:text-white/60 transition-colors">
//             Gift Cards
//           </a>
//           <a href="#" className="hover:text-white/60 transition-colors">
//             Media Centre
//           </a>
//           <a href="#" className="hover:text-white/60 transition-colors">
//             Investor Relations
//           </a>
//           <a href="#" className="hover:text-white/60 transition-colors">
//             Jobs
//           </a>
//           <a href="#" className="hover:text-white/60 transition-colors">
//             Terms of Use
//           </a>
//           <a href="#" className="hover:text-white/60 transition-colors">
//             Privacy
//           </a>
//           <a href="#" className="hover:text-white/60 transition-colors">
//             Cookie Preferences
//           </a>
//           <a href="#" className="hover:text-white/60 transition-colors">
//             Corporate Information
//           </a>
//           <a href="#" className="hover:text-white/60 transition-colors">
//             Contact Us
//           </a>
//         </div>
//         <p className="text-white/20">© 2024 StreamVault, Inc.</p>
//       </footer>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import type { Show } from "./types";
import { useTMDB } from "./hooks/useTMDB";
import { Navbar } from "./components/Navbar";
import { HeroBanner } from "./components/HeroBanner";
import { CategoryTabs } from "./components/CategoryTabs";
import { ContentRow } from "./components/ContentRow";
import { TopTenRow } from "./components/TopTenRow";
import { PreviewModal } from "./components/PreviewModal";

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const {
    featured,
    trending,
    newReleases,
    action,
    acclaimed,
    topTen,
    continueWatching,
    recommended,
    loading,
    error,
  } = useTMDB();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-['Inter']">
      <Navbar scrolled={scrolled} />

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center h-screen">
          <div className="text-white/50 text-lg animate-pulse">
            Loading StreamFlix…
          </div>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
          <p className="text-[#e50914] font-semibold text-lg">{error}</p>
          <p className="text-white/40 text-sm">
            Get a free API key at{" "}
            <a
              href="https://www.themoviedb.org/settings/api"
              target="_blank"
              rel="noreferrer"
              className="underline text-white/60 hover:text-white"
            >
              themoviedb.org
            </a>{" "}
            and replace{" "}
            <code className="bg-white/10 px-1 rounded">YOUR_TMDB_API_KEY</code>{" "}
            at the top of src/lib/tmdb.ts.
          </p>
        </div>
      )}

      {/* Main content — only rendered once data is ready */}
      {!loading && !error && featured && (
        <>
          <HeroBanner show={featured} onMoreInfo={setSelectedShow} />
          <div className="relative z-10 -mt-24">
            <CategoryTabs />
            <ContentRow
              title="Continue Watching"
              shows={continueWatching}
              size="md"
              onSelect={setSelectedShow}
            />
            <TopTenRow shows={topTen} onSelect={setSelectedShow} />
            <ContentRow
              title="Trending Now"
              shows={trending}
              size="md"
              onSelect={setSelectedShow}
            />
            <ContentRow
              title="New Releases"
              shows={newReleases}
              size="md"
              onSelect={setSelectedShow}
            />
            <ContentRow
              title="Action & Thriller"
              shows={action}
              size="lg"
              onSelect={setSelectedShow}
            />
            <ContentRow
              title="Critically Acclaimed"
              shows={acclaimed}
              size="md"
              onSelect={setSelectedShow}
            />
            <ContentRow
              title="Recommended TV Shows"
              shows={recommended}
              size="md"
              onSelect={setSelectedShow}
            />
          </div>
        </>
      )}

      <footer className="mt-16 px-4 md:px-12 pb-12 text-white/30 text-xs">
        <div className="flex items-center gap-4 mb-6">
          <a href="#" className="hover:text-white/60 transition-colors">
            Audio Description
          </a>
          <a href="#" className="hover:text-white/60 transition-colors">
            Help Center
          </a>
          <a href="#" className="hover:text-white/60 transition-colors">
            Gift Cards
          </a>
          <a href="#" className="hover:text-white/60 transition-colors">
            Media Centre
          </a>
          <a href="#" className="hover:text-white/60 transition-colors">
            Investor Relations
          </a>
          <a href="#" className="hover:text-white/60 transition-colors">
            Jobs
          </a>
          <a href="#" className="hover:text-white/60 transition-colors">
            Terms of Use
          </a>
          <a href="#" className="hover:text-white/60 transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-white/60 transition-colors">
            Cookie Preferences
          </a>
          <a href="#" className="hover:text-white/60 transition-colors">
            Corporate Information
          </a>
          <a href="#" className="hover:text-white/60 transition-colors">
            Contact Us
          </a>
        </div>
        <p className="text-white/20">&copy;STREAMFLIX 2026</p>
      </footer>

      <PreviewModal
        show={selectedShow}
        onClose={() => setSelectedShow(null)}
        onSelect={setSelectedShow}
      />
    </div>
  );
}
