export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
}

export interface Skill {
  name: string;
  category: "Frontend" | "Backend" | "Database" | "Tools";
}
