import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SignatureProps {
  /** Font size in px (or any CSS length). */
  size?: number | string;
  delay?: number;
  color?: string;
  className?: string;
  /** Play immediately instead of waiting to scroll into view. */
  instant?: boolean;
}

/**
 * Cursive "Shane" signature that writes itself left-to-right when it enters the viewport.
 */
export default function Signature({ size = 64, delay = 0, color = "currentColor", className = "", instant = false }: SignatureProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const play = instant || inView;

  return (
    <motion.span
      ref={ref}
      role="img"
      aria-label="Shane (signature)"
      className={`font-sign inline-block leading-none select-none whitespace-nowrap ${className}`}
      style={{ fontSize: size, color, padding: "0.18em 0.35em 0.1em 0.1em" }}
      initial={{ clipPath: "inset(-20% 100% -20% 0)", opacity: 0.2 }}
      animate={play ? { clipPath: "inset(-20% -5% -20% 0)", opacity: 1 } : {}}
      transition={{ duration: 1.8, delay, ease: [0.65, 0, 0.35, 1] }}
    >
      Shane
    </motion.span>
  );
}
