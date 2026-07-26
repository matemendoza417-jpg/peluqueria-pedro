import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const silk = [0.16, 1, 0.3, 1] as const;

export function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const total = 1700;
    const tick = (now: number) => {
      const p = Math.min((now - start) / total, 1);
      setProgress(Math.round(100 * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => {
          setVisible(false);
          onDone();
        }, 420);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="grain fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0, filter: "blur(12px)", scale: 1.04 }}
          transition={{ duration: 0.9, ease: silk }}
        >
          <div className="ambient-field pointer-events-none absolute inset-0 opacity-70" />
          <motion.div
            initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: silk }}
            className="relative flex flex-col items-center gap-6"
          >
            <div className="relative grid h-20 w-20 place-items-center">
              <motion.span
                className="absolute inset-0 rounded-full border border-accent/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                style={{ borderTopColor: "transparent", borderLeftColor: "transparent" }}
              />
              <motion.span
                className="absolute inset-2 rounded-full border border-champagne/25"
                animate={{ rotate: -360 }}
                transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                style={{ borderBottomColor: "transparent" }}
              />
              <span className="font-display text-2xl font-medium tracking-tight text-foreground">
                P
              </span>
            </div>
            <p className="eyebrow">Peluquería Pedro · Alcoy</p>
          </motion.div>

          <div className="relative mt-12 h-px w-56 overflow-hidden bg-border">
            <motion.div
              className="absolute inset-y-0 left-0 bg-[image:var(--gradient-accent)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-4 font-display text-xs tabular-nums tracking-[0.3em] text-muted-foreground">
            {String(progress).padStart(3, "0")}
          </p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
