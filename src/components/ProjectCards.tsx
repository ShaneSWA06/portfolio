import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import type { Project } from "../types";

const techColors: Record<string, string> = {
  TypeScript: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  JavaScript: "bg-yellow-500/10 text-yellow-300 border-yellow-500/20",
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
  Docker: "bg-blue-400/10 text-blue-200 border-blue-400/20",
  Vercel: "bg-white/10 text-white/70 border-white/20",
  Java: "bg-red-500/10 text-red-300 border-red-500/20",
  MySQL: "bg-orange-500/10 text-orange-300 border-orange-500/20",
  "HTML/CSS": "bg-rose-500/10 text-rose-300 border-rose-500/20",
  PostgreSQL: "bg-blue-600/10 text-blue-300 border-blue-600/20",
  "REST APIs": "bg-purple-500/10 text-purple-300 border-purple-500/20",
  AWS: "bg-yellow-600/10 text-yellow-300 border-yellow-600/20",
  "Google Translate API": "bg-green-600/10 text-green-300 border-green-600/20",
};
const defaultTech = "bg-gray-700/40 text-gray-400 border-gray-600/30";

interface ProjectStory {
  problem: string; process: string; outcome: string; challenge: string; learned: string;
}
const stories: Record<number, ProjectStory> = {
  1: {
    problem: "Myanmar has a rich literary culture but almost no digital way to discover, read, or track Burmese books.",
    process: "Built a full-stack library platform — auth, book catalogue, search, reading progress tracking, and personalised recommendations based on history.",
    outcome: "A fully working web app where users can browse Burmese books, track what they've read, and get recommendations. Built entirely solo.",
    challenge: "Burmese text rendering — fonts, encoding, and layout all needed special handling. Most frameworks don't handle Burmese script well.",
    learned: "Full product ownership from DB schema to UI polish. How to handle non-Latin scripts and build recommendation logic.",
  },
  2: {
    problem: "My mum's grocery store billed manually — slow, error-prone, and impossible to track inventory across 1000+ items.",
    process: "Built a POS billing app with barcode scanning, real-time inventory updates, and offline capability for unstable internet.",
    outcome: "The store processes sales faster, inventory stays accurate, and my mum can see stock levels without counting manually.",
    challenge: "Offline-first architecture — syncing data when connectivity returned and handling partial transactions.",
    learned: "Offline-first design, local state management, and building for non-developer users where simplicity > features.",
  },
  3: {
    problem: "Family business used KBZPay constantly but had no way to track transactions, generate reports, or verify receipts.",
    process: "Started as a simple PWA. v2 added Gemini AI OCR for receipt scanning, CSV export, multi-language support, Docker deployment.",
    outcome: "Family uses it daily. Receipts scanned in seconds, reports auto-generated, everything backed up.",
    challenge: "Getting Gemini OCR to reliably extract data from messy real-world receipt photos with variable lighting and angles.",
    learned: "AI APIs in production, Docker pipelines, and the difference between a demo and software people rely on every day.",
  },
  4: {
    problem: "CleoSpa managed appointments and staff entirely through WhatsApp and paper.",
    process: "Met the client, gathered requirements, built full-stack system — TypeScript frontend, JS backend with Prisma ORM, REST APIs for dashboard graphs, Google Translate API, cloud hosted on AWS.",
    outcome: "Delivered to real client on real deadline. Live dashboard graphs, multi-language support, full booking and staff management.",
    challenge: "First time doing proper client communication. What they said they wanted vs what they actually needed was harder than the coding.",
    learned: "Requirements gathering, stakeholder communication, REST API design, third-party API integration, and cloud deployment.",
  },
  5: {
    problem: "Organisation needed an intranet tool for conducting and recording vision screening tests for community programmes.",
    process: "Led full lifecycle as FYP — client discovery, system architecture, DB design, development, testing, and final handover.",
    outcome: "Complete, tested, handed-over intranet system. Client can run screening sessions, record results, and export reports.",
    challenge: "Balancing client expectations with scope and timeline as a student team. Had to push back on feature requests.",
    learned: "Full software development lifecycle. Project management, client negotiation, and delivering beyond the classroom.",
  },
  7: {
    problem: "larlarbook needed a mobile app so Burmese readers could discover, read, and track books on their phones — the web platform alone was not enough.",
    process: "Currently developing the full mobile app in Expo (React Native) to match a 73-screen Figma design created by the team. Building 5 tab screens (home, library, search, write, profile) plus an in-app epub reader. Stack: TypeScript, Expo Router, Supabase, react-native-reanimated, epubjs-react-native.",
    outcome: "Work in progress — started development yesterday. Auth screens are complete, tab navigation is set up, and screens are being implemented one by one to match the Figma designs exactly.",
    challenge: "Translating a detailed 73-screen Figma design into pixel-accurate React Native components — spacing, typography, and Burmese script rendering all need careful attention on mobile.",
    learned: "Mobile-first development with Expo Router, working from a team Figma design as the source of truth, and integrating an epub reader for real book content.",
  },
  6: {
    problem: "Needed a portfolio that didn't look like every other student's generic template.",
    process: "Built from scratch — React, TypeScript, Framer Motion, horizontal scroll timeline, project story modals, dark mode. Deployed on Vercel.",
    outcome: "The site you're on right now. Fast, clean, tells my actual story.",
    challenge: "Making it feel premium without overcomplicating. Went through many iterations before landing on something that works for recruiters.",
    learned: "Good design is subtraction. The best version came from removing things, not adding them.",
  },
};

