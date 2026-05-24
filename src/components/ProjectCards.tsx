import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { projects } from "../data/timelineData";
import type { Project } from "../types";

const techColors: Record<string, string> = {
  TypeScript: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  React: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
  "Node.js": "bg-green-500/10 text-green-300 border-green-500/20",
  "Prisma ORM": "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
  Prisma: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
  "Neon DB": "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  Render: "bg-violet-500/10 text-violet-300 border-violet-500/20",
  "Gemini API": "bg-amber-500/10 text-amber-300 border-amber-500/20",
  Supabase: "bg-teal-500/10 text-teal-300 border-teal-500/20",
  Cloudflare: "bg-orange-500/10 text-orange-300 border-orange-500/20",
  "Framer Motion": "bg-pink-500/10 text-pink-300 border-pink-500/20",
  "Tailwind CSS": "bg-sky-500/10 text-sky-300 border-sky-500/20",
};

const defaultTech = "bg-gray-700/40 text-gray-400 border-gray-600/30";

export default function ProjectCards() {
  return (
    <section
      id="projects"
      className="relative py-32 px-6 bg-black"
      aria-labelledby="projects-heading"
    >
      {/* Section divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-indigo-500/40" aria-hidden="true" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-indigo-400 text-xs font-mono tracking-[0.2em] uppercase mb-4">
            What I Built
          </p>
          <h2
            id="projects-heading"
            className="text-4xl md:text-5xl font-bold text-white tracking-tight"
          >
            Projects
          </h2>
          <p className="mt-4 text-gray-500 text-base max-w-md mx-auto leading-relaxed">
            Real things I built for real problems — family, clients, and myself.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const gh = project.github ?? "#";
  const dm = project.demo ?? "#";

  return (
    <motion.article
      ref={ref}
      className="group relative flex flex-col bg-[#0d0d0d] border border-white/[0.06] rounded-2xl p-7 overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(99,102,241,0.08)]"
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
    >
      {/* Top shimmer on hover */}
      <div
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Background glow */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/[0.04] group-hover:to-purple-500/[0.04] transition-all duration-500 rounded-2xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Index number */}
        <span
          className="text-[4rem] font-black leading-none text-white/[0.04] group-hover:text-white/[0.07] transition-colors duration-300 select-none mb-3"
          aria-hidden="true"
        >
          {String(project.id).padStart(2, "0")}
        </span>

        {/* Title */}
        <h3 className="text-white font-semibold text-lg leading-snug mb-2 group-hover:text-indigo-200 transition-colors duration-200">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-6" role="list" aria-label="Technologies used">
          {project.tech.map((t) => (
            <span
              key={t}
              role="listitem"
              className={`text-[11px] px-2.5 py-1 rounded-full border font-medium tracking-wide ${techColors[t] ?? defaultTech}`}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-5 mt-auto pt-4 border-t border-white/[0.05]">
          {project.github && (
            <a
              href={gh}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
              aria-label={`View ${project.title} on GitHub`}
            >
              GitHub ↗
            </a>
          )}
          {project.demo && (
            <a
              href={dm}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
              aria-label={`View live demo of ${project.title}`}
            >
              Live Demo ↗
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
