import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { projects } from "../data/timelineData";
import ProjectCover from "./ProjectCover";
import Signature from "./Signature";

/** Drop your photo here. A cut-out PNG with a transparent background looks best. */
const PHOTO_SRC = "/images/shane.png";
const EMAIL = "shanewintaung2006@gmail.com";

const ease = [0.16, 1, 0.3, 1] as const;

// ── 3D ribbon of project screenshots, curving around behind the photo ─────────
const CARD_COUNT = 14;
const STEP = 360 / CARD_COUNT;
const VISIBLE = 60; // degrees either side of centre that are rendered

function Ribbon() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const items = Array.from({ length: CARD_COUNT }, (_, i) => projects[i % projects.length]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let rot = 0;
    let last = performance.now();
    let hover = 1;

    const wrap = wrapRef.current;
    const onEnter = () => (hover = 0.25);
    const onLeave = () => (hover = 1);
    wrap?.addEventListener("pointerenter", onEnter);
    wrap?.addEventListener("pointerleave", onLeave);

    let lastY = window.scrollY;
    let boost = 0;

    // only animate while the hero is on screen and the tab is visible
    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      const was = visible;
      visible = e.isIntersecting;
      if (visible && !was && !document.hidden) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });
    if (wrap) io.observe(wrap);
    const onVis = () => {
      if (!document.hidden && visible) {
        cancelAnimationFrame(raf);
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    const frame = (now: number) => {
      if (!visible || document.hidden) return;
      const dt = Math.min(now - last, 50);
      last = now;
      // scrolling spins the ribbon faster, then it eases back to its idle speed
      const y = window.scrollY;
      boost = boost * 0.9 + (y - lastY) * 0.012;
      lastY = y;
      if (!reduce) rot = (((rot + dt * 0.0055 * hover + boost) % 360) + 360) % 360;

      const W = wrap?.clientWidth ?? 1200;
      const R = Math.max(W * 1.05, 620);
      if (wrap) wrap.style.perspective = `${Math.max(W * 0.95, 520)}px`;

      for (let i = 0; i < CARD_COUNT; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const phi = ((((i * STEP - rot) % 360) + 540) % 360) - 180; // -180..180
        const a = Math.abs(phi);
        if (a > VISIBLE) {
          el.style.visibility = "hidden";
          continue;
        }
        const rad = (phi * Math.PI) / 180;
        const x = R * Math.sin(rad);
        const z = -R * Math.cos(rad) + R * 0.86;
        const edgeFade = Math.min(1, (VISIBLE - a) / 14);
        el.style.visibility = "visible";
        el.style.opacity = String(edgeFade * (0.8 + 0.2 * Math.min(1, a / 30)));
        el.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(1)}px, 0, ${z.toFixed(1)}px) rotateY(${(-phi).toFixed(2)}deg)`;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      wrap?.removeEventListener("pointerenter", onEnter);
      wrap?.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="absolute inset-x-0 top-[12%] h-[38vh] min-h-[220px] max-h-[440px]"
      style={{ perspectiveOrigin: "50% 40%" }}
      aria-hidden="true"
    >
      <div className="relative h-full w-full" style={{ transformStyle: "preserve-3d", transform: "rotateX(5deg)" }}>
        {items.map((p, i) => (
          <div
            key={i}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="absolute left-1/2 top-1/2 overflow-hidden rounded-[10px] border border-white/10 bg-ink-3 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)]"
            style={{ width: "clamp(230px, 30vw, 500px)", aspectRatio: "16 / 10", visibility: "hidden", willChange: "transform, opacity", backfaceVisibility: "hidden" }}
          >
            <ProjectCover project={p} eager={i < projects.length} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Portrait ─────────────────────────────────────────────────────────────────
function Portrait({ progress }: { progress: MotionValue<number> }) {
  const [ok, setOk] = useState(true);
  const y = useTransform(progress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(progress, [0, 1], [1, 0.9]);
  return (
    <motion.div
      className="pointer-events-none absolute bottom-0 left-1/2 z-10 h-[62vh] sm:h-[74vh] lg:h-[86vh] max-h-[920px] w-auto aspect-[3/4] -translate-x-1/2 origin-bottom"
      style={{ y, scale }}
    >
      <motion.div
        className="h-full w-full"
        initial={{ opacity: 0, y: 60, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.2, ease }}
      >
        {ok ? (
          <img
            src={PHOTO_SRC}
            alt="Portrait of Shane Wint Aung"
            onError={() => setOk(false)}
            className="h-full w-full object-contain object-bottom"
            decoding="async"
          />
        ) : (
          <PortraitPlaceholder />
        )}
      </motion.div>
    </motion.div>
  );
}

function PortraitPlaceholder() {
  return (
    <div className="relative flex h-full w-full items-end justify-center">
      <svg viewBox="0 0 300 400" className="h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="sil" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2a3556" />
            <stop offset="1" stopColor="#07080c" />
          </linearGradient>
        </defs>
        <ellipse cx="150" cy="130" rx="58" ry="70" fill="url(#sil)" />
        <path d="M30 400 C 40 270, 95 225, 150 225 C 205 225, 260 270, 270 400 Z" fill="url(#sil)" />
      </svg>
      <span className="label absolute bottom-[38%] hidden px-4 text-center text-white/30 lg:block">your photo → public/images/shane.png</span>
    </div>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const ribbonY = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const ribbonOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-45%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section ref={sectionRef} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink" aria-label="Introduction">
      {/* soft glow behind the portrait */}
      <div
        className="pointer-events-none absolute left-1/2 top-[55%] h-[80vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 opacity-70"
        style={{ background: "radial-gradient(closest-side, rgba(90,115,190,0.26), rgba(90,115,190,0.08) 55%, transparent)" }}
        aria-hidden="true"
      />

      <motion.div className="absolute inset-0" style={{ y: ribbonY, opacity: ribbonOpacity }}>
        <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6, delay: 0.4 }}>
          <Ribbon />
        </motion.div>
      </motion.div>

      <Portrait progress={scrollYProgress} />

      {/* bottom fade so text stays readable on small screens */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[45%] bg-gradient-to-t from-ink via-ink/70 to-transparent lg:h-[30%]" aria-hidden="true" />

      <motion.div
        className="absolute inset-x-0 bottom-0 z-30 mx-auto flex max-w-[1440px] items-end justify-between gap-8 px-5 pb-10 sm:px-8 sm:pb-14 lg:px-14 lg:pb-16"
        style={{ y: textY, opacity: textOpacity }}
      >
        {/* Left: title */}
        <div>
          <motion.p className="label mb-5 text-white/50" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7 }}>
            Hi, I'm Shane Wint Aung
          </motion.p>
          <h1 className="font-serif text-paper leading-[0.95] tracking-[-0.01em]" style={{ fontSize: "clamp(46px, 7vw, 104px)" }}>
            {["Full-Stack", "Developer"].map((w, i) => (
              <span key={w} className="block overflow-hidden pb-[0.06em]">
                <motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: 0.8 + i * 0.12, ease }}>
                  {i === 1 ? (
                    <>
                      <em className="italic text-accent">Developer</em>
                    </>
                  ) : (
                    w
                  )}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.div className="mt-8 flex flex-wrap items-center gap-3" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.2 }}>
            <a
              href={`mailto:${EMAIL}`}
              className="group flex items-center rounded-full bg-paper py-1.5 pl-1.5 pr-6 text-[15px] font-medium text-ink transition-transform duration-300 hover:scale-[1.03]"
            >
              <span className="mr-4 flex size-10 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-500 group-hover:rotate-[-45deg]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
              Hire me
            </a>
            <a
              href="/Shane_Wint_Aung_Resume.pdf"
              download
              className="rounded-full border border-white/15 px-6 py-[15px] text-[15px] text-white/75 transition-colors duration-300 hover:border-white/40 hover:text-paper"
            >
              Download CV
            </a>
          </motion.div>
        </div>

        {/* Right: quote + signature */}
        <motion.figure className="hidden max-w-[340px] text-right lg:block" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.35 }}>
          <blockquote className="font-serif text-[22px] leading-[1.25] text-white/50">
            “I build apps that solve <span className="text-paper">real problems</span> — for clients, for my family, and for{" "}
            <span className="text-paper">readers back home</span>.”
          </blockquote>
          <figcaption className="mt-1">
            <Signature size={64} delay={1.9} instant className="text-paper" />
          </figcaption>
        </motion.figure>
      </motion.div>
    </section>
  );
}
