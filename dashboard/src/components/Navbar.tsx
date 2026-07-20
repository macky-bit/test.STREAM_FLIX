import { useState } from "react";
import { Search, Bell, ChevronDown, X } from "lucide-react";
import { Logo } from "./Logo";

export function Navbar({ scrolled }: { scrolled: boolean }) {
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    "Home",
    "TV Shows",
    "Movies",
    "New & Popular",
    "My List",
    "Browse by Language",
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0a0a]"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-12 py-4">
        <div className="flex items-center gap-8">
          <Logo />
          <div className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => (
              <button
                key={link}
                className={`text-sm transition-colors ${
                  link === "Home"
                    ? "text-white font-semibold"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link}
              </button>
            ))}
          </div>
          <button className="md:hidden flex items-center gap-1 text-white text-sm font-semibold">
            Browse <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {searchOpen ? (
              <div className="flex items-center gap-2 bg-black/80 border border-white/40 px-3 py-1.5 rounded-sm">
                <Search className="w-4 h-4 text-white" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Titles, people, genres"
                  className="bg-transparent text-white text-sm outline-none w-40 placeholder-white/50"
                />
                <button onClick={() => setSearchOpen(false)}>
                  <X className="w-4 h-4 text-white/60 hover:text-white" />
                </button>
              </div>
            ) : (
              <button onClick={() => setSearchOpen(true)}>
                <Search className="w-5 h-5 text-white hover:text-white/70 transition-colors" />
              </button>
            )}
          </div>
          <button className="relative">
            <Bell className="w-5 h-5 text-white hover:text-white/70 transition-colors" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#e50914] rounded-full" />
          </button>
          <button className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-[#e50914] to-[#8b1a1a] flex items-center justify-center">
              <span className="text-white text-xs font-bold font-['Barlow_Condensed']">
                A
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-white group-hover:rotate-180 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </nav>
  );
}
