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
    year: "2026 — Now",
    title: "larlarbook Mobile App",
    description: "Currently building the larlarbook mobile app in Expo — 5 tabs, epub reader, Supabase backend. Implementing pixel-accurate screens from a 73-screen Figma design created by the team.",
  },
  {
    year: "Sep 2026",
    title: "Open to Internships",
    description: "Available for internship from Sep 2026 to Feb 2027. Looking for a full-stack or frontend developer role where I can contribute and grow fast.",
  },
];

export const projects: Project[] = [
  {
    id: 8,
    title: "Royal T HR",
    tag: "Company platform",
    accent: "#c9a96e",
    image: "/images/projects/royal-t-hr.webp",
    description: "HR platform for Royal T Group — a candidate portal, employee self-service for claims and requests, and an admin console for HR, managers and Finance approvals.",
    tech: ["React", "TypeScript", "Cloudflare Workers", "Hono", "Express", "PostgreSQL", "Supabase"],
    demo: "https://royal-t-group.com",
  },
  {
    id: 1,
    title: "larlarbook",
    tag: "Live platform",
    accent: "#a78bfa",
    image: "/images/projects/larlarbook.webp",
    description: "Digital library platform for Burmese books — reading progress tracking, personalised recommendations, and a rich browsing experience for readers in Myanmar.",
    tech: ["TypeScript", "React", "Node.js", "PostgreSQL", "Prisma"],
    github: "https://github.com/ShaneSWA06/larlarbook",
    demo: "https://lar-lar-books-website.vercel.app",
    story: {
      problem: "Myanmar has a rich literary culture but almost no digital way to discover, read, or track Burmese books.",
      process: "Built a full-stack library platform — auth, book catalogue, search, reading progress tracking, and personalised recommendations based on history.",
      outcome: "A working web platform where readers can browse Burmese books, track what they've read, and get recommendations.",
      challenge: "Burmese text rendering — fonts, encoding, and layout all needed special handling. Most frameworks don't handle Burmese script well.",
      learned: "Full product ownership from DB schema to UI polish. How to handle non-Latin scripts and build recommendation logic.",
    },
  },
  {
    id: 9,
    title: "TLJ Blind Box Maker",
    tag: "Used in store",
    accent: "#4f8a5b",
    image: "/images/projects/tlj-blind-box.webp",
    description: "Phone web app for Tous Les Jours staff — tap the day's leftover items and it splits them into S$20 blind boxes automatically, using a live menu from Google Sheets.",
    tech: ["JavaScript", "PWA", "Google Sheets", "Cloudflare Pages"],
    demo: "https://tlj-blind-box.pages.dev",
  },
  {
    id: 3,
    title: "Wallet Counter Pro",
    tag: "Used daily",
    accent: "#38bdf8",
    image: "/images/projects/kbzpay.webp",
    description: "Counter system for KBZPay / WavePay operations — admin and cashier roles, automatic profit calculation, and Gemini AI OCR that fills transactions from receipt photos.",
    tech: ["Node.js", "PostgreSQL", "Supabase", "Gemini API", "Docker", "Render"],
    github: "https://github.com/ShaneSWA06",
    demo: "https://kpayproject-cf80.onrender.com",
    story: {
      problem: "Family business used KBZPay constantly but had no way to track transactions, generate reports, or verify receipts.",
      process: "Started as a simple PWA. Grew into a role-based counter system with admin/cashier accounts, Gemini AI OCR for receipt scanning, profit rules, CSV backups, and Docker deployment.",
      outcome: "Family uses it daily. Receipts scanned in seconds, profit calculated automatically, everything backed up.",
      challenge: "Getting Gemini OCR to reliably extract data from messy real-world receipt photos with variable lighting and angles.",
      learned: "AI APIs in production, Docker pipelines, and the difference between a demo and software people rely on every day.",
    },
  },
  {
    id: 2,
    title: "Zaw Khin Market POS",
    tag: "In real use",
    accent: "#34d399",
    image: "/images/projects/grocery-billing.webp",
    description: "Offline-capable POS billing system with barcode scanning, role-based sign-in, and Supabase-backed inventory for a grocery store in Myanmar.",
    tech: ["React", "Node.js", "Supabase", "TypeScript"],
    github: "https://github.com/ShaneSWA06",
    demo: "https://grocery-store-three-zeta.vercel.app",
    story: {
      problem: "My mum's grocery store billed manually — slow, error-prone, and impossible to track inventory across 1000+ items.",
      process: "Built a POS billing app with barcode scanning, real-time inventory updates, and offline capability for unstable internet.",
      outcome: "The store processes sales faster, inventory stays accurate, and my mum can see stock levels without counting manually.",
      challenge: "Offline-first architecture — syncing data when connectivity returned and handling partial transactions.",
      learned: "Offline-first design, local state management, and building for non-developer users where simplicity > features.",
    },
  },
  {
    id: 10,
    title: "ExpenseFlow",
    tag: "Live",
    accent: "#7c9cf5",
    image: "/images/projects/expenseflow.webp",
    description: "Smart expense tracker with accounts, Gmail integration, offline storage, and PDF report export — React front end with an Express + PostgreSQL API on Render.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Express", "PostgreSQL", "Render"],
    demo: "https://expenseflow-frontend.onrender.com",
  },
  {
    id: 6,
    title: "This Portfolio",
    tag: "Live",
    accent: "#f472b6",
    image: "/images/projects/portfolio.webp",
    description: "The site you're on — an editorial, motion-driven portfolio with a 3D project ribbon, story modals, and a full timeline of my journey. Deployed on Vercel.",
    tech: ["React", "TypeScript", "Framer Motion", "Tailwind CSS", "Vercel"],
    github: "https://github.com/ShaneSWA06/portfolio",
    demo: "https://portfolio-shaneswa06s-projects.vercel.app",
    story: {
      problem: "Needed a portfolio that didn't look like every other student's generic template.",
      process: "Built from scratch — React, TypeScript, Framer Motion, a 3D project ribbon, project story modals. Deployed on Vercel.",
      outcome: "The site you're on right now. Fast, clean, tells my actual story.",
      challenge: "Making it feel premium without overcomplicating. Went through many iterations before landing on something that works for recruiters.",
      learned: "Good design is subtraction. The best version came from removing things, not adding them.",
    },
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
