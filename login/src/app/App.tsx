import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1800&h=1200&fit=crop&auto=format";

const POSTERS = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=200&h=300&fit=crop&auto=format",
    title: "Neon City",
    style: { top: "18%", left: "8%", rotate: "-6deg", opacity: 0.55 },
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=200&h=300&fit=crop&auto=format",
    title: "Dark Hours",
    style: { top: "30%", left: "62%", rotate: "5deg", opacity: 0.45 },
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=200&h=300&fit=crop&auto=format",
    title: "Horizon",
    style: { top: "60%", left: "14%", rotate: "4deg", opacity: 0.4 },
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=200&h=300&fit=crop&auto=format",
    title: "The Vault",
    style: { top: "55%", left: "56%", rotate: "-4deg", opacity: 0.5 },
  },
];

export default function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <div
      className="min-h-screen w-full flex"
      style={{ fontFamily: "'Barlow Condensed', sans-serif", background: "#0A0908" }}
    >
      {/* ── Left Hero ── */}
      <div className="relative hidden lg:flex flex-col" style={{ width: "60%" }}>
        {/* Background image */}
        <img
          src={HERO_IMAGE}
          alt="Cinematic movie theater"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.35) saturate(0.7)" }}
        />

        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(10,9,8,0.92) 0%, rgba(73,17,28,0.35) 50%, rgba(10,9,8,0.88) 100%)",
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 35%, rgba(10,9,8,0.75) 100%)",
          }}
        />

        {/* Right-edge fade to form */}
        <div
          className="absolute inset-y-0 right-0 w-32"
          style={{
            background: "linear-gradient(to right, transparent, #0A0908)",
          }}
        />

        {/* Floating posters */}
        {POSTERS.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-lg overflow-hidden shadow-2xl"
            style={{
              top: p.style.top,
              left: p.style.left,
              width: 90,
              height: 134,
              rotate: p.style.rotate,
              opacity: p.style.opacity,
              boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
              transition: "opacity 0.3s",
            }}
          >
            <img src={p.url} alt={p.title} className="w-full h-full object-cover" />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(73,17,28,0.5), transparent)" }}
            />
          </div>
        ))}

        {/* Light streak accents */}
        <div
          className="absolute"
          style={{
            top: "20%",
            left: "25%",
            width: 2,
            height: "35%",
            background:
              "linear-gradient(to bottom, transparent, rgba(169,146,125,0.25), transparent)",
            transform: "rotate(15deg)",
          }}
        />
        <div
          className="absolute"
          style={{
            top: "45%",
            left: "45%",
            width: 1,
            height: "25%",
            background:
              "linear-gradient(to bottom, transparent, rgba(169,146,125,0.15), transparent)",
            transform: "rotate(-8deg)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between h-full p-12">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded flex items-center justify-center"
              style={{ background: "#49111C" }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <polygon points="5,3 19,12 5,21" fill="#F2F4F3" />
              </svg>
            </div>
            <span
              className="text-2xl tracking-[0.18em] font-bold uppercase"
              style={{ color: "#F2F4F3", letterSpacing: "0.2em" }}
            >
              STREAMFLIX
            </span>
          </div>

          {/* Headline block */}
          <div style={{ maxWidth: 480 }}>
            {/* Genre tag */}
            <div
              className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full text-xs tracking-widest uppercase"
              style={{
                border: "1px solid rgba(169,146,125,0.35)",
                color: "#A9927D",
                background: "rgba(169,146,125,0.07)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full inline-block"
                style={{ background: "#49111C" }}
              />
              Premium Streaming
            </div>

            <h1
              className="font-bold leading-none mb-6 uppercase"
              style={{
                fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
                color: "#F2F4F3",
                letterSpacing: "0.02em",
                lineHeight: 1.05,
              }}
            >
              Welcome Back<br />
              <span style={{ color: "#A9927D" }}>to STREAMFLIX</span>
            </h1>

            <p
              className="leading-relaxed font-light"
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "1.05rem",
                color: "rgba(242,244,243,0.65)",
                maxWidth: 400,
              }}
            >
              Sign in to continue watching your favorite movies, TV shows, and exclusive content.
            </p>

            {/* Stats row */}
            <div className="flex items-center gap-8 mt-10">
              {[
                { value: "10K+", label: "Titles" },
                { value: "4K", label: "Ultra HD" },
                { value: "150+", label: "Countries" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: "#A9927D", letterSpacing: "0.04em" }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-xs tracking-widest uppercase mt-0.5"
                    style={{ color: "rgba(242,244,243,0.4)" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer note */}
          <p
            className="text-xs tracking-widest uppercase"
            style={{ color: "rgba(242,244,243,0.25)" }}
          >
            © 2026 STREAMFLIX · All rights reserved
          </p>
        </div>
      </div>

      {/* ── Right Form ── */}
      <div
        className="flex flex-col justify-center flex-1 lg:flex-none overflow-y-auto"
        style={{
          width: "40%",
          minWidth: 360,
          background: "#0A0908",
          padding: "clamp(2rem, 5vw, 4rem) clamp(2rem, 6vw, 5rem)",
        }}
      >
        {/* Mobile logo */}
        <div className="flex items-center gap-2 mb-12 lg:hidden">
          <div
            className="w-7 h-7 rounded flex items-center justify-center"
            style={{ background: "#49111C" }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
              <polygon points="5,3 19,12 5,21" fill="#F2F4F3" />
            </svg>
          </div>
          <span
            className="text-xl tracking-[0.18em] font-bold uppercase"
            style={{ color: "#F2F4F3" }}
          >
            STREAMFLIX
          </span>
        </div>

        <div style={{ maxWidth: 420, width: "100%" }}>
          {/* Heading */}
          <div className="mb-10">
            <h2
              className="font-bold uppercase leading-none mb-2"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3rem)", color: "#F2F4F3", letterSpacing: "0.04em" }}
            >
              Sign In
            </h2>
            <p
              style={{
                fontFamily: "'Barlow', sans-serif",
                color: "rgba(242,244,243,0.5)",
                fontSize: "0.95rem",
              }}
            >
              Welcome back! Continue where you left off.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col"
            style={{ gap: 20 }}
          >
            {/* Email */}
            <div>
              <label
                className="block text-xs tracking-widest uppercase mb-2"
                style={{ color: "rgba(242,244,243,0.45)" }}
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute top-1/2 -translate-y-1/2 left-4 w-4 h-4 pointer-events-none"
                  style={{ color: focusedField === "email" ? "#A9927D" : "rgba(242,244,243,0.3)" }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-4 text-sm outline-none transition-all duration-200"
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${focusedField === "email" ? "#A9927D" : "rgba(94,80,63,0.4)"}`,
                    borderRadius: 11,
                    color: "#F2F4F3",
                    boxShadow: focusedField === "email" ? "0 0 0 3px rgba(169,146,125,0.1)" : "none",
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-xs tracking-widest uppercase mb-2"
                style={{ color: "rgba(242,244,243,0.45)" }}
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute top-1/2 -translate-y-1/2 left-4 w-4 h-4 pointer-events-none"
                  style={{ color: focusedField === "password" ? "#A9927D" : "rgba(242,244,243,0.3)" }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-4 text-sm outline-none transition-all duration-200"
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${focusedField === "password" ? "#A9927D" : "rgba(94,80,63,0.4)"}`,
                    borderRadius: 11,
                    color: "#F2F4F3",
                    boxShadow: focusedField === "password" ? "0 0 0 3px rgba(169,146,125,0.1)" : "none",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 -translate-y-1/2 right-4 transition-colors duration-200"
                  style={{ color: "rgba(242,244,243,0.35)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#A9927D")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(242,244,243,0.35)")}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember me + Forgot password */}
            <div className="flex items-center justify-between" style={{ marginTop: 2 }}>
              <label
                className="flex items-center gap-2.5 cursor-pointer select-none"
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  color: "rgba(242,244,243,0.55)",
                  fontSize: "0.875rem",
                }}
              >
                <div
                  className="relative flex items-center justify-center w-4 h-4 rounded transition-all duration-200"
                  style={{
                    border: `1.5px solid ${rememberMe ? "#A9927D" : "rgba(94,80,63,0.55)"}`,
                    background: rememberMe ? "rgba(169,146,125,0.15)" : "transparent",
                    cursor: "pointer",
                  }}
                  onClick={() => setRememberMe(!rememberMe)}
                >
                  {rememberMe && (
                    <svg viewBox="0 0 10 8" fill="none" className="w-2.5 h-2.5">
                      <path d="M1 4l2.5 2.5L9 1" stroke="#A9927D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                Remember Me
              </label>

              <button
                type="button"
                className="text-sm transition-all duration-200"
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  color: "#A9927D",
                  textDecoration: "none",
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#c4aa90";
                  e.currentTarget.style.textDecoration = "underline";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#A9927D";
                  e.currentTarget.style.textDecoration = "none";
                }}
              >
                Forgot Password?
              </button>
            </div>

            {/* Sign In button */}
            <button
              type="submit"
              className="w-full py-4 font-bold uppercase tracking-widest transition-all duration-250 mt-2"
              style={{
                background: "#49111C",
                color: "#F2F4F3",
                borderRadius: 11,
                fontSize: "1rem",
                letterSpacing: "0.14em",
                border: "1px solid rgba(73,17,28,0.8)",
                boxShadow: "0 4px 20px rgba(73,17,28,0.4)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#5c1522";
                e.currentTarget.style.boxShadow = "0 6px 32px rgba(73,17,28,0.7)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#49111C";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(73,17,28,0.4)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Sign In
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-1">
              <div className="flex-1 h-px" style={{ background: "rgba(94,80,63,0.3)" }} />
              <span
                className="text-xs tracking-widest uppercase"
                style={{ color: "rgba(242,244,243,0.3)" }}
              >
                or
              </span>
              <div className="flex-1 h-px" style={{ background: "rgba(94,80,63,0.3)" }} />
            </div>

            {/* Social buttons */}
            <div className="flex flex-col gap-3">
              <SocialButton
                icon={
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                }
                label="Continue with Google"
              />
              <SocialButton
                icon={
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#F2F4F3">
                    <path d="M11.4 24H0V12.6L11.4 24zM12.6 24H24V12.6L12.6 24zM24 11.4V0H12.6L24 11.4zM11.4 0H0v11.4L11.4 0z" />
                  </svg>
                }
                label="Continue with Microsoft"
              />
            </div>
          </form>

          {/* Footer */}
          <p
            className="text-center mt-10 text-sm"
            style={{ fontFamily: "'Barlow', sans-serif", color: "rgba(242,244,243,0.4)" }}
          >
            Don&apos;t have an account?{" "}
            <button
              className="transition-all duration-200"
              style={{ color: "#A9927D", background: "none", border: "none", padding: 0, cursor: "pointer" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#c4aa90";
                e.currentTarget.style.textDecoration = "underline";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#A9927D";
                e.currentTarget.style.textDecoration = "none";
              }}
            >
              Create Account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

function SocialButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      className="w-full flex items-center justify-center gap-3 py-3.5 text-sm font-medium tracking-wide transition-all duration-200"
      style={{
        fontFamily: "'Barlow', sans-serif",
        background: "transparent",
        border: "1px solid rgba(94,80,63,0.45)",
        borderRadius: 11,
        color: "#F2F4F3",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.border = "1px solid rgba(169,146,125,0.5)";
        e.currentTarget.style.background = "rgba(94,80,63,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.border = "1px solid rgba(94,80,63,0.45)";
        e.currentTarget.style.background = "transparent";
      }}
    >
      {icon}
      {label}
    </button>
  );
}
