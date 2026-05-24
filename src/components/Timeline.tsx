import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { milestones } from "../data/timelineData";

export default function Timeline() {
  return (
    <section id="timeline" className="relative py-32 px-6 bg-black">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-indigo-400 text-sm font-mono tracking-widest uppercase mb-3">My Journey</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">The Story So Far</h2>
        </motion.div>

        <div className="relative">
          {/* Vertical spine line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-indigo-500/50 via-purple-500/30 to-transparent" />

          <div className="flex flex-col gap-16">
            {milestones.map((milestone, index) => (
              <TimelineItem key={index} milestone={milestone} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ milestone, index }: { milestone: { year: string; title: string; description: string }; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className="relative grid grid-cols-2 gap-8 items-center"
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Left side */}
      <div className={isLeft ? "text-right" : "flex justify-end order-last"}>
        {isLeft ? (
          <Card milestone={milestone} />
        ) : (
          <span className="text-5xl font-black text-gray-800 select-none">{milestone.year}</span>
        )}
      </div>

      {/* Center dot */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10">
        <motion.div
          className="w-4 h-4 rounded-full bg-indigo-500 border-2 border-indigo-300 shadow-lg shadow-indigo-500/50"
          animate={inView ? { scale: [0, 1.4, 1] } : { scale: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </div>

      {/* Right side */}
      <div className={isLeft ? "" : ""}>
        {isLeft ? (
          <span className="text-5xl font-black text-gray-800 select-none">{milestone.year}</span>
        ) : (
          <Card milestone={milestone} />
        )}
      </div>
    </motion.div>
  );
}

function Card({ milestone }: { milestone: { year: string; title: string; description: string } }) {
  return (
    <motion.div
      className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm hover:border-indigo-500/50 transition-colors duration-300"
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(99,102,241,0.1)" }}
    >
      <p className="text-indigo-400 text-xs font-mono tracking-widest mb-2">{milestone.year}</p>
      <h3 className="text-white font-bold text-lg mb-2">{milestone.title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{milestone.description}</p>
    </motion.div>
  );
}
