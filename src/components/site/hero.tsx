import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowDownRight, Phone } from "lucide-react";
import { useRef } from "react";
import heroImg from "@/assets/hero.jpg";
import { CountUp, Magnetic, PremiumButton, SplitText } from "./primitives";

const silk = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  const px = useSpring(useMotionValue(0), { stiffness: 90, damping: 20 });
  const py = useSpring(useMotionValue(0), { stiffness: 90, damping: 20 });
  const tiltX = useTransform(py, [-1, 1], [6, -6]);
  const tiltY = useTransform(px, [-1, 1], [-8, 8]);
  const floatX = useTransform(px, [-1, 1], [-22, 22]);
  const floatY = useTransform(py, [-1, 1], [-16, 16]);

  return (
    <section
      id="inicio"
      ref={ref}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        px.set((e.clientX / window.innerWidth) * 2 - 1);
        py.set((e.clientY / window.innerHeight) * 2 - 1);
      }}
      className="relative flex min-h-[100svh] items-end overflow-hidden px-4 pb-14 pt-32 sm:px-6 sm:pb-20"
    >
      <motion.div style={{ opacity }} className="relative z-10 mx-auto w-full max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.9, ease: silk }}
          className="eyebrow flex items-center gap-3"
        >
          <span className="inline-block h-px w-10 bg-accent" />
          Barbería de autor · Alcoy
        </motion.p>

        <h1 className="mt-8 max-w-4xl font-display text-[clamp(3rem,10vw,7rem)] font-medium leading-[0.92] tracking-[-0.045em]">
          <SplitText text="El corte" by="char" stagger={0.035} />
          <br />
          <span className="text-accent">
            <SplitText text="como oficio" by="char" delay={0.25} stagger={0.03} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.8, duration: 1, ease: silk }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          Cortes de precisión, arreglo de barba y ritual de afeitado en un espacio
          pensado al milímetro. Sin prisas, sin ruido: solo trabajo bien hecho.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.9, ease: silk }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <PremiumButton href="#contacto" data-cursor-label="Reservar">
            Reservar cita
            <ArrowDownRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1" />
          </PremiumButton>
          <PremiumButton href="tel:+34965000000" variant="ghost">
            <Phone className="h-4 w-4" />
            Llamar ahora
          </PremiumButton>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-border pt-8"
        >
          {[
            { v: 18, s: "+", l: "Años de oficio" },
            { v: 4, s: ",9", l: "Valoración media" },
            { v: 30, s: " min", l: "Cita puntual" },
          ].map((k) => (
            <div key={k.l}>
              <dt className="font-display text-3xl tracking-tight sm:text-4xl">
                <CountUp to={k.v} suffix={k.s} />
              </dt>
              <dd className="mt-2 text-xs text-muted-foreground sm:text-sm">{k.l}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      {/* Imagen flotante con parallax de ratón */}
      <motion.div
        aria-hidden={false}
        style={{ y, scale, x: floatX, rotateX: tiltX, rotateY: tiltY }}
        className="pointer-events-none absolute right-[-10%] top-[12%] hidden w-[46vw] max-w-[720px] [perspective:1200px] lg:block"
      >
        <motion.div
          style={{ y: floatY }}
          initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)", scale: 1.1 }}
          animate={{ opacity: 1, clipPath: "inset(0% 0 0 0)", scale: 1 }}
          transition={{ delay: 0.4, duration: 1.6, ease: silk }}
          className="grain relative overflow-hidden rounded-[3rem] border border-border shadow-[var(--shadow-lift)]"
        >
          <img
            src={heroImg}
            width={1600}
            height={1200}
            alt="Interior de Peluquería Pedro en Alcoy con sillón de barbero frente al espejo"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(160deg,transparent_35%,var(--color-background))] opacity-80" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 right-6 hidden items-center gap-3 sm:flex"
      >
        <Magnetic>
          <span className="eyebrow [writing-mode:vertical-rl]">Scroll</span>
        </Magnetic>
        <motion.span
          animate={{ scaleY: [0.2, 1, 0.2], originY: [0, 0, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="block h-16 w-px bg-accent"
        />
      </motion.div>
    </section>
  );
}
