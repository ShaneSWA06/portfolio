import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "./components/Hero";
import Timeline from "./components/Timeline";
import ProjectCards from "./components/ProjectCards";
import Skills from "./components/Skills";
import Contact from "./components/Contact";

// ── Loading Screen ────────────────────────────────────────────────────────────
function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 1800;
    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));
      if (p < 1) requestAnimationFrame(tick);
      else setTimeout(onDone, 300);
    };
    requestAnimationFrame(tick);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: "#0a0a0f" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center">
        <motion.h1
          className="font-bold text-white tracking-tight mb-1"
          style={{ fontSize: "clamp(22px, 5vw, 32px)", letterSpacing: "-0.5px" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Shane Wint Aung
        </motion.h1>
        <motion.p
          className="font-mono text-xs mb-10 tracking-widest uppercase"
          style={{ color: "rgba(255,255,255,0.25)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          Portfolio
        </motion.p>
        <motion.div
          className="relative overflow-hidden rounded-full"
          style={{ width: "clamp(160px, 40vw, 240px)", height: 2, background: "rgba(255,255,255,0.08)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ width: `${progress}%`, background: "rgba(255,255,255,0.7)" }}
          />
        </motion.div>
        <motion.span
          className="font-mono text-[10px] mt-3"
          style={{ color: "rgba(255,255,255,0.2)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          {progress}%
        </motion.span>
      </div>
    </motion.div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "About", href: "#hero" },
  { label: "Journey", href: "#timeline" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["hero", "timeline", "projects", "skills", "contact"];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(`#${e.target.id}`); }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-10"
        style={{
          height: 56,
          background: scrolled ? "rgba(10,10,15,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
          transition: "all 0.3s",
        }}
      >
        <button onClick={() => scrollTo("#hero")} className="font-semibold text-sm text-white focus-visible:outline-none" style={{ letterSpacing: "-0.3px" }}>
          Shane Wint Aung
        </button>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <button key={link.href} onClick={() => scrollTo(link.href)}
              className="relative px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 focus-visible:outline-none"
              style={{ color: active === link.href ? "#fff" : "rgba(255,255,255,0.45)" }}
            >
              {active === link.href && (
                <motion.div className="absolute inset-0 rounded-lg" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }} layoutId="nav-active" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
              )}
              <span className="relative z-10">{link.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a href="mailto:shanewintaung@gmail.com" className="hidden md:flex px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 hover:opacity-90"
            style={{ background: "#ffffff", color: "#0a0a0f" }}>
            Hire Me
          </a>
          <button className="md:hidden flex flex-col gap-[5px] p-2 focus-visible:outline-none" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <motion.span className="block h-[1.5px] w-5 rounded-full bg-white" animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6.5 : 0 }} transition={{ duration: 0.2 }} />
            <motion.span className="block h-[1.5px] w-5 rounded-full bg-white" animate={{ opacity: menuOpen ? 0 : 1 }} transition={{ duration: 0.2 }} />
            <motion.span className="block h-[1.5px] w-5 rounded-full bg-white" animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6.5 : 0 }} transition={{ duration: 0.2 }} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="fixed inset-0 z-30 flex flex-col pt-14" style={{ background: "rgba(10,10,15,0.97)", backdropFilter: "blur(16px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <div className="flex flex-col items-center justify-center flex-1 gap-2 px-6">
              {NAV_LINKS.map((link, i) => (
                <motion.button key={link.href} onClick={() => scrollTo(link.href)}
                  className="w-full max-w-xs py-4 text-center font-semibold rounded-xl transition-colors duration-200"
                  style={{ fontSize: "clamp(18px, 5vw, 24px)", color: active === link.href ? "#fff" : "rgba(255,255,255,0.45)", background: active === link.href ? "rgba(255,255,255,0.06)" : "transparent", border: active === link.href ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent" }}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                  {link.label}
                </motion.button>
              ))}
              <motion.a href="mailto:shanewintaung@gmail.com" className="mt-4 w-full max-w-xs py-3.5 text-center font-semibold rounded-xl"
                style={{ background: "#ffffff", color: "#0a0a0f" }}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: NAV_LINKS.length * 0.06 }}
                onClick={() => setMenuOpen(false)}>
                Hire Me
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {!loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <Navbar />
            <div id="hero" style={{ background: "#0a0a0f" }}>
              <Hero />
            </div>
            <Timeline />
            <ProjectCards />
            <Skills />
            <Contact />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
