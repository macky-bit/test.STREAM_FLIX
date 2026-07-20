import { useState } from "react";
import { Eye, EyeOff, User, AtSign, Mail, Lock, Play, Star } from "lucide-react";

const HERO_BG =
  "https://images.unsplash.com/photo-1611339641187-9da7660e05cd?w=1400&h=1080&fit=crop&auto=format";

const THUMBNAILS = [
  {
    src: "https://images.unsplash.com/photo-1767570076534-abf94ea2ec61?w=240&h=340&fit=crop&auto=format",
    alt: "Silhouetted figure against orange light",
    title: "The Last Signal",
    rating: "8.4",
  },
  {
    src: "https://images.unsplash.com/photo-1762274830558-f93c2fe9bd0a?w=240&h=340&fit=crop&auto=format",
    alt: "Woman illuminated by red light",
    title: "Neon Requiem",
    rating: "9.1",
  },
  {
    src: "https://images.unsplash.com/photo-1767358536907-f46dffc92492?w=240&h=340&fit=crop&auto=format",
    alt: "Woman holding martini in dark bar",
    title: "After Midnight",
    rating: "7.8",
  },
  {
    src: "https://images.unsplash.com/photo-1762274830531-094bfc02b6cc?w=240&h=340&fit=crop&auto=format",
    alt: "Woman in red and green dramatic light",
    title: "Chromatic",
    rating: "8.7",
  },
  {
    src: "https://images.unsplash.com/photo-1768400595620-fc620f445b97?w=240&h=340&fit=crop&auto=format",
    alt: "Young woman with lollipop through glass",
    title: "Glass City",
    rating: "7.5",
  },
];

function StreamflixLogo() {
  return (
    <div className="flex items-center gap-2 select-none">
      <div
        className="flex items-center justify-center w-8 h-8 rounded"
        style={{ background: "#49111C" }}
      >
        <Play size={14} fill="#F2F4F3" color="#F2F4F3" />
      </div>
      <span
        className="text-2xl font-black tracking-widest uppercase"
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          color: "#F2F4F3",
          letterSpacing: "0.18em",
        }}
      >
        STREAMFLIX
      </span>
    </div>
  );
}

