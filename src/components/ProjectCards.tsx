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
};

const defaultTech = "bg-gray-700/40 text-gray-400 border-gray-600/30";

interface ProjectStory {
  problem: string;
  process: string;
  outcome: string;
  challenge: string;
  learned: string;
}

const stories: Record<number, ProjectStory> = {
  1: {
    problem: "Myanmar has a rich literary culture but almost no digital way to discover, read, or track Burmese books. People relied on physical stores or word of mouth.",
    process: "I designed and built a full-stack library platform from scratch — user authentication, a book catalogue with search and filters, reading progress tracking, and a personalised recommendation engine based on reading history.",
    outcome: "A fully working web app where users can browse Burmese books, track what they've read, and get recommendations. Built entirely solo.",
    challenge: "Burmese text rendering was tricky — fonts, encoding, and layout all needed special handling. Most web frameworks don't handle Burmese script well out of the box.",
    learned: "Full product ownership from database schema to UI polish. Also deepened my understanding of recommendation logic and how to handle non-Latin scripts in web apps.",
  },
  2: {
    problem: "My mum runs a small grocery store in Myanmar. Billing was done manually — slow, error-prone, and impossible to track inventory accurately across 1000+ items.",
    process: "Built a POS-style billing app with barcode scanning so items scan in instantly, auto-calculate totals, and update inventory in real time. Made it offline-capable so it works even with unstable internet.",
    outcome: "The store now processes sales faster, inventory stays accurate, and my mum can see what's running low without manually counting stock. Real impact for a real family.",
    challenge: "Making it work offline was the hardest part — I had to think carefully about data sync when connectivity came back, and handle edge cases like partial transactions.",
    learned: "Offline-first architecture, local state management, and what it actually means to build software for someone who isn't a developer. Simplicity of UI matters more than features.",
  },
  3: {
    problem: "My family's business in Myanmar uses KBZPay mobile wallet constantly, but there was no easy way to track transactions, generate reports, or verify receipts — everything was manual.",
    process: "Started with a simple PWA to log transactions. v2 added Gemini AI to scan receipt photos and auto-extract transaction data via OCR. Added CSV export, multi-language support (English + Burmese), and deployed with Docker on Render.",
    outcome: "The family now uses it daily. Receipts get scanned in seconds, reports are generated automatically, and everything is backed up. Went from a side project to production software.",
    challenge: "Getting Gemini's OCR to reliably extract structured data from messy real-world receipt photos — lighting, angles, and handwriting all varied wildly.",
    learned: "Working with AI APIs in production, Docker deployment pipelines, and the difference between a demo and software people actually rely on every day.",
  },
  4: {
    problem: "CleoSpa, a real spa business, was managing appointments, staff schedules, and customer records entirely through WhatsApp and paper. Chaotic and hard to scale.",
    process: "As part of SP's INC programme, our team met with the client, gathered requirements, designed system diagrams (ERD, use case, sequence), and built a full management system with booking, staff management, and customer profiles.",
    outcome: "Delivered a working system to a real client on a real deadline. The client could manage bookings, track staff schedules, and maintain customer history — all in one place.",
    challenge: "This was my first time doing proper client communication. Translating what the client said they wanted vs what they actually needed was harder than the coding itself.",
    learned: "Requirements gathering, stakeholder communication, and the importance of system design before writing a single line of code. Also: clients change their minds — build flexible.",
  },
  5: {
    problem: "A real organisation needed an intranet tool for conducting and recording vision screening tests for their community programmes. Paper-based records were slow and hard to analyse.",
    process: "As my Final Year Project, I led the full lifecycle — client discovery, requirements, system architecture, database design, development, testing, and final presentation. Built an intranet web app for screening staff to record test results and generate reports.",
    outcome: "A complete, tested, and handed-over intranet system. The client could run screening sessions, record results digitally, and export reports for analysis.",
    challenge: "Balancing client expectations with scope and timeline as a student team was tough. We had to push back on feature requests and prioritise ruthlessly.",
    learned: "Full software development lifecycle end to end. Project management, client negotiation, and what it takes to deliver something that gets used beyond the classroom.",
  },
  6: {
    problem: "I needed a portfolio that didn't look like every other student's generic template — something that told my actual story and showed I could build things properly.",
    process: "Built from scratch with React, TypeScript, Framer Motion, and Tailwind. Features a cinematic animated hero, scroll-driven timeline, project cards, and a full skills section. Dark and light mode. Deployed on Vercel.",
    outcome: "The site you're on right now. It loads fast, looks clean, works on mobile, and actually tells my story rather than just listing skills.",
    challenge: "Making it feel premium without overcomplicating it. I went through multiple iterations — 3D text experiments, orange fire themes, teal gradients — before landing on something that actually works for a recruiter audience.",
    learned: "Good design is mostly subtraction. The best version of this site came from removing things, not adding them.",
  },
};

const storyLabels = {
  problem: "The Problem",
  process: "What I Built",
  outcome: "The Result",
  challenge: "Hardest Part",
  learned: "What I Learned",
};

const storyIcons: Record<string, string> = {
  problem: "❓",
  process: "⚙️",
  outcome: "✅",
  challenge: "🔥",
  learned: "💡",
};

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}

