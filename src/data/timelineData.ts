import type { Milestone, Project, Skill } from "../types";

export const milestones: Milestone[] = [
  {
    year: "2009–2020",
    title: "Basic Education, Myanmar",
    description: "Attended Basic Education Middle School No.14 in Taunggyi, Myanmar. Class representative for 4 years — early foundation in leadership and responsibility.",
  },
  {
    year: "2021–2022",
    title: "IGCSE O-Levels",
    description: "Completed GCE O-Level equivalents at an Edexcel Centre in Yangon, Myanmar. First serious academic challenge — built discipline and study habits.",
  },
  {
    year: "2022–2023",
    title: "Self-Taught HTML & CSS",
    description: "While studying for O-Levels, started self-teaching HTML and CSS on the side. Built small projects like a countdown timer and a shopping list app — the spark that made coding feel real.",
  },
  {
    year: "Apr 2024",
    title: "Moved to Singapore",
    description: "Left family in Myanmar and moved to Singapore alone to pursue a Diploma in Information Technology at Singapore Polytechnic. A bold leap into a new country and a new field.",
  },
  {
    year: "2024",
    title: "First Steps in Code",
    description: "Learned programming fundamentals, data structures, databases, and web development at SP. Chose the INC (Industry Now Curriculum) track — real client work over exams.",
  },
  {
    year: "2024–2025",
    title: "Grocery Store Inventory App",
    description: "Built a 1000+ item inventory system with barcode scanning to help coordinate my mum's grocery store back in Myanmar. Real problem, real solution.",
  },
  {
    year: "2025",
    title: "CleoSpa — First Real Client",
    description: "Delivered a full spa management app under SP's INC programme. Handled requirements gathering, system diagrams, team collaboration, and client delivery.",
  },
  {
    year: "2025",
    title: "KBZPay Transaction Tracker",
    description: "Built a PWA to track mobile wallet transactions for the family business. v2 added Gemini AI OCR for receipt scanning, Docker deployment, and multi-language support.",
  },
  {
    year: "2025",
    title: "larlarbook",
    description: "Built a full-stack digital library platform for Burmese books — reading progress tracking, personalised recommendations, and a rich browsing experience.",
  },
  {
    year: "2025–2026",
    title: "Grocery Billing System",
    description: "Offline-capable POS billing app with barcode scanning and Supabase-backed inventory. Built for real use in a retail environment.",
  },
  {
    year: "2026",
    title: "Vision Screening FYP",
    description: "Final Year Project — intranet vision screening system for a real client. Full lifecycle from client meetings and system design to tested delivery.",
  },
  {
    year: "Sep 2026",
    title: "Open to Internships",
    description: "Available for internship from Sep 2026 to Feb 2027. Looking for a full-stack or frontend developer role where I can contribute and grow fast.",
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: "larlarbook",
    description: "Full-stack digital library platform for Burmese books. Features reading progress tracking, personalised recommendations, and a rich browsing experience.",
    tech: ["TypeScript", "React", "Node.js", "PostgreSQL", "Prisma"],
    github: "https://github.com/ShaneSWA06/larlarbook",
  },
  {
    id: 2,
    title: "Grocery Billing System",
    description: "Offline-capable POS-style grocery billing app with barcode scanning, inventory management, and Supabase-backed data persistence.",
    tech: ["React", "Node.js", "Supabase", "TypeScript"],
    github: "https://github.com/ShaneSWA06",
  },
  {
    id: 3,
    title: "KBZPay Transaction Tracker",
    description: "Progressive Web App for tracking mobile wallet transactions for a family business in Myanmar. v2 adds Gemini AI OCR for receipt scanning, CSV backups, and multi-language support. Deployed with Docker.",
    tech: ["TypeScript", "Prisma", "Neon DB", "Gemini API", "Docker", "Render"],
    github: "https://github.com/ShaneSWA06",
  },
  {
    id: 4,
    title: "CleoSpa Management App",
    description: "Full spa management system built for a real client under SP's INC programme. Handled requirements gathering, system diagrams, and client delivery.",
    tech: ["Java", "MySQL", "HTML/CSS", "JavaScript"],
    github: "https://github.com/ShaneSWA06",
  },
  {
    id: 5,
    title: "Vision Screening System",
    description: "Intranet-based vision screening system built as FYP for a real client. Full project lifecycle from client meetings and system design to final delivery.",
    tech: ["TypeScript", "React", "Node.js", "PostgreSQL", "Prisma"],
    github: "https://github.com/ShaneSWA06",
  },
  {
    id: 6,
    title: "Portfolio Website",
    description: "This site — a scroll-driven animated portfolio with dark/light mode, Framer Motion animations, and a full timeline of my journey. Deployed on Vercel.",
    tech: ["React", "TypeScript", "Framer Motion", "Tailwind CSS", "Vercel"],
    github: "https://github.com/ShaneSWA06/portfolio",
    demo: "https://portfolio-shaneswa06s-projects.vercel.app",
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
  { name: "Docker", category: "Tools" },
  { name: "Vercel", category: "Tools" },
  { name: "Render", category: "Tools" },
  { name: "Cloudflare", category: "Tools" },
  { name: "Postman", category: "Tools" },
  { name: "Figma", category: "Tools" },
  { name: "Agile / Scrum", category: "Tools" },
  { name: "Linux CLI", category: "Tools" },
  { name: "System Design", category: "Tools" },
  { name: "Gemini API", category: "Tools" },
];
