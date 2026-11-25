export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface ProjectStory {
  problem: string;
  process: string;
  outcome: string;
  challenge: string;
  learned: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  /** Screenshot path under /public, e.g. "/images/projects/larlarbook.png". Falls back to a generated cover if missing. */
  image?: string;
  /** Accent colour used for the generated cover and highlights. */
  accent?: string;
  /** Short tag such as "Live", "Client work", "In progress". */
  tag?: string;
  story?: ProjectStory;
}

export interface Skill {
  name: string;
  category: "Frontend" | "Backend" | "Database" | "Tools";
}
