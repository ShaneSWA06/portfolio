import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import ProjectCards from "./components/ProjectCards";
import Timeline from "./components/Timeline";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Signature from "./components/Signature";

// ── Loading screen: the signature writes itself, then the curtain lifts ──────
function LoadingScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2100);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <Signature size="clamp(90px, 18vw, 180px)" instant delay={0.15} className="text-paper" />
      <motion.p className="label mt-2 text-white/35" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.6 }}>
        Shane Wint Aung · Portfolio
      </motion.p>
    </motion.div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return <motion.div className="fixed inset-x-0 top-0 z-[65] h-[2px] origin-left bg-gradient-to-r from-accent/40 via-accent to-paper" style={{ scaleX }} aria-hidden="true" />;
}

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <AnimatePresence>{loading && <LoadingScreen onDone={() => setLoading(false)} />}</AnimatePresence>

      {!loading && (
        <>
          <ScrollProgress />
          <Navbar />
          <main>
            <div id="hero">
              <Hero />
            </div>
            <Stats />
            <ProjectCards />
            <Timeline />
            <Skills />
            <Contact />
          </main>
        </>
      )}
    </>
  );
}
