import { motion } from "framer-motion";
import { skills } from "../data/timelineData";
import type { Skill } from "../types";

const ease = [0.16, 1, 0.3, 1] as const;

const GROUPS: { key: Skill["category"]; title: string; blurb: string }[] = [
  { key: "Frontend", title: "Frontend", blurb: "Interfaces that feel calm and fast." },
  { key: "Backend", title: "Backend", blurb: "APIs and logic that hold up in real use." },
  { key: "Database", title: "Data", blurb: "Schemas, ORMs and hosted databases." },
  { key: "Tools", title: "Tools & ways of working", blurb: "Shipping, collaborating, deploying." },
];

const MARQUEE = ["TypeScript", "React", "Node.js", "PostgreSQL", "Prisma", "Supabase", "Expo", "Docker", "Figma", "Tailwind CSS"];

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden bg-ink py-28 lg:py-40" aria-labelledby="skills-heading">
      {/* marquee */}
      <div className="relative mb-24 flex overflow-hidden border-y border-white/[0.06] py-6 lg:mb-32" aria-hidden="true">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 animate-[marquee_40s_linear_infinite] items-center gap-12 pr-12">
            {MARQUEE.map((t) => (
              <span key={t} className="flex items-center gap-12 whitespace-nowrap font-serif text-[44px] text-white/80 sm:text-[64px]">
                {t}
                <span className="text-[24px] text-accent">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-14">
        <div className="mb-16 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="label text-white/45">What I work with</p>
            <h2 id="skills-heading" className="mt-5 font-serif leading-[0.92] text-paper" style={{ fontSize: "clamp(56px, 7vw, 112px)" }}>
              The <em className="italic text-accent">toolkit</em>
            </h2>
          </div>
          <p className="max-w-[360px] text-[16px] leading-relaxed text-white/50">{skills.length} technologies I've used to ship real projects, not just tutorials.</p>
        </div>

        <div className="grid grid-cols-1 border-t border-white/[0.08] sm:grid-cols-2 lg:grid-cols-4">
          {GROUPS.map((g, gi) => (
            <motion.div
              key={g.key}
              className="border-b border-white/[0.08] py-10 sm:px-6 lg:border-b-0 lg:border-r lg:last:border-r-0 lg:first:pl-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: gi * 0.08, ease }}
            >
              <p className="label text-accent">{String(gi + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 font-serif text-[32px] leading-none text-paper">{g.title}</h3>
              <p className="mt-3 text-[14px] text-white/45">{g.blurb}</p>
              <ul className="mt-8 space-y-2.5">
                {skills
                  .filter((s) => s.category === g.key)
                  .map((s) => (
                    <li key={s.name} className="group flex items-center gap-3 text-[15px] text-white/70 transition-colors hover:text-paper">
                      <span className="h-px w-3 bg-white/20 transition-all duration-300 group-hover:w-6 group-hover:bg-accent" />
                      {s.name}
                    </li>
                  ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-100%) } }`}</style>
    </section>
  );
}
