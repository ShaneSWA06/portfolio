import { useState } from "react";
import type { Project } from "../types";

/**
 * Shows a project's screenshot. If the image is missing, renders a generated
 * "app window" cover in the project's accent colour so the layout never breaks.
 */
export default function ProjectCover({ project, eager = false }: { project: Project; eager?: boolean }) {
  const [failed, setFailed] = useState(!project.image);
  const accent = project.accent ?? "#9fb5ff";

  if (!failed && project.image) {
    return (
      <img
        src={project.image}
        alt={`${project.title} screenshot`}
        loading={eager ? "eager" : "lazy"}
        draggable={false}
        onError={() => setFailed(true)}
        className="block w-full h-full object-cover object-top"
      />
    );
  }

  return (
    <div
      className="@container relative w-full h-full overflow-hidden"
      style={{
        background: `radial-gradient(120% 90% at 15% 0%, ${accent}66, transparent 60%), radial-gradient(80% 80% at 100% 100%, ${accent}22, transparent 70%), linear-gradient(160deg, #171b29, #0a0c12)`,
      }}
      role="img"
      aria-label={`${project.title} cover`}
    >
      {/* window chrome */}
      <div className="absolute inset-x-0 top-0 flex items-center gap-[1.4cqw] px-[3cqw] h-[8cqw] border-b border-white/10 bg-black/20">
        <span className="size-[1.6cqw] rounded-full bg-white/25" />
        <span className="size-[1.6cqw] rounded-full bg-white/15" />
        <span className="size-[1.6cqw] rounded-full bg-white/10" />
        <span className="ml-[3cqw] h-[2.4cqw] w-[30cqw] rounded-full bg-white/10" />
      </div>
      {/* faux content */}
      <div className="absolute left-[6cqw] right-[6cqw] top-[16cqw]">
        <span className="block font-mono uppercase tracking-[0.2em] text-[2.4cqw]" style={{ color: accent }}>
          {project.tag ?? "Project"}
        </span>
        <span className="block font-serif text-white leading-[0.95] mt-[1.5cqw] text-[11cqw]">{project.title}</span>
        <div className="mt-[4cqw] flex flex-wrap gap-[1.4cqw]">
          {project.tech.slice(0, 3).map((t) => (
            <span key={t} className="font-mono text-[2.2cqw] px-[1.8cqw] py-[0.6cqw] rounded-full border border-white/15 text-white/60">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="absolute right-[6cqw] bottom-[6cqw] left-[46cqw] grid grid-cols-3 gap-[1.6cqw]">
        {[0.5, 0.8, 0.35, 0.65, 0.45, 0.9].map((h, i) => (
          <span key={i} className="rounded-[1cqw] bg-white/[0.07]" style={{ height: `${h * 9}cqw` }} />
        ))}
      </div>
    </div>
  );
}
