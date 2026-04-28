import { useState, useEffect, useRef } from "react";
import "./RevMindHero.css";

const TYPEWRITER_PHRASES = [
  "still guessing your next move?",
  "missing hidden revenue trends?",
  "drowning in manual reports?",
  "making decisions too slowly?",
];

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1.5,
  duration: Math.random() * 8 + 6,
  delay: Math.random() * 5,
  color: ["#4F8EF7", "#E0407B", "#FF8C42", "#6A5ACD"][i % 4],
  opacity: Math.random() * 0.45 + 0.15,
}));

const MINI_STATS = [
  { label: "Revenue", val: "₹4.2L", color: "#4F8EF7", trend: "↑ 12%" },
  { label: "Orders",  val: "1,284", color: "#E0407B", trend: "↑ 8%"  },
  { label: "Profit%", val: "34%",   color: "#FF8C42", trend: "↓ 3%"  },
];

const BAR_HEIGHTS = [55, 68, 45, 80, 72, 90, 85];

export default function RevMindHero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [visible, setVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    // Fade in the current phrase
    setFadeIn(true);
    const displayTimer = setTimeout(() => {
      setFadeIn(false);
    }, 3200);

    const nextTimer = setTimeout(() => {
      setPhraseIndex((i) => (i + 1) % TYPEWRITER_PHRASES.length);
    }, 3600);

    return () => {
      clearTimeout(displayTimer);
      clearTimeout(nextTimer);
    };
  }, [phraseIndex]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  // Only truly dynamic values stay as inline styles
  const entranceStyle = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(28px)",
    transition: "opacity 0.9s ease, transform 0.9s ease",
  };

  const mockupEntranceStyle = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(40px)",
    transition: "opacity 1.1s 0.3s ease, transform 1.1s 0.3s ease",
  };

  return (
    <div className="hero-root">

      {/* Watercolor blobs */}
      <div className="blob-blue" />
      <div className="blob-pink" />
      <div className="blob-orange" />
      <div className="grid-overlay" />

      {/* Floating particles — position/size/color are data-driven, stay inline */}
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            opacity: p.opacity,
            animation: `floatParticle ${p.duration}s ${p.delay}s infinite ease-in-out alternate`,
          }}
        />
      ))}

      {/* Centered max-width container */}
      <div className="hero-container">

        {/* Navbar */}
        <nav className="hero-nav">
          <div className="nav-logo">
            <div className="logo-mark">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L18 7V13L10 18L2 13V7L10 2Z" stroke="#4F8EF7" strokeWidth="1.5" fill="none" />
                <circle cx="10" cy="10" r="3" fill="#E0407B" />
              </svg>
            </div>
            <span className="logo-text">RevMind</span>
          </div>

          <div className="nav-links">
            {["Features", "How it works", "Pricing"].map((link) => (
              <a key={link} href="#" className="nav-link">{link}</a>
            ))}
          </div>

          <button className="nav-cta">Start Free Trial</button>
        </nav>

        {/* Hero main two-column grid */}
        <main className="hero-main">

          {/* Left — text content */}
          <div className="hero-content" style={entranceStyle}>
            <h1 className="hero-h1">
              Is your business
              <br />
              <span className="typewriter-wrap" style={{ opacity: fadeIn ? 1 : 0 }}>
                <span className="typewriter-text">{TYPEWRITER_PHRASES[phraseIndex]}</span>
              </span>
            </h1>

            <p className="hero-sub">
              RevMind turns your everyday business data into clear,
              <br />
              actionable insights — instantly. No tech skills needed.
            </p>

            <div className="cta-row">
              <button className="cta-primary">
                Start Free 14-day Trial
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: 8 }}>
                  <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button className="cta-secondary">
                <span className="play-icon">▶</span>
                Watch Demo
              </button>
            </div>

            <p className="hero-trust">Free 14-day trial · No credit card · Cancel anytime</p>
          </div>

          {/* Right — dashboard mockup */}
          <div className="mockup-wrap" style={mockupEntranceStyle}>
            <div className="mockup">
              <div className="mockup-bar">
                <span className="mockup-dot" style={{ background: "#FF5F57" }} />
                <span className="mockup-dot" style={{ background: "#FF8C42" }} />
                <span className="mockup-dot" style={{ background: "#4F8EF7" }} />
                <span className="mockup-title">RevMind Dashboard</span>
              </div>

              <div className="mockup-body">

                {/* Mini stat cards */}
                <div className="mini-stats">
                  {MINI_STATS.map((s) => (
                    <div
                      key={s.label}
                      className="mini-stat"
                      style={{ borderTop: `2px solid ${s.color}` }}
                    >
                      <span className="mini-label">{s.label}</span>
                      <span className="mini-val" style={{ color: s.color }}>{s.val}</span>
                      <span
                        className="mini-trend"
                        style={{ color: s.trend.startsWith("↑") ? "#4F8EF7" : "#E0407B" }}
                      >
                        {s.trend}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bar chart */}
                <div className="chart">
                  <span className="chart-label">Monthly Revenue Trend</span>
                  <div className="bars">
                    {BAR_HEIGHTS.map((h, i) => (
                      <div key={i} className="bar-col">
                        <div
                          className="bar"
                          style={{
                            height: `${h}%`,
                            background:
                              i === 5 ? "linear-gradient(180deg, #4F8EF7, #6A5ACD)" :
                              i === 6 ? "linear-gradient(180deg, #E0407B, #FF8C42)" :
                              "rgba(255,255,255,0.1)",
                            animation: `barRise 0.6s ${i * 0.08}s both ease-out`,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI alert */}
                <div className="alert">
                  <span className="alert-dot" />
                  <div>
                    <span className="alert-title">AI Insight</span>
                    <p className="alert-text">
                      Sales peak on Fridays — increase stock by 20% this week.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </main>

        {/* Stats row */}
        <div ref={statsRef} className="stats-row">
          {[
            { num: 63, suffix: "M+", label: "Indian MSMEs ready to grow", color: "#4F8EF7" },
            { num: 3,  suffix: "x",  label: "faster business decisions",  color: "#E0407B" },
            { num: 40, suffix: "%",  label: "average revenue increase",   color: "#FF8C42" },
          ].map((s) => (
            <div key={s.label} className="stat">
              <CountUp target={s.num} suffix={s.suffix} run={statsVisible} color={s.color} />
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>

      </div>{/* end hero-container */}
    </div>
  );
}

function CountUp({ target, suffix, run, color }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!run) return;
    let current = 0;
    const step = 16;
    const increment = target / (1400 / step);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, step);
    return () => clearInterval(timer);
  }, [run, target]);

  return (
    <span className="stat-num" style={{ color }}>{count}{suffix}</span>
  );
}