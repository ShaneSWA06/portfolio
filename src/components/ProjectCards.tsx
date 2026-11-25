import { motion, AnimatePresence, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { projects } from "../data/timelineData";
import type { Project, ProjectStory } from "../types";
import ProjectCover from "./ProjectCover";

const ease = [0.16, 1, 0.3, 1] as const;

const STORY_LABELS: Record<keyof ProjectStory, string> = {
  problem: "The problem",
  process: "What I built",
  outcome: "The result",
  challenge: "Hardest part",
  learned: "What I learned",
};

function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-1.5 text-[14px] text-white/60 transition-colors hover:text-paper"
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100" />
      </span>
      <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
    </a>
  );
}

function useIsDesktop() {
  const query = "(min-width: 1024px)";
  const [desktop, setDesktop] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const m = window.matchMedia(query);
    const onChange = () => setDesktop(m.matches);
    m.addEventListener("change", onChange);
    return () => m.removeEventListener("change", onChange);
  }, []);
  return desktop;
}

/**
 * Desktop: each project pins to the screen and the next one slides up over it,
 * while the cards underneath shrink and dim — the "website changing" effect.
 */
function StackCard({ index, total, progress, desktop, children }: { index: number; total: number; progress: MotionValue<number>; desktop: boolean; children: React.ReactNode }) {
  const start = index / total;
  const end = Math.min(start + 1 / total, 0.999);
  const isLast = index === total - 1;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - 1 - index) * 0.025]);
  const shade = useTransform(progress, [start, end, 1], [0, 0, isLast ? 0 : 0.65]);

  if (!desktop) return <div>{children}</div>;
  return (
    <div className="sticky top-0 flex h-screen items-center">
      <motion.div
        className="relative w-full origin-top overflow-hidden rounded-[32px] border border-white/10 bg-ink-2 p-10 xl:p-12"
        style={{ scale, top: `calc(-4vh + ${index * 16}px)` }}
      >
        {children}
        <motion.div className="pointer-events-none absolute inset-0 bg-ink" style={{ opacity: shade }} aria-hidden="true" />
      </motion.div>
    </div>
  );
}

function ProjectRow({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const flip = index % 2 === 1;
  const accent = project.accent ?? "#9fb5ff";

  return (
    <motion.article
      className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease }}
    >
      {/* screenshot */}
      <button
        onClick={() => (project.story ? onOpen() : project.demo && window.open(project.demo, "_blank", "noopener,noreferrer"))}
        className={`group relative block w-full overflow-hidden rounded-2xl border border-white/10 bg-ink-3 text-left lg:col-span-8 ${flip ? "lg:order-2" : ""}`}
        style={{ aspectRatio: "16 / 10", boxShadow: `0 50px 120px -50px ${accent}55` }}
        aria-label={project.story ? `Read the story of ${project.title}` : `Open ${project.title}`}
      >
        <div className="h-full w-full transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
          <ProjectCover project={project} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute bottom-5 left-5 flex translate-y-3 items-center gap-2 rounded-full bg-paper px-4 py-2 text-[13px] font-medium text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          {project.story ? "Read the story →" : project.demo ? "Visit site ↗" : project.title}
        </span>
      </button>

      {/* text */}
      <div className={`lg:col-span-4 ${flip ? "lg:order-1" : ""}`}>
        <div className="label flex items-center gap-3 text-white/40">
          <span>{String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
          <span className="h-px w-8 bg-white/15" />
          <span style={{ color: accent }}>{project.tag}</span>
        </div>
        <h3 className="mt-5 font-serif leading-[0.98] text-paper" style={{ fontSize: "clamp(40px, 4.4vw, 64px)" }}>
          {project.title}
        </h3>
        <p className="mt-6 max-w-[460px] text-[16px] leading-relaxed text-white/55">{project.description}</p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tech stack">
          {project.tech.map((t) => (
            <li key={t} className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-white/55">
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          {project.story && (
            <button onClick={onOpen} className="rounded-full border border-white/15 px-5 py-2.5 text-[14px] text-paper transition-colors hover:border-white/40 hover:bg-white/5">
              Read the story
            </button>
          )}
          {project.github && <ArrowLink href={project.github}>GitHub</ArrowLink>}
          {project.demo && <ArrowLink href={project.demo}>Live</ArrowLink>}
        </div>
      </div>
    </motion.article>
  );
}

function StoryModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const accent = project.accent ?? "#9fb5ff";

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-black/70 p-0 backdrop-blur-md sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="story-title"
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-white/10 bg-ink-2 sm:rounded-3xl"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.5, ease }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[16/7] overflow-hidden border-b border-white/10">
          <ProjectCover project={project} eager />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-2 to-transparent" />
        </div>
        <button onClick={onClose} className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-ink/70 text-paper backdrop-blur hover:bg-ink" aria-label="Close">
          ✕
        </button>
        <div className="px-6 pb-10 sm:px-10">
          <p className="label -mt-2" style={{ color: accent }}>
            Project story
          </p>
          <h2 id="story-title" className="mt-3 font-serif text-5xl leading-none text-paper">
            {project.title}
          </h2>
          <dl className="mt-10 divide-y divide-white/[0.07]">
            {project.story &&
              (Object.keys(STORY_LABELS) as (keyof ProjectStory)[]).map((k) => (
                <div key={k} className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-[160px_1fr] sm:gap-8">
                  <dt className="label pt-1 text-white/40">{STORY_LABELS[k]}</dt>
                  <dd className="text-[15px] leading-relaxed text-white/75">{project.story![k]}</dd>
                </div>
              ))}
          </dl>
          <div className="mt-8 flex gap-6">
            {project.github && <ArrowLink href={project.github}>View on GitHub</ArrowLink>}
            {project.demo && <ArrowLink href={project.demo}>Open live</ArrowLink>}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectCards() {
  const [selected, setSelected] = useState<Project | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start start", "end end"] });
  const desktop = useIsDesktop();

  return (
    <section id="projects" className="relative bg-ink px-5 py-28 sm:px-8 lg:px-14 lg:py-40" aria-labelledby="projects-heading">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-20 flex flex-col justify-between gap-8 lg:mb-28 lg:flex-row lg:items-end">
          <div>
            <p className="label text-white/45">Selected work</p>
            <h2 id="projects-heading" className="mt-5 font-serif leading-[0.92] text-paper" style={{ fontSize: "clamp(56px, 9vw, 140px)" }}>
              Things I've <em className="italic text-accent">built</em>
            </h2>
          </div>
          <p className="max-w-[360px] text-[16px] leading-relaxed text-white/50">
            Real apps for real people — clients, my family's businesses, and Burmese readers. Tap any project for the full story.
          </p>
        </div>

        <div ref={listRef} className={desktop ? "relative" : "flex flex-col gap-28"}>
          {projects.map((p, i) => (
            <StackCard key={p.id} index={i} total={projects.length} progress={scrollYProgress} desktop={desktop}>
              <ProjectRow project={p} index={i} onOpen={() => setSelected(p)} />
            </StackCard>
          ))}
        </div>
      </div>

      <AnimatePresence>{selected && <StoryModal project={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </section>
  );
}
