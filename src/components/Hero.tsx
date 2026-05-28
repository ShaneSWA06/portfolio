import { useEffect, useRef, Component } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

const ROLES = ["Full-Stack Developer", "IT Student @ SP", "Problem Solver", "Open to Internships"];

// Error boundary for safety
class SplineErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch() {}
  render() {
    if (this.state.hasError) return (
      <div className="w-full h-full flex items-center justify-center opacity-20">
        <svg viewBox="0 0 200 300" width="180" fill="rgba(99,102,241,0.5)" xmlns="http://www.w3.org/2000/svg">
          <rect x="70" y="20" width="60" height="55" rx="28" />
          <rect x="55" y="85" width="90" height="100" rx="12" />
          <rect x="30" y="88" width="20" height="75" rx="10" />
          <rect x="150" y="88" width="20" height="75" rx="10" />
          <rect x="65" y="190" width="28" height="90" rx="10" />
          <rect x="107" y="190" width="28" height="90" rx="10" />
        </svg>
      </div>
    );
    return this.props.children;
  }
}

export default function Hero() {
  const twRef = useRef<HTMLSpanElement>(null);

  // Remove Spline watermark from shadow DOM
  useEffect(() => {
    const remove = () => {
      const viewer = document.querySelector("spline-viewer");
      if (!viewer?.shadowRoot) return;
      const badge = viewer.shadowRoot.querySelector("#logo");
      if (badge) { (badge as HTMLElement).style.display = "none"; return; }
      // Try all elements in shadow root
      viewer.shadowRoot.querySelectorAll("a, div[class]").forEach((el) => {
        const href = (el as HTMLAnchorElement).href || "";
        if (href.includes("spline") || el.textContent?.includes("Spline")) {
          (el as HTMLElement).style.display = "none";
        }
      });
    };
    // Try immediately and keep retrying until found
    const interval = setInterval(remove, 500);
    setTimeout(() => clearInterval(interval), 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let ri = 0, ci = 0, del = false;
    let to: ReturnType<typeof setTimeout>;
    const type = () => {
      const cur = ROLES[ri];
      if (!twRef.current) return;
      if (!del) {
        twRef.current.textContent = cur.slice(0, ++ci);
        if (ci === cur.length) { del = true; to = setTimeout(type, 2000); return; }
      } else {
        twRef.current.textContent = cur.slice(0, --ci);
        if (ci === 0) { del = false; ri = (ri + 1) % ROLES.length; }
      }
      to = setTimeout(type, del ? 28 : 65);
    };
    to = setTimeout(type, 800);
    return () => clearTimeout(to);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#0a0a0f" }}
    >
      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "72px 72px" }} aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-32 pointer-events-none" style={{ background: "linear-gradient(to bottom, #0a0a0f, transparent)" }} aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none" style={{ background: "linear-gradient(to top, #0a0a0f, transparent)" }} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-20 flex flex-col lg:flex-row items-center justify-between gap-8">

        {/* Left — text */}
        <div className="flex-1 text-left max-w-xl">
          <motion.div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{background:"#22c55e"}} aria-hidden="true" />
            <span className="text-xs font-medium tracking-wide" style={{color:"#22c55e"}}>Available · Sep 2026 – Feb 2027</span>
          </motion.div>

          <motion.h1 className="font-bold tracking-tight leading-none mb-5" style={{ fontSize: "clamp(36px, 6vw, 72px)", color: "#ffffff", letterSpacing: "-2px", whiteSpace: "nowrap" }} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}>
            Shane <span style={{ color: "#ffffff" }}>Wint Aung</span>
          </motion.h1>

          <motion.div className="font-mono text-base mb-6 h-6 flex items-center gap-1" style={{ color: "rgba(255,255,255,0.4)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.55 }} aria-live="polite">
            <span ref={twRef} />
            <span style={{ color: "#22c55e", animation: "blink 1s step-end infinite" }}>|</span>
          </motion.div>

          <motion.p className="text-base leading-relaxed mb-10 max-w-md" style={{ color: "rgba(255,255,255,0.4)" }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7 }}>
            Year 3 IT student at Singapore Polytechnic building full-stack apps that solve real problems — for clients, family, and myself.
          </motion.p>

          <motion.div className="flex flex-wrap items-center gap-3" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.85 }}>
            <a href="https://github.com/ShaneSWA06" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]" style={{ background: "#ffffff", color: "#0a0a0f" }}>View GitHub</a>
            <a href="https://linkedin.com/in/shanewintaung" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-[1.02]" style={{ color: "#ffffff", border: "1px solid rgba(255,255,255,0.08)" }}>LinkedIn</a>
            <a href="#timeline" className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-[1.02]" style={{ color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.08)" }} onClick={e => { e.preventDefault(); document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" }); }}>See My Work ↓</a>
          </motion.div>

          <motion.div className="flex flex-wrap items-center gap-2 mt-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.1 }}>
            {["TypeScript", "React", "Node.js", "PostgreSQL", "Figma", "UI/UX"].map((tech) => (
              <span key={tech} className="px-2.5 py-1 rounded-md text-xs font-medium" style={{ color: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.08)" }}>{tech}</span>
            ))}
          </motion.div>
        </div>

        {/* Right — Spline robot via web component */}
        <motion.div
          className="relative flex-shrink-0 w-full lg:w-[520px] h-[400px] lg:h-[560px] rounded-3xl overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0f0f1a 0%, #0a0a14 100%)", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "none" }}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          <SplineErrorBoundary>
            {/* @ts-ignore */}
            <spline-viewer
              url="https://prod.spline.design/Hwt8Mzxj9hzY67pr/scene.splinecode"
              events-target="global"
              style={{ width: "100%", height: "100%", display: "block" }}
            />
          </SplineErrorBoundary>

          <div className="absolute bottom-0 inset-x-0 h-32 pointer-events-none" style={{ background: "linear-gradient(to top, #0a0a0f 40%, transparent)" }} />
          <div className="absolute top-0 inset-x-0 h-16 pointer-events-none" style={{ background: "linear-gradient(to bottom, #0a0a0f, transparent)" }} />
          <div className="absolute inset-y-0 left-0 w-16 pointer-events-none" style={{ background: "linear-gradient(to right, #0a0a0f, transparent)" }} />
          <div className="absolute inset-y-0 right-0 w-8 pointer-events-none" style={{ background: "linear-gradient(to left, #0a0a0f, transparent)" }} />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} aria-hidden="true">
        <motion.div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)" }} animate={{ scaleY: [0, 1, 0], opacity: [0, 0.6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
      </motion.div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        spline-viewer::part(logo) { display: none !important; }
        spline-viewer::part(watermark) { display: none !important; }
        a[href*="spline.design"] { display: none !important; }
        #logo { display: none !important; }
        [class*="spline"] a { display: none !important; }
        spline-viewer > div { display: none !important; }
      `}</style>
    </section>
  );
}
