import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "About", id: "hero" },
  { label: "Work", id: "projects" },
  { label: "Journey", id: "timeline" },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" },
];

const scrollToId = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500"
        style={{
          background: scrolled ? "rgba(7,8,12,0.92)" : "transparent",
          borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,0.06)" : "transparent"}`,
        }}
      >
        <div className={`mx-auto flex max-w-[1440px] items-start justify-between px-5 sm:px-8 lg:px-14 transition-[padding] duration-500 ${scrolled ? "py-4" : "py-5"}`}>
          <button onClick={() => go("hero")} className="font-serif text-[28px] sm:text-[32px] leading-none text-paper tracking-tight">
            Shane<span className="text-accent">.</span>
          </button>

          {/* Center status */}
          <div className="hidden lg:flex items-center gap-6 pt-2 text-[14px]">
            <span className="flex items-center gap-2.5 text-white/45">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              Open to internships <span className="text-white/25">/</span>
              <span className="text-paper">Sep 2026</span>
            </span>
            <span className="h-5 w-px bg-white/12" />
            <span className="flex items-center gap-2 text-white/45">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" /></svg>
              Based in <span className="text-white/25">/</span>
              <span className="text-paper">Singapore</span>
            </span>
          </div>

          {/* Right stacked links */}
          <nav
            aria-label="Primary"
            className={`hidden md:flex items-end ${scrolled ? "flex-row gap-7 pt-1.5" : "flex-col gap-0.5"}`}
          >
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="group relative font-serif text-[17px] leading-[1.35] transition-colors duration-300"
                style={{ color: active === l.id ? "#f3f1ec" : "rgba(243,241,236,0.45)" }}
                aria-current={active === l.id ? "true" : undefined}
              >
                <span
                  className={`absolute size-1 rounded-full bg-accent transition-opacity duration-300 ${scrolled ? "-bottom-1.5 left-1/2 -translate-x-1/2" : "-left-4 top-1/2 -translate-y-1/2"}`}
                  style={{ opacity: active === l.id ? 1 : 0 }}
                />
                {l.label}
              </button>
            ))}
          </nav>

          <button
            className="md:hidden relative z-[60] flex flex-col gap-[6px] p-2 -mr-2"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <motion.span className="block h-px w-6 bg-paper" animate={{ rotate: open ? 45 : 0, y: open ? 3.5 : 0 }} />
            <motion.span className="block h-px w-6 bg-paper" animate={{ rotate: open ? -45 : 0, y: open ? -3.5 : 0 }} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[55] flex flex-col justify-between bg-ink/[0.98] px-6 pb-10 pt-28 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <nav aria-label="Mobile" className="flex flex-col gap-1">
              {NAV_LINKS.map((l, i) => (
                <motion.button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className="text-left font-serif text-5xl leading-tight"
                  style={{ color: active === l.id ? "#f3f1ec" : "rgba(243,241,236,0.4)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  {l.label}
                </motion.button>
              ))}
            </nav>
            <div className="label text-white/40">Open to internships · Sep 2026</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
