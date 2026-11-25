import { animate, motion, useInView, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { projects, skills } from "../data/timelineData";
import Signature from "./Signature";

const ease = [0.16, 1, 0.3, 1] as const;

const STATS = [
  { value: `${projects.length}+`, label: "Apps & platforms\nbuilt end to end" },
  { value: "2", label: "Real clients\ndelivered for" },
  { value: "1000+", label: "Items managed in my\nmum's store inventory" },
  { value: `${Math.floor(skills.length / 10) * 10}+`, label: "Tools & technologies\nused in production" },
];

/** Counts from 0 up to the number in `value` (keeps any suffix like "+"). */
function CountUp({ value, play }: { value: string; play: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const target = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9,]/g, "");
  useEffect(() => {
    if (!play || !ref.current) return;
    const el = ref.current;
    const controls = animate(0, target, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (el.textContent = Math.round(v).toLocaleString("en-US") + suffix),
    });
    return () => controls.stop();
  }, [play, target, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

function Stat({ value, label, delay, inView }: { value: string; label: string; delay: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease }}
    >
      <div className="font-serif leading-none text-accent" style={{ fontSize: "clamp(52px, 6vw, 84px)" }}>
        <CountUp value={value} play={inView} />
      </div>
      <p className="label mt-4 whitespace-pre-line leading-[1.8] text-white/70">{label}</p>
    </motion.div>
  );
}

/** The blue arch: rises like a door opening, tilts toward the cursor, follows scroll, and shimmers. */
function ArchCard({ inView }: { inView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], [18, -18]);

  // pointer tilt + moving light
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.3);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-9, 9]), { stiffness: 150, damping: 18 });
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 150, damping: 18 });
  const lightX = useTransform(mx, (v) => `${v * 100}%`);
  const lightY = useTransform(my, (v) => `${v * 100}%`);
  const light = useMotionTemplate`radial-gradient(420px circle at ${lightX} ${lightY}, rgba(255,255,255,0.22), transparent 60%)`;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.3);
  };

  const item = (d: number) => ({
    initial: { opacity: 0, y: 24, filter: "blur(6px)" },
    animate: inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {},
    transition: { duration: 0.9, delay: d, ease },
  });

  return (
    <motion.div ref={cardRef} className="relative" style={{ y: drift, perspective: 1000 }}>
      {/* soft glow under the arch (a gradient, not a filter) */}
      <div
        className="pointer-events-none absolute -inset-x-24 -bottom-24 top-1/3"
        style={{ background: "radial-gradient(closest-side, rgba(77,102,166,0.45), transparent)" }}
        aria-hidden="true"
      />
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="relative overflow-hidden rounded-[32px] border border-white/15 px-10 py-12 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_0_0_1px_rgba(159,181,255,0.12)] sm:px-12 sm:py-14"
        style={{
          rotateX,
          rotateY,
          backgroundImage: "radial-gradient(120% 80% at 0% 0%, rgba(159,181,255,0.35), transparent 55%), radial-gradient(90% 70% at 100% 100%, rgba(106,132,201,0.45), transparent 60%), linear-gradient(150deg, rgba(43,58,107,0.92) 0%, rgba(59,79,134,0.88) 50%, rgba(77,102,166,0.85) 100%)",

        }}
        initial={{ clipPath: "inset(100% 0% 0% 0% round 32px)" }}
        animate={inView ? { clipPath: "inset(0% 0% 0% 0% round 32px)" } : {}}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* breathing glow */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(80% 50% at 50% 0%, rgba(255,255,255,0.2), transparent)" }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
        {/* cursor light */}
        <motion.div className="pointer-events-none absolute inset-0" style={{ background: light }} aria-hidden="true" />
        {/* shimmer sweep */}
        <motion.div
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent)" }}
          initial={{ x: "-100%" }}
          animate={inView ? { x: ["-100%", "420%"] } : {}}
          transition={{ duration: 1.8, delay: 1.6, repeat: Infinity, repeatDelay: 4.5, ease: "easeInOut" }}
          aria-hidden="true"
        />

        <motion.p className="label relative flex items-center gap-3 text-white/80" {...item(0.7)}>
          <motion.span
            className="size-1.5 rounded-full bg-white"
            animate={{ opacity: [1, 0.3, 1], scale: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          Why me
        </motion.p>
        <h2 id="why-heading" className="relative mt-5 font-serif leading-[1.02] text-white" style={{ fontSize: "clamp(38px, 4vw, 52px)" }}>
          {["Software people", "actually use"].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 1.1, delay: 0.85 + i * 0.12, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h2>
        <motion.p className="relative mt-8 text-[15px] leading-relaxed text-white/80" {...item(1.15)}>
          Every app I've built started with a real problem — a client's paper bookings, my family's shop, readers without Burmese books online.
        </motion.p>
        <Signature size={58} delay={1.4} className="relative mt-6 -ml-1 text-white" />
      </motion.div>
    </motion.div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section className="relative overflow-hidden bg-ink py-28 lg:py-40" aria-labelledby="why-heading">
      {/* faint grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "25% 33.33%",
        }}
        aria-hidden="true"
      />
      {/* giant background word */}
      <div className="pointer-events-none absolute inset-x-0 top-10 flex justify-center select-none lg:top-16" aria-hidden="true">
        <span className="font-serif leading-none text-transparent" style={{ fontSize: "clamp(140px, 24vw, 380px)", WebkitTextStroke: "1px rgba(255,255,255,0.07)" }}>
          WHY
        </span>
      </div>

      <div ref={ref} className="relative mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-0 lg:px-14">
        {/* left stats */}
        <div className="order-2 grid grid-cols-2 gap-10 lg:order-1 lg:grid-cols-1 lg:gap-40 lg:pr-24">
          <Stat {...STATS[0]} delay={0.3} inView={inView} />
          <Stat {...STATS[1]} delay={0.45} inView={inView} />
        </div>

        {/* arch card */}
        <motion.div
          className="relative order-1 mx-auto w-full max-w-[400px] lg:order-2"
        >
          {/* connector lines (desktop) */}
          <svg className="pointer-events-none absolute -inset-x-24 inset-y-0 hidden h-full w-[calc(100%+12rem)] lg:block" viewBox="0 0 592 600" preserveAspectRatio="none" aria-hidden="true">
            <g stroke="rgba(159,181,255,0.45)" strokeWidth="1" fill="none">
              <motion.path d="M14 95 H46 L96 165" initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={{ duration: 1, delay: 0.6 }} />
              <motion.path d="M14 470 H52 L96 410" initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={{ duration: 1, delay: 0.75 }} />
              <motion.path d="M578 95 H546 L496 165" initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={{ duration: 1, delay: 0.6 }} />
              <motion.path d="M578 470 H540 L496 410" initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={{ duration: 1, delay: 0.75 }} />
            </g>
            <g fill="#9fb5ff">
              <circle cx="96" cy="165" r="3" />
              <circle cx="96" cy="410" r="3" />
              <circle cx="496" cy="165" r="3" />
              <circle cx="496" cy="410" r="3" />
            </g>
          </svg>

          <ArchCard inView={inView} />
        </motion.div>

        {/* right stats */}
        <div className="order-3 grid grid-cols-2 gap-10 lg:grid-cols-1 lg:gap-40 lg:pl-24">
          <Stat {...STATS[2]} delay={0.3} inView={inView} />
          <Stat {...STATS[3]} delay={0.45} inView={inView} />
        </div>
      </div>
    </section>
  );
}
