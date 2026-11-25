import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { milestones } from "../data/timelineData";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Timeline() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="timeline" className="relative bg-ink-2 px-5 py-28 sm:px-8 lg:px-14 lg:py-40" aria-labelledby="timeline-heading">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-16 lg:grid-cols-12">
        {/* sticky heading */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <p className="label text-white/45">My journey</p>
            <h2 id="timeline-heading" className="mt-5 font-serif leading-[0.92] text-paper" style={{ fontSize: "clamp(56px, 7vw, 112px)" }}>
              Taunggyi <span className="text-white/35">to</span> <em className="italic text-accent">Singapore</em>
            </h2>
            <p className="mt-8 max-w-[340px] text-[16px] leading-relaxed text-white/50">
              From a classroom in Myanmar to building software for real clients — the chapters that shaped how I build.
            </p>
          </div>
        </div>

        {/* list */}
        <ol ref={listRef} className="relative lg:col-span-8">
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-white/[0.08] sm:left-[160px]" aria-hidden="true" />
          <motion.div
            className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-accent via-accent to-accent/0 sm:left-[160px]"
            style={{ scaleY: lineScale }}
            aria-hidden="true"
          />
          {milestones.map((m, i) => {
            const last = i === milestones.length - 1;
            return (
              <motion.li
                key={m.title}
                className="relative grid grid-cols-[16px_1fr] gap-x-6 pb-14 sm:grid-cols-[136px_48px_1fr] sm:gap-x-0"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease }}
              >
                <span className="label hidden pt-2 text-right text-white/40 sm:block sm:pr-6">{m.year}</span>
                <span className="relative flex justify-center pt-[9px] sm:pt-[10px]">
                  <span
                    className="relative z-10 size-[9px] rounded-full ring-4 ring-ink-2"
                    style={{ background: last ? "#34d399" : "#9fb5ff", boxShadow: last ? "0 0 18px #34d399" : "0 0 12px rgba(159,181,255,0.6)" }}
                  />
                </span>
                <div className="sm:pl-2">
                  <span className="label text-white/40 sm:hidden">{m.year}</span>
                  <h3 className={`mt-1 font-serif text-[30px] leading-[1.05] sm:mt-0 sm:text-[36px] ${last ? "text-emerald-300" : "text-paper"}`}>{m.title}</h3>
                  <p className="mt-3 max-w-[560px] text-[15px] leading-relaxed text-white/50">{m.description}</p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
