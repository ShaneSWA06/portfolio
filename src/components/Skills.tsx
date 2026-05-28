import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SkillGroup {
  category: string;
  label: string;
  color: string;
  percent: number;
  level: string;
  note: string;
  skills: { name: string; percent: number }[];
}

const GROUPS: SkillGroup[] = [
  {
    category: "Frontend",
    label: "UI & Client",
    color: "#818cf8",
    percent: 78,
    level: "Confident",
    note: "Build production UIs and design in Figma — TypeScript, React, Tailwind, UI/UX",
    skills: [
      { name: "TypeScript", percent: 82 },
      { name: "React.js", percent: 78 },
      { name: "HTML & CSS", percent: 88 },
      { name: "Tailwind CSS", percent: 80 },
      { name: "Framer Motion", percent: 65 },
      { name: "UI/UX Design", percent: 72 },
    ],
  },
  {
    category: "Backend",
    label: "Server & Logic",
    color: "#34d399",
    percent: 75,
    level: "Confident",
    note: "REST APIs, auth, server logic — Node.js, Express, Java",
    skills: [
      { name: "Node.js", percent: 78 },
      { name: "Express.js", percent: 72 },
      { name: "REST APIs", percent: 80 },
      { name: "Java", percent: 68 },
      { name: "Python", percent: 55 },
      { name: "Authentication", percent: 70 },
    ],
  },
  {
    category: "Database",
    label: "Data & Storage",
    color: "#06b6d4",
    percent: 85,
    level: "Strong",
    note: "Most confident here — used in every project across multiple stacks",
    skills: [
      { name: "PostgreSQL", percent: 85 },
      { name: "MySQL", percent: 82 },
      { name: "Prisma ORM", percent: 88 },
      { name: "Supabase", percent: 80 },
      { name: "Neon DB", percent: 75 },
      { name: "SQLite", percent: 72 },
    ],
  },
  {
    category: "Tools",
    label: "Workflow & DevOps",
    color: "#f97316",
    percent: 74,
    level: "Confident",
    note: "Git daily, Docker in production, Vercel + Cloudflare for deployment",
    skills: [
      { name: "Git & GitHub", percent: 85 },
      { name: "Docker", percent: 68 },
      { name: "Vercel", percent: 80 },
      { name: "Figma", percent: 75 },
      { name: "Postman", percent: 78 },
      { name: "Linux CLI", percent: 65 },
    ],
  },
];

const LEVEL_COLOR: Record<string, string> = {
  Beginner: "#64748b",
  Comfortable: "#06b6d4",
  Confident: "#818cf8",
  Strong: "#34d399",
};

export default function Skills() {
  return (
    <section id="skills" className="relative py-32 px-6" style={{ background: "#0a0a0f" }} aria-labelledby="skills-heading">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-purple-500/30" aria-hidden="true" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-mono tracking-[0.2em] uppercase mb-4" style={{color:"rgba(255,255,255,0.35)"}}>What I Know</p>
          <h2 id="skills-heading" className="text-4xl md:text-5xl font-bold text-white tracking-tight">Skills</h2>
          <p className="mt-4 text-gray-500 text-sm max-w-xs mx-auto">Honest levels — built from real projects, not tutorials.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GROUPS.map((group, gi) => (
            <SkillCard key={group.category} group={group} groupIndex={gi} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ group, groupIndex }: { group: SkillGroup; groupIndex: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="relative rounded-2xl overflow-hidden"
      style={{ background: "#0d0d12", border: "1px solid rgba(255,255,255,0.06)" }}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: groupIndex * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Top accent */}
      <div className="h-[2px]" style={{ background: `linear-gradient(to right, ${group.color}90, ${group.color}20, transparent)` }} />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full" style={{ background: group.color }} />
              <h3 className="text-white font-semibold text-base">{group.category}</h3>
            </div>
            <p className="text-xs ml-4" style={{ color: "rgba(255,255,255,0.3)" }}>{group.label}</p>
          </div>

          {/* Level badge + overall % */}
          <div className="flex flex-col items-end gap-1">
            <span
              className="text-[10px] font-mono px-2.5 py-1 rounded-full tracking-wide"
              style={{
                background: `${LEVEL_COLOR[group.level]}18`,
                color: LEVEL_COLOR[group.level],
                border: `1px solid ${LEVEL_COLOR[group.level]}35`,
              }}
            >
              {group.level}
            </span>
            <span className="font-black text-2xl leading-none" style={{ color: group.color }}>
              {group.percent}
              <span className="text-xs font-mono" style={{ color: `${group.color}60` }}>%</span>
            </span>
          </div>
        </div>

        {/* Overall bar */}
        <div className="mb-5">
          <div className="h-1.5 rounded-full overflow-hidden mb-4" style={{ background: "rgba(255,255,255,0.05)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(to right, ${group.color}, ${group.color}80)` }}
              initial={{ width: 0 }}
              animate={inView ? { width: `${group.percent}%` } : { width: 0 }}
              transition={{ duration: 1.1, delay: groupIndex * 0.1 + 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </div>
          <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.25)" }}>{group.note}</p>
        </div>

        {/* Individual skill bars */}
        <div className="space-y-3">
          {group.skills.map((skill, si) => (
            <SkillBar
              key={skill.name}
              skill={skill}
              color={group.color}
              inView={inView}
              delay={groupIndex * 0.1 + si * 0.06 + 0.5}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function SkillBar({ skill, color, inView, delay }: {
  skill: { name: string; percent: number };
  color: string; inView: boolean; delay: number;
}) {
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>
          {skill.name}
        </span>
        <motion.span
          className="font-mono text-[10px]"
          style={{ color: `${color}80` }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: delay + 0.2 }}
        >
          {skill.percent}%
        </motion.span>
      </div>
      <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(to right, ${color}cc, ${color}55)` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.percent}%` } : { width: 0 }}
          transition={{ duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  );
}
