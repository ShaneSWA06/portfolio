import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skills } from "../data/timelineData";
import type { Skill } from "../types";

const cats = ["Frontend", "Backend", "Database", "Tools"] as const;

const catMeta: Record<string, { color: string; dot: string; label: string }> = {
  Frontend: {
    color: "border-indigo-500/20 hover:border-indigo-500/50 text-indigo-300 bg-indigo-500/[0.07]",
    dot: "bg-indigo-400",
    label: "UI & Client",
  },
  Backend: {
    color: "border-purple-500/20 hover:border-purple-500/50 text-purple-300 bg-purple-500/[0.07]",
    dot: "bg-purple-400",
    label: "Server & Logic",
  },
  Database: {
    color: "border-cyan-500/20 hover:border-cyan-500/50 text-cyan-300 bg-cyan-500/[0.07]",
    dot: "bg-cyan-400",
    label: "Data & Storage",
  },
  Tools: {
    color: "border-rose-500/20 hover:border-rose-500/50 text-rose-300 bg-rose-500/[0.07]",
    dot: "bg-rose-400",
    label: "Workflow & DevOps",
  },
};

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="skills"
      className="relative py-32 px-6 bg-black"
      aria-labelledby="skills-heading"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-purple-500/40" aria-hidden="true" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-purple-400 text-xs font-mono tracking-[0.2em] uppercase mb-4">
            What I Know
          </p>
          <h2
            id="skills-heading"
            className="text-4xl md:text-5xl font-bold text-white tracking-tight"
          >
            Skills
          </h2>
          <p className="mt-4 text-gray-500 text-base max-w-md mx-auto leading-relaxed">
            Technologies I use to build things end to end.
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {cats.map((cat, ci) => {
            const meta = catMeta[cat];
            const catSkills = skills.filter((s: Skill) => s.category === cat);

            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.55,
                  delay: ci * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="bg-[#0d0d0d] border border-white/[0.06] rounded-2xl p-6"
              >
                {/* Category header */}
                <div className="flex items-center gap-2.5 mb-5">
                  <span className={`w-2 h-2 rounded-full ${meta.dot}`} aria-hidden="true" />
                  <div>
                    <p className="text-white text-sm font-semibold">{cat}</p>
                    <p className="text-gray-600 text-xs">{meta.label}</p>
                  </div>
                </div>

                {/* Skill chips */}
                <div
                  className="flex flex-wrap gap-2"
                  role="list"
                  aria-label={`${cat} skills`}
                >
                  {catSkills.map((skill: Skill, i: number) => (
                    <motion.span
                      key={skill.name}
                      role="listitem"
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border cursor-default transition-colors duration-200 ${meta.color}`}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.3,
                        delay: ci * 0.1 + i * 0.04,
                        ease: "easeOut",
                      }}
                      whileHover={{
                        scale: 1.06,
                        transition: { duration: 0.15 },
                      }}
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
