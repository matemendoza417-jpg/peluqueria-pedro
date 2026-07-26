import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";

/* Barra de progreso de scroll, muy fina */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-[image:var(--gradient-accent)]"
    />
  );
}

/* Campo ambiental: orbes flotantes, malla y grano */
export function Atmosphere() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="ambient-field absolute inset-0" />
      <div className="orb absolute -left-40 top-[8%] h-[38rem] w-[38rem] bg-accent/20" />
      <div
        className="orb absolute -right-52 top-[38%] h-[44rem] w-[44rem] bg-[oklch(0.35_0.06_245)]/50"
        style={{ animationDelay: "-6s", animationDuration: "24s" }}
      />
      <div
        className="orb absolute bottom-[-12%] left-[30%] h-[32rem] w-[32rem] bg-champagne/10"
        style={{ animationDelay: "-12s", animationDuration: "30s" }}
      />
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage: "radial-gradient(80% 60% at 50% 30%, black, transparent 78%)",
        }}
      />
      <div className="grain absolute inset-0" />
    </div>
  );
}

/* Cursor personalizado con blob, magnetismo y texto contextual */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;

      const target = (e.target as HTMLElement)?.closest<HTMLElement>("[data-cursor]");
      if (target) {
        setHovering(true);
        setLabel(target.dataset.cursorLabel ?? null);
      } else {
        setHovering(false);
        setLabel(null);
      }
    };

    const loop = () => {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent md:block"
        style={{ marginLeft: "-3px", marginTop: "-3px" }}
      />
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[89] hidden md:block"
      >
        <div
          className="flex items-center justify-center rounded-full border border-accent/50 bg-accent/10 backdrop-blur-[2px] transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
          style={{
            width: hovering ? 78 : 34,
            height: hovering ? 78 : 34,
            marginLeft: hovering ? -39 : -17,
            marginTop: hovering ? -39 : -17,
          }}
        >
          {label ? (
            <span className="text-[10px] uppercase tracking-[0.2em] text-foreground">
              {label}
            </span>
          ) : null}
        </div>
      </div>
    </>
  );
}
