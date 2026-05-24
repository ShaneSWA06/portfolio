import { motion } from "framer-motion";

const links = [
  {
    label: "Email Me",
    href: "mailto:shanewintaung@gmail.com",
    primary: true,
    ariaLabel: "Send Shane an email",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/shanewintaung",
    primary: false,
    ariaLabel: "View Shane on LinkedIn",
  },
  {
    label: "GitHub",
    href: "https://github.com/ShaneSWA06",
    primary: false,
    ariaLabel: "View Shane on GitHub",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-40 px-6 bg-black overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Bottom glow */}
      <motion.div
        className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-[0.07] blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #6366f1, #8b5cf6, transparent)" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.07, 0.12, 0.07] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      {/* Section top divider */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-rose-500/30"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Availability badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
            <span className="text-green-400 text-xs font-mono tracking-wide">
              Available · Sep 2026 – Feb 2027
            </span>
          </div>

          <p className="text-rose-400 text-xs font-mono tracking-[0.2em] uppercase mb-4">
            Get In Touch
          </p>

          <h2
            id="contact-heading"
            className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-5"
          >
            Let's Work Together
          </h2>

          <p className="text-gray-500 text-base leading-relaxed mb-12 max-w-md mx-auto">
            I'm looking for an internship where I can contribute, learn fast, and build
            something meaningful. Based in Singapore, open to hybrid or on-site roles.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-wrap gap-3 justify-center mb-20"
            role="list"
            aria-label="Contact links"
          >
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                role="listitem"
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                aria-label={link.ariaLabel}
                className={
                  link.primary
                    ? "px-7 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    : "px-7 py-3.5 border border-white/10 hover:border-white/25 text-gray-400 hover:text-white rounded-full text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                }
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                whileHover={{ scale: 1.04, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.97 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t border-white/[0.05] pt-8">
            <p className="text-gray-700 text-xs font-mono tracking-wide">
              Designed & built by Shane Wint Aung · React + TypeScript + Framer Motion
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