export default function ProjectCards() {
  const [selected, setSelected] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "larlarbook",
      description: "Full-stack digital library platform for Burmese books with reading progress tracking and personalised recommendations.",
      tech: ["TypeScript", "React", "Node.js", "PostgreSQL", "Prisma"],
      github: "https://github.com/ShaneSWA06/larlarbook",
    },
    {
      id: 2,
      title: "Grocery Billing System",
      description: "Offline-capable POS billing app with barcode scanning and Supabase-backed inventory for my mum's store in Myanmar.",
      tech: ["React", "Node.js", "Supabase", "TypeScript"],
      github: "https://github.com/ShaneSWA06",
    },
    {
      id: 3,
      title: "KBZPay Transaction Tracker",
      description: "PWA for tracking mobile wallet transactions. v2 adds Gemini AI OCR, CSV backups, multi-language support, Docker deployment.",
      tech: ["TypeScript", "Prisma", "Neon DB", "Gemini API", "Docker", "Render"],
      github: "https://github.com/ShaneSWA06",
    },
    {
      id: 4,
      title: "CleoSpa Management App",
      description: "Full spa management system built for a real client under SP's INC programme — bookings, staff, and customer management.",
      tech: ["TypeScript", "JavaScript", "Prisma ORM", "MySQL", "REST APIs", "Google Translate API", "AWS", "HTML/CSS"],
      github: "https://github.com/ShaneSWA06",
    },
    {
      id: 5,
      title: "Vision Screening System",
      description: "Final Year Project — intranet vision screening system built for a real client. Full lifecycle from discovery to delivery.",
      tech: ["TypeScript", "React", "Node.js", "PostgreSQL", "Prisma"],
      github: "https://github.com/ShaneSWA06",
    },
    {
      id: 6,
      title: "Portfolio Website",
      description: "This site — scroll-driven animated portfolio with dark/light mode, Framer Motion animations, and a full journey timeline.",
      tech: ["React", "TypeScript", "Framer Motion", "Tailwind CSS", "Vercel"],
      github: "https://github.com/ShaneSWA06/portfolio",
      demo: "https://portfolio-shaneswa06s-projects.vercel.app",
    },
  ];

  return (
    <section id="projects" className="relative py-32 px-6 bg-black" aria-labelledby="projects-heading">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-indigo-500/40" aria-hidden="true" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-indigo-400 text-xs font-mono tracking-[0.2em] uppercase mb-4">What I Built</p>
          <h2 id="projects-heading" className="text-4xl md:text-5xl font-bold text-white tracking-tight">Projects</h2>
          <p className="mt-4 text-gray-500 text-base max-w-md mx-auto leading-relaxed">
            Click any project to read the full story.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} onOpen={setSelected} />
          ))}
        </div>
      </div>

      {/* Story Modal */}
      <AnimatePresence>
        {selected && (
          <StoryModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article
      ref={ref}
      className="group relative flex flex-col bg-[#0d0d0d] border border-white/[0.06] rounded-2xl p-7 overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
      onClick={() => onOpen(project)}
      role="button"
      tabIndex={0}
      aria-label={`Read the story behind ${project.title}`}
      onKeyDown={(e) => e.key === "Enter" && onOpen(project)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/[0.04] group-hover:to-purple-500/[0.04] transition-all duration-500 rounded-2xl" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/0 to-transparent group-hover:via-indigo-500/60 transition-all duration-300" />

      <div className="relative z-10 flex flex-col h-full">
        <span className="text-[4rem] font-black leading-none text-white/[0.04] group-hover:text-white/[0.07] transition-colors duration-300 select-none mb-3" aria-hidden="true">
          {String(project.id).padStart(2, "0")}
        </span>

        <h3 className="text-white font-semibold text-lg leading-snug mb-2 group-hover:text-indigo-200 transition-colors duration-200">
          {project.title}
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-5" role="list" aria-label="Technologies used">
          {project.tech.map((t) => (
            <span key={t} role="listitem" className={`text-[11px] px-2.5 py-1 rounded-full border font-medium tracking-wide ${techColors[t] ?? defaultTech}`}>
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
          <span className="text-xs text-indigo-400/70 group-hover:text-indigo-400 transition-colors duration-200 font-mono">
            Read the story →
          </span>
          <div className="flex gap-4">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="text-xs text-gray-500 hover:text-white transition-colors duration-200"
                onClick={(e) => e.stopPropagation()}
                aria-label={`View ${project.title} on GitHub`}>
                GitHub ↗
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer"
                className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
                onClick={(e) => e.stopPropagation()}
                aria-label={`View live demo of ${project.title}`}>
                Live ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function StoryModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const story = stories[project.id];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Story behind ${project.title}`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0a0a0f] border border-white/[0.08] rounded-2xl shadow-2xl"
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#0a0a0f] border-b border-white/[0.06] px-7 py-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-indigo-400 text-xs font-mono tracking-[0.2em] uppercase mb-1">Project Story</p>
            <h2 className="text-white font-bold text-xl leading-tight">{project.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/[0.06] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            aria-label="Close story"
          >
            ✕
          </button>
        </div>

        {/* Tech stack */}
        <div className="px-7 py-4 border-b border-white/[0.06] flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className={`text-[11px] px-2.5 py-1 rounded-full border font-medium ${techColors[t] ?? defaultTech}`}>
              {t}
            </span>
          ))}
        </div>

        {/* Story sections */}
        {story ? (
          <div className="px-7 py-6 space-y-7">
            {(Object.keys(storyLabels) as (keyof ProjectStory)[]).map((key, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base" aria-hidden="true">{storyIcons[key]}</span>
                  <h3 className="text-white/90 font-semibold text-sm tracking-wide">{storyLabels[key]}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed pl-6">{story[key]}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="px-7 py-12 text-center text-gray-600 text-sm">Story coming soon.</div>
        )}

        {/* Footer links */}
        <div className="px-7 py-5 border-t border-white/[0.06] flex gap-4">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-300 border border-white/10 hover:border-white/25 hover:text-white transition-all duration-200">
              View on GitHub ↗
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-200"
              style={{ background: "linear-gradient(135deg,rgba(99,102,241,0.95),rgba(139,92,246,0.95))" }}>
              Live Demo ↗
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
