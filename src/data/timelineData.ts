import type { Milestone, Project, Skill } from "../types";

export const milestones: Milestone[] = [
  { year: "2021", title: "IGCSE O-Levels", description: "Studied in Mandalay, Myanmar — first exposure to structured problem solving." },
  { year: "2024", title: "Joined Singapore Polytechnic", description: "Diploma in IT — started building real projects and learning full-stack development." },
  { year: "2025", title: "CleoSpa (INC Project)", description: "Spa management app for a real client. First taste of requirements gathering and team collaboration." },
  { year: "2025", title: "KBZPay Transaction Tracker", description: "PWA for my family's business in Myanmar. Added Gemini OCR in v2." },
  { year: "2026", title: "Vision Screening System (FYP)", description: "Intranet system for a real client. Full lifecycle: client meetings, system diagrams, delivery." },
];

export const projects: Project[] = [
  {
    id: 1,
    title: "KBZPay Transaction Tracker",
    description: "PWA to track mobile wallet transactions for a family business in Myanmar. v2 uses Gemini API for OCR receipt scanning.",
    tech: ["TypeScript", "Prisma", "Neon DB", "Render", "Gemini API"],
    github: "https://github.com/ShaneSWA06",
  },
  {
    id: 2,
    title: "Grocery Store Inventory App",
    description: "Inventory system for 1000+ items with barcode scanning, coordinating with my mum's store in Myanmar.",
    tech: ["TypeScript", "Prisma", "Supabase", "Cloudflare"],
    github: "https://github.com/ShaneSWA06",
  },
  {
    id: 3,
    title: "CleoSpa Management App",
    description: "Full spa management system built for a real client under SP's INC programme. Handled requirements gathering, system diagrams, and client delivery.",
    tech: ["Java", "MySQL", "HTML/CSS", "JavaScript"],
    github: "https://github.com/ShaneSWA06",
  },
  {
    id: 4,
    title: "Vision Screening Intranet System",
    description: "FYP intranet system for a real client. Full project lifecycle from client meetings and system design to final delivery.",
    tech: ["TypeScript", "React", "Node.js", "PostgreSQL", "Prisma"],
    github: "https://github.com/ShaneSWA06",
  },
  {
    id: 5,
    title: "Portfolio Timeline",
    description: "This site — a scroll-driven animated portfolio built with React, TypeScript, and Framer Motion.",
    tech: ["React", "TypeScript", "Framer Motion", "Tailwind CSS"],
    github: "https://github.com/ShaneSWA06",
  },
];

export const skills: Skill[] = [
  // Languages
  { name: "TypeScript", category: "Frontend" },
  { name: "JavaScript", category: "Frontend" },
  { name: "Java", category: "Backend" },
  { name: "Python", category: "Backend" },
  { name: "HTML5", category: "Frontend" },
  { name: "CSS3", category: "Frontend" },
  { name: "SQL", category: "Database" },

  // Frontend
  { name: "React.js", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Framer Motion", category: "Frontend" },
  { name: "Responsive Design", category: "Frontend" },
  { name: "UI/UX Design", category: "Frontend" },

  // Backend
  { name: "Node.js", category: "Backend" },
  { name: "Express.js", category: "Backend" },
  { name: "REST APIs", category: "Backend" },
  { name: "Server-Side Rendering", category: "Backend" },
  { name: "Authentication & Auth", category: "Backend" },

  // Database
  { name: "PostgreSQL", category: "Database" },
  { name: "MySQL", category: "Database" },
  { name: "SQLite", category: "Database" },
  { name: "Prisma ORM", category: "Database" },
  { name: "Neon DB", category: "Database" },
  { name: "Supabase", category: "Database" },

  // Tools & DevOps
  { name: "Git & GitHub", category: "Tools" },
  { name: "VS Code", category: "Tools" },
  { name: "Render", category: "Tools" },
  { name: "Cloudflare", category: "Tools" },
  { name: "Postman", category: "Tools" },
  { name: "Figma", category: "Tools" },
  { name: "Agile / Scrum", category: "Tools" },
  { name: "Linux CLI", category: "Tools" },
  { name: "Networking Fundamentals", category: "Tools" },
  { name: "System Design", category: "Tools" },
  { name: "Gemini API", category: "Tools" },
];