const storyLabels: Record<string, string> = {
  problem: "The Problem", process: "What I Built",
  outcome: "The Result", challenge: "Hardest Part", learned: "What I Learned",
};
const storyIcons: Record<string, string> = {
  problem: "❓", process: "⚙️", outcome: "✅", challenge: "🔥", learned: "💡",
};

// Bento accent colors per project
const accentColors: Record<number, string> = {
  1: "#a855f7", 2: "#34d399", 3: "#06b6d4",
  4: "#f97316", 5: "#818cf8", 6: "#fb7185",
};

const allProjects: Project[] = [
  { id: 1, title: "larlarbook", description: "Full-stack digital library platform for Burmese books with reading progress tracking and personalised recommendations.", tech: ["TypeScript", "React", "Node.js", "PostgreSQL", "Prisma"], github: "https://github.com/ShaneSWA06/larlarbook" },
  { id: 2, title: "Grocery Billing System", description: "Offline-capable POS billing app with barcode scanning and Supabase-backed inventory for my mum's store in Myanmar.", tech: ["React", "Node.js", "Supabase", "TypeScript"], github: "https://github.com/ShaneSWA06" },
  { id: 3, title: "KBZPay Transaction Tracker", description: "PWA for tracking mobile wallet transactions. v2 adds Gemini AI OCR, CSV backups, multi-language support, Docker deployment.", tech: ["TypeScript", "Prisma", "Neon DB", "Gemini API", "Docker", "Render"], github: "https://github.com/ShaneSWA06" },
  { id: 4, title: "CleoSpa Management App", description: "Full spa management system for a real client — TypeScript frontend, JS backend, REST APIs, Google Translate, AWS hosting.", tech: ["TypeScript", "JavaScript", "Prisma ORM", "MySQL", "REST APIs", "Google Translate API", "AWS", "HTML/CSS"], github: "https://github.com/ShaneSWA06" },
  { id: 5, title: "Vision Screening System", description: "FYP intranet system for a real client. Full lifecycle from client discovery and system design to tested delivery.", tech: ["TypeScript", "React", "Node.js", "PostgreSQL", "Prisma"], github: "https://github.com/ShaneSWA06" },
  { id: 7, title: "larlarbook — Mobile App", description: "Currently building the mobile app in Expo (React Native) to match a 73-screen Figma design — home, library, search, write, profile, and epub reader tabs. Supabase backend, Expo Router navigation.", tech: ["Expo", "React Native", "TypeScript", "Supabase", "Expo Router", "Figma"], github: "https://github.com/LarLar-Books/LarLarReady", demo: "https://www.figma.com/design/fb74B6Rgxy1uKbXtL9170d/LrLr-Books-App-Mobile" },
  { id: 6, title: "Portfolio Website", description: "This site — horizontal scroll timeline, story modals, Framer Motion animations. Deployed on Vercel.", tech: ["React", "TypeScript", "Framer Motion", "Tailwind CSS", "Vercel"], github: "https://github.com/ShaneSWA06/portfolio", demo: "https://portfolio-shaneswa06s-projects.vercel.app" },
];

