import { motion } from "framer-motion";
import Signature from "./Signature";

const ease = [0.16, 1, 0.3, 1] as const;
const EMAIL = "shanewintaung2006@gmail.com";

const LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com/in/shanewintaung" },
  { label: "GitHub", href: "https://github.com/ShaneSWA06" },
  { label: "Résumé", href: "/Shane_Wint_Aung_Resume.pdf" },
];

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink px-5 pb-10 pt-28 sm:px-8 lg:px-14 lg:pt-40" aria-labelledby="contact-heading">
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[70vh] w-[100vw] -translate-x-1/2"
        style={{ background: "radial-gradient(closest-side, rgba(77,102,166,0.3), rgba(77,102,166,0.08) 55%, transparent)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1320px]">
        <motion.div
          className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/25 bg-emerald-400/[0.06] px-4 py-2"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/60" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-[13px] text-emerald-200/90">Available for internship · Sep 2026 – Feb 2027</span>
        </motion.div>

        <h2 id="contact-heading" className="mt-10 font-serif leading-[0.9] text-paper" style={{ fontSize: "clamp(64px, 13vw, 220px)" }}>
          {["Let's build", "something real."].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block"
                initial={{ y: "105%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: i * 0.1, ease }}
              >
                {i === 1 ? (
                  <>
                    something <em className="italic text-accent">real.</em>
                  </>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h2>

        <div className="mt-16 grid grid-cols-1 items-end gap-12 lg:grid-cols-2">
          <div>
            <p className="max-w-[440px] text-[17px] leading-relaxed text-white/55">
              Looking for a full-stack or frontend role where I can contribute fast, learn from great people, and build things that matter. Based in Singapore — open to hybrid or on-site.
            </p>
            <a href={`mailto:${EMAIL}`} className="group mt-10 inline-block font-serif text-[clamp(26px,3.4vw,46px)] leading-none text-paper">
              {EMAIL}
              <span className="mt-3 block h-px w-full origin-left bg-white/25 transition-all duration-500 group-hover:bg-accent" />
            </a>
          </div>
          <div className="flex flex-col items-start gap-10 lg:items-end">
            <ul className="flex flex-wrap gap-3">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-[14px] text-white/75 transition-colors hover:border-white/40 hover:text-paper"
                  >
                    {l.label} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="text-left lg:text-right">
              <p className="label text-white/35">With thanks,</p>
              <Signature size={96} delay={0.2} className="-ml-2 text-paper lg:-mr-4 lg:ml-0" />
            </div>
          </div>
        </div>

        <footer className="mt-24 flex flex-col gap-3 border-t border-white/[0.07] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="label text-white/30">© {new Date().getFullYear()} Shane Wint Aung</p>
          <p className="label text-white/30">Designed & built in Singapore</p>
        </footer>
      </div>
    </section>
  );
}
