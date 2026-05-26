import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ROLES = ["Full-Stack Developer", "IT Student @ SP", "Problem Solver", "Open to Internships"];

export default function Hero() {
  const twRef = useRef<HTMLSpanElement>(null);

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
      className="relative min-h-screen flex flex-col items-center justify-center"
      style={{ background: "#0a0a0f" }}
    >
      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 top-0 h-32 pointer-events-none" style={{ background: "linear-gradient(to bottom, #0a0a0f, transparent)" }} aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none" style={{ background: "linear-gradient(to top, #0a0a0f, transparent)" }} aria-hidden="true" />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-10"
          style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" aria-hidden="true" />
          <span className="text-indigo-400 text-xs font-medium tracking-wide">Available · Sep 2026 – Feb 2027</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          className="font-bold tracking-tight leading-none mb-6"
          style={{ fontSize: "clamp(52px, 9vw, 96px)", color: "#ffffff", letterSpacing: "-2px" }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          Shane <span style={{ color: "#6366f1" }}>Wint Aung</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          className="font-mono text-base mb-8 h-6 flex items-center justify-center gap-1"
          style={{ color: "rgba(255,255,255,0.4)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          aria-live="polite"
        >
          <span ref={twRef} />
          <span style={{ color: "#6366f1", animation: "blink 1s step-end infinite" }}>|</span>
        </motion.div>

        {/* Bio */}
        <motion.p
          className="text-base leading-relaxed mb-12 max-w-md mx-auto"
          style={{ color: "rgba(255,255,255,0.4)" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          Year 3 IT student at Singapore Polytechnic building full-stack apps
          that solve real problems — for clients, family, and myself.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.85 }}
        >
          <a
            href="https://github.com/ShaneSWA06"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
            style={{ background: "#6366f1" }}
          >
            View GitHub
          </a>
          <a
            href="https://linkedin.com/in/shanewintaung"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-[1.02]"
            style={{ color: "#ffffff", border: "1px solid rgba(255,255,255,0.08)", background: "transparent" }}
          >
            LinkedIn
          </a>
          <a
            href="#timeline"
            className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-[1.02]"
            style={{ color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.08)", background: "transparent" }}
            onClick={e => { e.preventDefault(); document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" }); }}
          >
            See My Work ↓
          </a>
        </motion.div>

        {/* Tech pills */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 mt-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          {["TypeScript", "React", "Node.js", "PostgreSQL", "Prisma", "Supabase"].map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md text-xs font-medium"
              style={{ color: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        aria-hidden="true"
      >
        <motion.div
          style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #6366f1, transparent)" }}
          animate={{ scaleY: [0, 1, 0], opacity: [0, 0.6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </section>
  );
}