export default function ProjectCards() {
  const [selected, setSelected] = useState<Project | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="relative py-32 px-6" style={{ background: "#0a0a0f" }} aria-labelledby="projects-heading">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-indigo-500/30" aria-hidden="true" />

      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-indigo-400 text-xs font-mono tracking-[0.2em] uppercase mb-4">What I Built</p>
          <h2 id="projects-heading" className="text-4xl md:text-5xl font-bold text-white tracking-tight">Projects</h2>
          <p className="mt-4 text-gray-500 text-sm max-w-sm mx-auto">Click any project to read the full story.</p>
        </motion.div>

        {/* Bento grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-auto">

          {/* Row 1: larlarbook FEATURED wide (4 cols) + KBZPay tall (2 cols) */}
          <BentoCard project={allProjects[0]} index={0} inView={inView} span="md:col-span-4" onOpen={setSelected} featured />
          <BentoCard project={allProjects[2]} index={2} inView={inView} span="md:col-span-2" onOpen={setSelected} />

          {/* Row 2: Grocery Billing (2 cols) + CleoSpa FEATURED wide (4 cols) */}
          <BentoCard project={allProjects[1]} index={1} inView={inView} span="md:col-span-2" onOpen={setSelected} />
          <BentoCard project={allProjects[3]} index={3} inView={inView} span="md:col-span-4" onOpen={setSelected} featured />

          {/* Row 3: Vision Screening (2 cols) + UI/UX (2 cols) + Portfolio (2 cols) */}
          <BentoCard project={allProjects[4]} index={4} inView={inView} span="md:col-span-2" onOpen={setSelected} />
          <BentoCard project={allProjects[6]} index={6} inView={inView} span="md:col-span-2" onOpen={setSelected} featured />
          <BentoCard project={allProjects[5]} index={5} inView={inView} span="md:col-span-2" onOpen={setSelected} />
        </div>
      </div>

      <AnimatePresence>
        {selected && <StoryModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}

function BentoCard({ project, index, inView, span, onOpen, featured = false }:
  { project: Project; index: number; inView: boolean; span: string; onOpen: (p: Project) => void; featured?: boolean }) {
  const accent = accentColors[project.id] ?? "#6366f1";

  return (
    <motion.article
      className={`group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer ${span}`}
      style={{
        background: "#0d0d12",
        border: `1px solid rgba(255,255,255,0.06)`,
        minHeight: featured ? 280 : 220,
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={() => onOpen(project)}
      role="button" tabIndex={0} aria-label={`Read story behind ${project.title}`}
      onKeyDown={e => e.key === "Enter" && onOpen(project)}
    >
      {/* Accent top bar */}
      <div className="absolute top-0 inset-x-0 h-[2px]" style={{ background: `linear-gradient(to right, ${accent}80, ${accent}20, transparent)` }} />

      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(ellipse 70% 60% at 30% 40%, ${accent}08, transparent)` }} />

      <div className="relative z-10 flex flex-col h-full p-6">
        {/* Number + accent dot */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: `${accent}80` }}>
            {String(project.id).padStart(2, "0")}
          </span>
          <div className="w-2 h-2 rounded-full opacity-60" style={{ background: accent }} />
        </div>

        {/* Title */}
        <h3 className={`font-bold text-white leading-tight mb-2 group-hover:opacity-90 transition-opacity ${featured ? "text-2xl" : "text-lg"}`}>
          {project.title}
        </h3>

        {/* Description — show more on featured */}
        <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4"
          style={{ WebkitLineClamp: featured ? 3 : 2, display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {project.description}
        </p>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, featured ? 6 : 4).map(t => (
            <span key={t} className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${techColors[t] ?? defaultTech}`}>{t}</span>
          ))}
          {project.tech.length > (featured ? 6 : 4) && (
            <span className="text-[10px] px-2 py-0.5 rounded-full border font-medium" style={{ color: `${accent}80`, borderColor: `${accent}20`, background: `${accent}08` }}>
              +{project.tech.length - (featured ? 6 : 4)}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
          <span className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: accent }}>
            Read story →
          </span>
          <div className="flex gap-3">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="text-xs text-gray-600 hover:text-white transition-colors"
                onClick={e => e.stopPropagation()}>GitHub ↗</a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer"
                className="text-xs transition-colors hover:opacity-80"
                style={{ color: accent }}
                onClick={e => e.stopPropagation()}>Live ↗</a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function StoryModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const story = stories[project.id];
  const accent = accentColors[project.id] ?? "#6366f1";

  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
      onClick={onClose} role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <motion.div
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{ background: "#0a0a0f", border: "1px solid rgba(255,255,255,0.08)" }}
        initial={{ opacity: 0, y: 32, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }} transition={{ duration: 0.3, ease: [0.16,1,0.3,1] }}
        onClick={e => e.stopPropagation()}
      >
        <div className="h-[2px] w-full rounded-t-2xl" style={{ background: `linear-gradient(to right, ${accent}, ${accent}40, transparent)` }} />
        <div className="sticky top-0 bg-[#0a0a0f] border-b border-white/[0.06] px-7 py-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-mono tracking-[0.2em] uppercase mb-1" style={{ color: accent }}>Project Story</p>
            <h2 className="text-white font-bold text-xl">{project.title}</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/[0.06] transition-colors focus-visible:outline-none" aria-label="Close">✕</button>
        </div>
        <div className="px-7 py-4 border-b border-white/[0.06] flex flex-wrap gap-2">
          {project.tech.map(t => (
            <span key={t} className={`text-[11px] px-2.5 py-1 rounded-full border font-medium ${techColors[t] ?? defaultTech}`}>{t}</span>
          ))}
        </div>
        {story ? (
          <div className="px-7 py-6 space-y-6">
            {(Object.keys(storyLabels) as (keyof ProjectStory)[]).map((key, i) => (
              <motion.div key={key} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.06 }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base">{storyIcons[key]}</span>
                  <h3 className="text-white/90 font-semibold text-sm">{storyLabels[key]}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed pl-6">{story[key]}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="px-7 py-12 text-center text-gray-600 text-sm">Story coming soon.</div>
        )}
        <div className="px-7 py-5 border-t border-white/[0.06] flex gap-3">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-300 border border-white/10 hover:border-white/25 hover:text-white transition-all">
              GitHub ↗
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all"
              style={{ background: `linear-gradient(135deg, ${accent}ee, ${accent}99)` }}>
              Live Demo ↗
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
