import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { milestones } from "../data/timelineData";

const ICON_PATHS: Record<string, string> = {
  "Basic Education": "M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z",
  "IGCSE": "M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z",
  "Self-Taught": "M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z",
  "Moved": "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
  "First Steps": "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  "Grocery Store": "M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96C5 16.1 6.1 17 7 17h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0023.25 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z",
  "CleoSpa": "M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z",
  "KBZPay": "M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z",
  "larlarbook": "M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z",
  "Grocery Billing": "M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z",
  "Vision Screening": "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z",
  "Open": "M12 2.5l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17.3l-6.2 4.5 2.4-7.4L2 9.9h7.6z",
};

function getIcon(title: string): string {
  for (const [k] of Object.entries(ICON_PATHS)) {
    if (title.includes(k)) return k;
  }
  return "Open";
}

function Icon({ name, size = 24, color = "currentColor" }: { name: string; size?: number; color?: string }) {
  const path = ICON_PATHS[name] ?? ICON_PATHS["Open"];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

// Each panel gets a layout variant — cycles through 5 different designs
type Variant = "centered" | "split-left" | "split-right" | "minimal" | "bold";
const VARIANTS: Variant[] = ["centered", "split-left", "split-right", "minimal", "bold", "centered", "split-right", "split-left", "minimal", "bold", "centered", "split-left"];

const COLORS = [
  "#818cf8","#a78bfa","#06b6d4","#34d399","#f59e0b",
  "#f97316","#e879f9","#38bdf8","#a855f7","#fb7185","#6366f1","#8b5cf6",
];

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const totalPanels = milestones.length + 1;
  const x = useTransform(smooth, [0, 1], ["0vw", `-${(totalPanels - 1) * 100}vw`]);
  const barWidth = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <section ref={sectionRef} id="timeline" style={{ height: `${totalPanels * 100}vh`, background: "#020205" }} aria-labelledby="timeline-heading">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 z-50" style={{ height: 2, background: "rgba(255,255,255,0.05)" }}>
          <motion.div className="h-full" style={{ width: barWidth, background: "linear-gradient(to right, #6366f1, #a78bfa, #06b6d4)" }} />
        </div>

        <motion.div className="flex h-full" style={{ x, width: `${totalPanels * 100}vw` }}>

          {/* INTRO */}
          <div className="w-screen h-full flex flex-col items-center justify-center flex-shrink-0 px-8 relative">
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.07), transparent)" }} />
            <motion.div className="text-center max-w-2xl" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-3 mb-8">
                <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, rgba(99,102,241,0.5))" }} />
                <span className="font-mono text-[11px] tracking-[0.25em] uppercase" style={{ color: "rgba(99,102,241,0.8)" }}>My Journey</span>
                <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, rgba(99,102,241,0.5))" }} />
              </div>
              <h2 id="timeline-heading" className="font-black text-white leading-none mb-6" style={{ fontSize: "clamp(52px, 9vw, 108px)", letterSpacing: "-3px" }}>
                The Story<br />
                <span style={{ background: "linear-gradient(135deg,#6366f1,#a78bfa,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>So Far</span>
              </h2>
              <p className="text-lg mb-10 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.3)" }}>
                From a classroom in Taunggyi to shipping real products in Singapore — {milestones.length} chapters.
              </p>
              <motion.div className="flex items-center justify-center gap-3" animate={{ x: [0, 10, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
                <span className="font-mono text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>scroll to explore</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(99,102,241,0.7)" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
              </motion.div>
            </motion.div>
          </div>

          {/* MILESTONE PANELS */}
          {milestones.map((m, i) => (
            <Panel key={i} milestone={m} index={i} total={milestones.length}
              color={COLORS[i % COLORS.length]}
              icon={getIcon(m.title)}
              variant={VARIANTS[i % VARIANTS.length]}
              isLast={i === milestones.length - 1}
              progress={smooth} panelIndex={i + 1} totalPanels={totalPanels}
            />
          ))}
        </motion.div>

        {/* Bottom nav */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-1.5">
          {Array.from({ length: totalPanels }).map((_, i) => (
            <Dot key={i} i={i} total={totalPanels} progress={smooth} />
          ))}
        </div>
        <div className="absolute bottom-6 right-8 z-50 font-mono text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
          <Counter progress={smooth} total={totalPanels} />
        </div>
      </div>
    </section>
  );
}

function Panel({ milestone, index, total, color, icon, variant, isLast, progress, panelIndex, totalPanels }:
  { milestone: {year:string;title:string;description:string}; index:number; total:number; color:string; icon:string; variant:Variant; isLast:boolean; progress:any; panelIndex:number; totalPanels:number }) {
  const s = (panelIndex - 0.5) / totalPanels;
  const e = (panelIndex + 0.5) / totalPanels;
  const opacity = useTransform(progress, [s-0.15, s, e, e+0.15], [0,1,1,0]);
  const y = useTransform(progress, [s-0.15, s, e, e+0.15], [48,0,0,-48]);
  const scale = useTransform(progress, [s-0.15, s, e, e+0.15], [0.94,1,1,0.94]);

  return (
    <div className="w-screen h-full flex-shrink-0 relative overflow-hidden flex items-center justify-center">
      {/* Giant bg number */}
      <div className="absolute pointer-events-none select-none font-black"
        style={{ fontSize: "clamp(220px,38vw,480px)", color: `${color}05`, letterSpacing:"-12px", bottom:"-8%", right:"5%", lineHeight:1 }} aria-hidden="true">
        {String(index+1).padStart(2,"0")}
      </div>
      {/* Color glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 55% 45% at 50% 55%, ${color}09, transparent)` }} aria-hidden="true" />

      <motion.div className="relative z-10 w-full max-w-5xl px-10" style={{ opacity, y, scale }}>
        {variant === "centered" && <CenteredLayout m={milestone} index={index} total={total} color={color} icon={icon} isLast={isLast} />}
        {variant === "split-left" && <SplitLayout m={milestone} index={index} total={total} color={color} icon={icon} isLast={isLast} flip={false} />}
        {variant === "split-right" && <SplitLayout m={milestone} index={index} total={total} color={color} icon={icon} isLast={isLast} flip={true} />}
        {variant === "minimal" && <MinimalLayout m={milestone} index={index} total={total} color={color} icon={icon} isLast={isLast} />}
        {variant === "bold" && <BoldLayout m={milestone} index={index} total={total} color={color} icon={icon} isLast={isLast} />}
      </motion.div>
    </div>
  );
}

type M = {year:string;title:string;description:string};
type LP = {m:M;index:number;total:number;color:string;icon:string;isLast:boolean};

// VARIANT 1 — Centered, big icon top, text centered
function CenteredLayout({m,index,total,color,icon,isLast}:LP) {
  return (
    <div className="flex flex-col items-center text-center max-w-xl mx-auto">
      <div className="mb-6 opacity-80"><Icon name={icon} size={48} color={color} /></div>
      <span className="font-mono text-xs tracking-[0.2em] mb-3" style={{color:`${color}99`}}>{String(index+1).padStart(2,"0")} / {total}</span>
      <div className="font-black mb-4 leading-none" style={{fontSize:"clamp(42px,7vw,88px)",letterSpacing:"-2px",background:`linear-gradient(135deg,${color},${color}88)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>{m.year}</div>
      <h3 className="font-bold text-white mb-4" style={{fontSize:"clamp(22px,3vw,38px)",letterSpacing:"-0.5px"}}>{m.title}</h3>
      <p style={{color:"rgba(255,255,255,0.4)",fontSize:"clamp(14px,1.4vw,17px)",lineHeight:1.7,maxWidth:420}}>{m.description}</p>
      {isLast && <div className="mt-6 px-4 py-2 rounded-full font-mono text-xs" style={{background:`${color}18`,color,border:`1px solid ${color}40`}}>Available now ✦</div>}
    </div>
  );
}

// VARIANT 2 — Split: year giant left, content right (or flipped)
function SplitLayout({m,index,total,color,icon,isLast,flip}:LP&{flip:boolean}) {
  const left = (
    <div className="flex flex-col justify-center">
      <div className="font-black leading-none select-none" style={{fontSize:"clamp(80px,14vw,180px)",letterSpacing:"-6px",background:`linear-gradient(160deg,${color}cc,${color}33)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>{m.year}</div>
    </div>
  );
  const right = (
    <div className="flex flex-col justify-center max-w-sm">
      <div className="flex items-center gap-3 mb-5">
        <div className="opacity-80"><Icon name={icon} size={36} color={color} /></div>
        <div className="h-px flex-1" style={{background:`linear-gradient(to right,${color}50,transparent)`}} />
        <span className="font-mono text-[10px] tracking-widest" style={{color:`${color}80`}}>{String(index+1).padStart(2,"0")}/{total}</span>
      </div>
      <h3 className="font-bold text-white mb-3" style={{fontSize:"clamp(20px,2.8vw,40px)",letterSpacing:"-0.5px",lineHeight:1.1}}>{m.title}</h3>
      <p style={{color:"rgba(255,255,255,0.38)",fontSize:"clamp(13px,1.3vw,16px)",lineHeight:1.75}}>{m.description}</p>
      {isLast && <div className="mt-5 inline-flex"><span className="px-3 py-1.5 rounded-full font-mono text-[10px]" style={{background:`${color}18`,color,border:`1px solid ${color}40`}}>Now open ✦</span></div>}
    </div>
  );
  return (
    <div className={`flex items-center gap-12 ${flip ? "flex-row-reverse" : "flex-row"}`}>
      {left}{right}
    </div>
  );
}

// VARIANT 3 — Minimal: just big title + thin details, lots of whitespace
function MinimalLayout({m,index,color,icon,isLast}:LP) {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-6 mb-8">
        <span className="font-mono text-xs tracking-[0.3em]" style={{color:`${color}60`}}>{String(index+1).padStart(2,"0")}</span>
        <div className="flex-1 h-px" style={{background:`linear-gradient(to right,${color}30,transparent)`}} />
        <span className="font-mono text-xs tracking-[0.2em]" style={{color:`${color}60`}}>{m.year}</span>
      </div>
      <h3 className="font-black text-white leading-none mb-6" style={{fontSize:"clamp(36px,6vw,80px)",letterSpacing:"-2px"}}>{m.title}</h3>
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0 mt-1 opacity-75"><Icon name={icon} size={44} color={color} /></div>
        <p style={{color:"rgba(255,255,255,0.4)",fontSize:"clamp(15px,1.5vw,18px)",lineHeight:1.8}}>{m.description}</p>
      </div>
      {isLast && (
        <div className="mt-8 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{background:color}} />
          <span className="font-mono text-sm" style={{color:`${color}cc`}}>Available for internship · Sep 2026</span>
        </div>
      )}
    </div>
  );
}

// VARIANT 4 — Bold: massive title dominates, year small, desc small
function BoldLayout({m,index,color,icon,isLast}:LP) {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-4">
        <span className="opacity-75"><Icon name={icon} size={28} color={color} /></span>
        <span className="font-mono text-xs tracking-[0.25em]" style={{color:`${color}70`}}>Chapter {String(index+1).padStart(2,"0")}</span>
        <div className="h-px flex-1 max-w-[60px]" style={{background:`${color}30`}} />
        <span className="font-mono text-xs" style={{color:`${color}50`}}>{m.year}</span>
        {isLast && <span className="text-xs px-2.5 py-1 rounded-full" style={{background:`${color}18`,color,border:`1px solid ${color}35`}}>NOW</span>}
      </div>
      <h3 className="font-black text-white leading-none mb-6" style={{fontSize:"clamp(40px,7.5vw,100px)",letterSpacing:"-3px",lineHeight:0.92}}>
        {m.title.split(" ").map((word,wi) => (
          <span key={wi} style={wi===0||wi===1?{background:`linear-gradient(135deg,#fff,rgba(255,255,255,0.6))`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}:{background:`linear-gradient(135deg,${color},${color}88)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
            {word}{" "}
          </span>
        ))}
      </h3>
      <div className="flex items-start gap-4">
        <div className="w-0.5 self-stretch rounded-full flex-shrink-0" style={{background:`linear-gradient(to bottom,${color}60,transparent)`}} />
        <p style={{color:"rgba(255,255,255,0.38)",fontSize:"clamp(14px,1.4vw,17px)",lineHeight:1.8,maxWidth:480}}>{m.description}</p>
      </div>
    </div>
  );
}

function Dot({i,total,progress}:{i:number;total:number;progress:any}) {
  const op = useTransform(progress,[(i-0.5)/total,i/total,(i+0.5)/total],[0.2,1,0.2]);
  const sc = useTransform(progress,[(i-0.5)/total,i/total,(i+0.5)/total],[1,1.8,1]);
  return <motion.div className="rounded-full" style={{width:4,height:4,background:"rgba(99,102,241,0.7)",opacity:op,scale:sc}} />;
}
function Counter({progress,total}:{progress:any;total:number}) {
  const n = useTransform(progress,(p:number)=>Math.min(Math.round(p*total)+1,total));
  return <motion.span>{n}</motion.span>;
}