function FloatingThumbnail({
  src,
  alt,
  title,
  rating,
  style,
  delay,
}: {
  src: string;
  alt: string;
  title: string;
  rating: string;
  style: React.CSSProperties;
  delay: string;
}) {
  return (
    <div
      className="absolute rounded-xl overflow-hidden shadow-2xl group cursor-default"
      style={{
        ...style,
        animation: `floatCard 6s ease-in-out infinite`,
        animationDelay: delay,
        background: "#1A1614",
      }}
    >
      <div className="relative" style={{ width: 110, height: 155 }}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          style={{ display: "block" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(10,9,8,0.9) 0%, transparent 50%)",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-2">
          <p
            className="text-xs font-bold leading-tight truncate"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              color: "#F2F4F3",
              fontSize: "0.65rem",
              letterSpacing: "0.05em",
            }}
          >
            {title}
          </p>
          <div className="flex items-center gap-1 mt-0.5">
            <Star size={8} fill="#A9927D" color="#A9927D" />
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                color: "#A9927D",
                fontSize: "0.6rem",
                fontWeight: 600,
              }}
            >
              {rating}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputField({
  id,
  label,
  type,
  placeholder,
  icon: Icon,
  value,
  onChange,
  rightElement,
}: {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  icon: React.ElementType;
  value: string;
  onChange: (v: string) => void;
  rightElement?: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          color: "#A9927D",
          fontSize: "0.75rem",
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </label>
      <div
        className="relative flex items-center transition-all duration-200"
        style={{
          background: "rgba(26,22,20,0.7)",
          border: `1px solid ${focused ? "#A9927D" : "rgba(94,80,63,0.35)"}`,
          borderRadius: 11,
          boxShadow: focused ? "0 0 0 3px rgba(169,146,125,0.08)" : "none",
          transition: "border-color 200ms, box-shadow 200ms",
        }}
      >
        <div className="absolute left-4" style={{ color: focused ? "#A9927D" : "#5E503F", transition: "color 200ms" }}>
          <Icon size={15} />
        </div>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent outline-none pl-11 pr-4 py-3.5"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            color: "#F2F4F3",
            fontSize: "1rem",
            fontWeight: 400,
            letterSpacing: "0.02em",
          }}
        />
        {rightElement && (
          <div className="absolute right-4">{rightElement}</div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const set = (field: keyof typeof form) => (v: string) =>
    setForm((prev) => ({ ...prev, [field]: v }));

  return (
    <div
      className="min-h-screen w-full flex"
      style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        background: "#0A0908",
      }}
    >
      <style>{`
        @keyframes floatCard {
          0%, 100% { transform: translateY(0px) rotate(var(--rot, 0deg)); }
          50% { transform: translateY(-12px) rotate(var(--rot, 0deg)); }
        }
        input::placeholder { color: rgba(94,80,63,0.7); }
        ::-webkit-scrollbar { display: none; }
        * { scrollbar-width: none; }
      `}</style>

      {/* LEFT HERO — 60% */}
      <div
        className="relative hidden lg:flex flex-col"
        style={{ flex: "0 0 60%", minHeight: "100vh", overflow: "hidden" }}
      >
        {/* Background image */}
        <div className="absolute inset-0" style={{ background: "#0A0908" }}>
          <img
            src={HERO_BG}
            alt="Cinematic hero background"
            className="w-full h-full object-cover"
            style={{ opacity: 0.45 }}
          />
          {/* Overlays */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(10,9,8,0.75) 0%, rgba(73,17,28,0.25) 50%, rgba(10,9,8,0.6) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(10,9,8,0.0) 60%, rgba(10,9,8,1) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(10,9,8,0.8) 0%, transparent 40%)",
            }}
          />
          {/* Vignette accent glow */}
          <div
            className="absolute"
            style={{
              top: "30%",
              left: "20%",
              width: 400,
              height: 400,
              background: "radial-gradient(circle, rgba(73,17,28,0.35) 0%, transparent 70%)",
              borderRadius: "50%",
              filter: "blur(60px)",
            }}
          />
        </div>

        {/* Logo top-left */}
        <div className="relative z-10 p-10">
          <StreamflixLogo />
        </div>

        {/* Floating thumbnails */}
        <FloatingThumbnail
          {...THUMBNAILS[0]}
          style={{ top: "18%", left: "12%", "--rot": "-4deg" } as React.CSSProperties}
          delay="0s"
        />
        <FloatingThumbnail
          {...THUMBNAILS[1]}
          style={{ top: "12%", left: "34%", "--rot": "3deg" } as React.CSSProperties}
          delay="1.2s"
        />
        <FloatingThumbnail
          {...THUMBNAILS[2]}
          style={{ top: "22%", right: "14%", "--rot": "-2deg" } as React.CSSProperties}
          delay="2.1s"
        />
        <FloatingThumbnail
          {...THUMBNAILS[3]}
          style={{ bottom: "26%", left: "8%", "--rot": "5deg" } as React.CSSProperties}
          delay="0.7s"
        />
        <FloatingThumbnail
          {...THUMBNAILS[4]}
          style={{ bottom: "22%", left: "32%", "--rot": "-3deg" } as React.CSSProperties}
          delay="1.8s"
        />

        {/* Hero text bottom */}
        <div className="relative z-10 mt-auto p-10 pb-14">
          <div className="max-w-xl">
            <p
              className="mb-3 uppercase tracking-widest"
              style={{
                color: "#A9927D",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.22em",
              }}
            >
              Premium Streaming
            </p>
            <h1
              className="font-black leading-none mb-5"
              style={{
                fontSize: "clamp(2.8rem, 4.5vw, 5rem)",
                color: "#F2F4F3",
                lineHeight: 0.92,
                letterSpacing: "-0.01em",
                textTransform: "uppercase",
              }}
            >
              Unlimited
              <br />
              <span style={{ color: "#A9927D" }}>Movies,</span>
              <br />
              TV Shows,
              <br />
              <span
                className="italic font-light"
                style={{ color: "rgba(242,244,243,0.55)" }}
              >
                and More.
              </span>
            </h1>
            <p
              style={{
                color: "rgba(242,244,243,0.6)",
                fontSize: "1.05rem",
                fontWeight: 400,
                lineHeight: 1.55,
                maxWidth: 440,
              }}
            >
              Create your account and start streaming thousands of titles
              anytime, anywhere — in stunning quality.
            </p>

            {/* Stats row */}
            <div className="flex items-center gap-8 mt-8">
              {[
                { value: "50K+", label: "Titles" },
                { value: "4K", label: "Ultra HD" },
                { value: "190+", label: "Countries" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p
                    className="font-black"
                    style={{ color: "#F2F4F3", fontSize: "1.5rem", lineHeight: 1 }}
                  >
                    {value}
                  </p>
                  <p
                    style={{
                      color: "#5E503F",
                      fontSize: "0.7rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT FORM — 40% */}
      <div
        className="flex flex-col flex-1 overflow-y-auto"
        style={{
          background: "rgba(10,9,8,0.98)",
          borderLeft: "1px solid rgba(94,80,63,0.15)",
          minHeight: "100vh",
        }}
      >
        {/* Mobile logo */}
        <div className="flex lg:hidden p-6 pb-0">
          <StreamflixLogo />
        </div>

        <div className="flex flex-col justify-center flex-1 px-8 py-10 sm:px-12 lg:px-14 xl:px-16 max-w-lg w-full mx-auto">
          {/* Heading */}
          <div className="mb-10">
            <p
              className="uppercase mb-2"
              style={{
                color: "#49111C",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.25em",
              }}
            >
              Get Started
            </p>
            <h2
              className="font-black uppercase leading-none mb-3"
              style={{
                color: "#F2F4F3",
                fontSize: "clamp(2.2rem, 3.5vw, 3.2rem)",
                letterSpacing: "-0.01em",
              }}
            >
              Create
              <br />
              Account
            </h2>
            <p
              style={{
                color: "rgba(169,146,125,0.8)",
                fontSize: "0.95rem",
                fontWeight: 400,
                lineHeight: 1.5,
              }}
            >
              Join STREAMFLIX and enjoy unlimited entertainment.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-4"
          >
            <InputField
              id="fullName"
              label="Full Name"
              type="text"
              placeholder="Alexandra Chen"
              icon={User}
              value={form.fullName}
              onChange={set("fullName")}
            />
            <InputField
              id="username"
              label="Username"
              type="text"
              placeholder="alex_chen"
              icon={AtSign}
              value={form.username}
              onChange={set("username")}
            />
            <InputField
              id="email"
              label="Email Address"
              type="email"
              placeholder="alex@email.com"
              icon={Mail}
              value={form.email}
              onChange={set("email")}
            />
            <InputField
              id="password"
              label="Password"
              type={showPass ? "text" : "password"}
              placeholder="Create a strong password"
              icon={Lock}
              value={form.password}
              onChange={set("password")}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="flex items-center justify-center transition-colors duration-200"
                  style={{ color: "#5E503F" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#A9927D")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#5E503F")
                  }
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              }
            />
            <InputField
              id="confirm"
              label="Confirm Password"
              type={showConfirm ? "text" : "password"}
              placeholder="Repeat your password"
              icon={Lock}
              value={form.confirm}
              onChange={set("confirm")}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="flex items-center justify-center transition-colors duration-200"
                  style={{ color: "#5E503F" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#A9927D")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#5E503F")
                  }
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              }
            />

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer group mt-1">
              <div className="relative mt-0.5 flex-shrink-0">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className="w-4 h-4 rounded flex items-center justify-center transition-all duration-200"
                  style={{
                    background: agreed ? "#49111C" : "transparent",
                    border: `1px solid ${agreed ? "#49111C" : "rgba(94,80,63,0.5)"}`,
                  }}
                >
                  {agreed && (
                    <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                      <path
                        d="M1 3.5L3.5 6L8 1"
                        stroke="#F2F4F3"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  color: "rgba(169,146,125,0.7)",
                  fontSize: "0.85rem",
                  lineHeight: 1.5,
                  fontWeight: 400,
                }}
              >
                I agree to the{" "}
                <span
                  style={{ color: "#A9927D", textDecoration: "underline", cursor: "pointer" }}
                >
                  Terms of Service
                </span>{" "}
                and{" "}
                <span
                  style={{ color: "#A9927D", textDecoration: "underline", cursor: "pointer" }}
                >
                  Privacy Policy
                </span>
                .
              </span>
            </label>

            {/* Primary CTA */}
            <button
              type="submit"
              className="w-full mt-2 font-bold uppercase tracking-widest transition-all duration-200 active:scale-[0.98]"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                background: "#49111C",
                color: "#F2F4F3",
                fontSize: "0.9rem",
                letterSpacing: "0.18em",
                borderRadius: 11,
                padding: "14px 24px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 24px rgba(73,17,28,0.35)",
                transition: "background 200ms, box-shadow 200ms, transform 150ms",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "#5e1624";
                el.style.boxShadow = "0 8px 32px rgba(73,17,28,0.55)";
                el.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "#49111C";
                el.style.boxShadow = "0 4px 24px rgba(73,17,28,0.35)";
                el.style.transform = "translateY(0)";
              }}
            >
              Create Account
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-1">
              <div
                className="flex-1 h-px"
                style={{ background: "rgba(94,80,63,0.25)" }}
              />
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  color: "#5E503F",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                OR
              </span>
              <div
                className="flex-1 h-px"
                style={{ background: "rgba(94,80,63,0.25)" }}
              />
            </div>

            {/* Social buttons */}
            <div className="flex flex-col gap-3">
              {[
                {
                  label: "Continue with Google",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  ),
                },
                {
                  label: "Continue with Microsoft",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <rect x="1" y="1" width="10.5" height="10.5" fill="#F25022"/>
                      <rect x="12.5" y="1" width="10.5" height="10.5" fill="#7FBA00"/>
                      <rect x="1" y="12.5" width="10.5" height="10.5" fill="#00A4EF"/>
                      <rect x="12.5" y="12.5" width="10.5" height="10.5" fill="#FFB900"/>
                    </svg>
                  ),
                },
              ].map(({ label, icon }) => (
                <button
                  key={label}
                  type="button"
                  className="w-full flex items-center justify-center gap-3 font-medium transition-all duration-200"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    background: "transparent",
                    color: "#F2F4F3",
                    fontSize: "0.9rem",
                    letterSpacing: "0.06em",
                    borderRadius: 11,
                    padding: "12px 24px",
                    border: "1px solid rgba(94,80,63,0.4)",
                    cursor: "pointer",
                    transition: "border-color 200ms, background 200ms",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(169,146,125,0.5)";
                    el.style.background = "rgba(94,80,63,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(94,80,63,0.4)";
                    el.style.background = "transparent";
                  }}
                >
                  {icon}
                  {label}
                </button>
              ))}
            </div>
          </form>

          {/* Sign in link */}
          <p
            className="mt-8 text-center"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              color: "rgba(169,146,125,0.55)",
              fontSize: "0.9rem",
              fontWeight: 400,
            }}
          >
            Already have an account?{" "}
            <a
              href="#"
              style={{
                color: "#A9927D",
                fontWeight: 600,
                textDecoration: "none",
                borderBottom: "1px solid transparent",
                transition: "border-color 200ms",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderBottomColor = "#A9927D";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderBottomColor = "transparent";
              }}
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
