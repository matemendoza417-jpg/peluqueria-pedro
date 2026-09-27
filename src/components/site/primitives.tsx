import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  type Variants,
} from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

const silk = [0.16, 1, 0.3, 1] as const;

/* ---------------------------------------------------------------- Reveal */

type RevealMode =
  | "fade"
  | "mask"
  | "blur"
  | "scale"
  | "slide"
  | "perspective"
  | "wipe"
  | "elastic"
  | "unfold";

const revealVariants: Record<RevealMode, Variants> = {
  fade: {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0 },
  },
  mask: {
    hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)", y: 24 },
    show: { opacity: 1, clipPath: "inset(0 0 0% 0)", y: 0 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(16px)", y: 20 },
    show: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.92 },
    show: { opacity: 1, scale: 1 },
  },
  slide: {
    hidden: { opacity: 0, x: -48 },
    show: { opacity: 1, x: 0 },
  },
  perspective: {
    hidden: { opacity: 0, rotateX: 14, y: 44, transformPerspective: 1000 },
    show: { opacity: 1, rotateX: 0, y: 0, transformPerspective: 1000 },
  },
  /* Barrido diagonal: la pieza aparece cortada en oblicuo, no en fade. */
  wipe: {
    hidden: {
      opacity: 1,
      clipPath: "polygon(0 0, 0 0, -25% 100%, 0 100%)",
    },
    show: {
      opacity: 1,
      clipPath: "polygon(0 0, 125% 0, 100% 100%, 0 100%)",
    },
  },
  /* Entrada elástica con cizalla: se estira y recupera como una cinta. */
  elastic: {
    hidden: { opacity: 0, skewY: 5, scaleY: 1.18, y: 60, transformOrigin: "left top" },
    show: { opacity: 1, skewY: 0, scaleY: 1, y: 0, transformOrigin: "left top" },
  },
  /* Despliegue tipo bisagra desde el borde izquierdo. */
  unfold: {
    hidden: { opacity: 0, rotateY: -38, x: -24, transformPerspective: 1200, transformOrigin: "left center" },
    show: { opacity: 1, rotateY: 0, x: 0, transformPerspective: 1200, transformOrigin: "left center" },
  },
};


export function Reveal({
  children,
  mode = "fade",
  delay = 0,
  duration = 0.9,
  className,
  once = true,
}: {
  children: ReactNode;
  mode?: RevealMode;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      data-reveal
      className={className}
      variants={revealVariants[mode]}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
      transition={{ duration, delay, ease: silk }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------ Split text */

export function SplitText({
  text,
  by = "word",
  className,
  delay = 0,
  stagger = 0.045,
  as: As = "span",
}: {
  text: string;
  by?: "word" | "char";
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}) {
  const tokens = by === "word" ? text.split(" ") : Array.from(text);
  const MotionTag = motion[As] as typeof motion.span;

  return (
    <MotionTag
      data-split
      className={cn("inline-block", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {tokens.map((token, i) => (
        <span
          key={`${token}-${i}`}
          className="inline-block overflow-hidden pb-[0.16em] -mb-[0.16em] align-bottom"
          aria-hidden
        >
          <motion.span
            data-split
            className="inline-block"
            variants={{
              hidden: { y: "110%", opacity: 0, filter: "blur(8px)" },
              show: { y: "0%", opacity: 1, filter: "blur(0px)" },
            }}
            transition={{ duration: 1, ease: silk }}
          >
            {token === " " ? "\u00A0" : token}
          </motion.span>
          {by === "word" && i < tokens.length - 1 ? (
            <span className="inline-block">&nbsp;</span>
          ) : null}
        </span>
      ))}
    </MotionTag>
  );
}

/* --------------------------------------------------------------- Magnetic */

export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x, y }}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el || e.pointerType !== "mouse") return;
        const r = el.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ----------------------------------------------------------------- Button */

type ButtonProps = ComponentPropsWithoutRef<"a"> & {
  variant?: "accent" | "ghost";
  children: ReactNode;
};

export function PremiumButton({
  variant = "accent",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <Magnetic strength={0.28}>
      <a
        data-cursor="cta"
        className={cn(
          "group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-8 py-4 text-sm font-medium tracking-wide transition-[transform,box-shadow,background-color] duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          variant === "accent"
            ? "bg-accent text-accent-foreground shadow-[var(--shadow-glow)] hover:shadow-[0_0_0_1px_var(--color-accent),0_28px_80px_-18px_var(--color-accent)]"
            : "border border-border bg-transparent text-foreground hover:border-accent/60 hover:bg-accent-soft",
          className,
        )}
        {...props}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(100deg,transparent,oklch(1_0_0/35%),transparent)] transition-transform duration-[1100ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-full"
        />
        <span className="relative z-10 flex items-center gap-3">{children}</span>
      </a>
    </Magnetic>
  );
}

/* ------------------------------------------------------------ Count-up kpi */

export function CountUp({
  to,
  suffix = "",
  duration = 1800,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------- Texto descifrado */

const GLYPHS = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789/\\<>*·";

/** Efecto de "descifrado": las letras rotan como una cerradura hasta fijarse. */
export function Scramble({
  text,
  className,
  speed = 34,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const id = window.setInterval(() => {
      frame += 1;
      const locked = Math.floor(frame / 2);
      setOut(
        Array.from(text)
          .map((ch, i) => {
            if (i < locked || ch === " ") return ch;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join(""),
      );
      if (locked >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [inView, text, speed]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden>{out}</span>
    </span>
  );
}
