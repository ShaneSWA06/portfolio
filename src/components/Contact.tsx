import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

const LINKS = [
  {
    label: "Email Me",
    sub: "shanewintaung2006@gmail.com",
    href: "mailto:shanewintaung2006@gmail.com",
    icon: "✉",
    primary: true,
    color: "#22c55e",
  },
  {
    label: "LinkedIn",
    sub: "linkedin.com/in/shanewintaung",
    href: "https://linkedin.com/in/shanewintaung",
    icon: "in",
    primary: false,
    color: "rgba(255,255,255,0.7)",
  },
  {
    label: "GitHub",
    sub: "github.com/ShaneSWA06",
    href: "https://github.com/ShaneSWA06",
    icon: "⌥",
    primary: false,
    color: "rgba(255,255,255,0.5)",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{ background: "#0a0a0f", paddingTop: "8rem", paddingBottom: "6rem" }}
      aria-labelledby="contact-heading"
    >
      {/* Top divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-rose-500/30" aria-hidden="true" />

      {/* Large background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-black text-center leading-none whitespace-nowrap"
          style={{
            fontSize: "clamp(80px, 18vw, 220px)",
            letterSpacing: "-6px",
            color: "rgba(255,255,255,0.015)",
          }}
        >
          LET'S TALK
        </span>
      </div>

      {/* Ambient glow bottom */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "80vw",
          height: "40vh",
          background: "radial-gradient(ellipse at 50% 100%, rgba(255,255,255,0.02), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6">

        {/* Eyebrow */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.12))" }} />
          <span className="font-mono text-[11px] tracking-[0.25em] uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>
            Get In Touch
          </span>
          <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(to left, transparent, rgba(255,255,255,0.12))" }} />
        </motion.div>

        {/* Heading */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            id="contact-heading"
            className="font-black text-white leading-none"
            style={{ fontSize: "clamp(44px, 8vw, 96px)", letterSpacing: "-3px" }}
          >
            Let's Work
            <span
              className="block"
              style={{
                background: "rgba(255,255,255,1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Together
            </span>
          </h2>
        </motion.div>

        {/* Availability badge */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <div
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full"
            style={{
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.25)",
            }}
          >
            <motion.span
              className="w-2 h-2 rounded-full"
              style={{ background: "#22c55e" }}
              animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-medium" style={{ color: "rgba(74,222,128,0.95)" }}>
              Available for internship · Sep 2026 – Feb 2027
            </span>
          </div>
        </motion.div>

        {/* Sub text */}
        <motion.p
          className="text-center text-base leading-relaxed mb-14 max-w-lg mx-auto"
          style={{ color: "rgba(255,255,255,0.3)" }}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          Looking for a role where I can contribute fast, learn from great people,
          and build something that actually matters. Based in Singapore — open to hybrid or on-site.
        </motion.p>

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {LINKS.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="group relative rounded-2xl overflow-hidden flex flex-col items-center justify-center text-center p-7 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              style={{
                background: link.primary ? `linear-gradient(135deg, ${link.color}22, ${link.color}0a)` : "#0d0d12",
                border: `1px solid ${link.primary ? `${link.color}40` : "rgba(255,255,255,0.06)"}`,
                boxShadow: link.primary ? `0 0 40px ${link.color}12` : "none",
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.45 + i * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              {/* Hover top shimmer */}
              <div
                className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(to right, transparent, ${link.color}80, transparent)` }}
                aria-hidden="true"
              />

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: `${link.color}18`,
                  border: `1px solid ${link.color}30`,
                  color: link.color,
                  fontFamily: link.icon === "in" ? "serif" : "inherit",
                }}
              >
                {link.icon}
              </div>

              <span className="font-semibold text-white text-base mb-1">{link.label}</span>
              <span className="text-xs font-mono truncate w-full" style={{ color: "rgba(255,255,255,0.25)" }}>
                {link.sub}
              </span>

              {/* Arrow */}
              <span
                className="absolute top-4 right-4 text-xs opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5"
                style={{ color: link.color }}
              >
                ↗
              </span>
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {/* Divider */}
          <div className="flex items-center gap-4 w-full max-w-sm">
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
            <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.15)" }}>✦</span>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
          </div>

          <p className="font-mono text-xs text-center" style={{ color: "rgba(255,255,255,0.12)" }}>
            Designed & built by Shane Wint Aung · React + TypeScript + Framer Motion
          </p>
        </motion.div>
      </div>
    </section>
  );
}
