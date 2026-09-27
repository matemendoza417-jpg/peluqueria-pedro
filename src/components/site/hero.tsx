import { motion, useMotionValue, useScroll, useSpring, useTransform, useReducedMotion } from "motion/react";
import { MapPin, Phone } from "lucide-react";
import { useRef } from "react";
import heroImg from "@/assets/hero.jpg";
import { Magnetic, PremiumButton } from "./primitives";
import { negocio } from "@/lib/business";

const silk = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
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
        if (e.pointerType !== "mouse" || reduce) return;
        px.set((e.clientX / window.innerWidth) * 2 - 1);
        py.set((e.clientY / window.innerHeight) * 2 - 1);
      }}
      className="relative flex min-h-[100svh] items-end overflow-hidden px-4 pb-36 pt-32 sm:px-6 sm:pb-32"
    >
      <motion.div style={reduce ? undefined : { opacity }} className="relative z-10 mx-auto w-full max-w-6xl">
        <motion.p
          data-reveal
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.9, ease: silk }}
          className="eyebrow flex items-center gap-3"
        >
          <span className="inline-block h-px w-10 bg-accent" />
          Alcoi · {negocio.barrio} · Desde {negocio.activoDesde}
        </motion.p>

        <h1 className="mt-8 max-w-4xl font-display text-[clamp(2.75rem,9vw,6rem)] font-medium leading-[0.98] tracking-[-0.045em]">
          <motion.span
            data-split
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.9, ease: silk }}
            className="block"
          >
            Peluquería
          </motion.span>
          <motion.span
            data-split
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.9, ease: silk }}
            className="block text-accent"
          >
            Pedro
          </motion.span>
        </h1>

        <motion.p
          data-reveal
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.5, duration: 1, ease: silk }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          Un salón de barrio en el centro de Alcoi. Corte de pelo y arreglo de
          barba, con el trato que la gente repite: {negocio.nota?.valor} de
          valoración en Google.
        </motion.p>

        {/* CONTACTO ABOVE THE FOLD: teléfono + dirección + CTA primario */}
        <motion.div
          data-reveal
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9, ease: silk }}
          className="mt-8 flex flex-col gap-3 border-l-2 border-accent/60 pl-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8"
        >
          <a
            href={negocio.telHref}
            className="group inline-flex items-center gap-2.5 text-lg"
            aria-label={`Llamar al ${negocio.telefono}`}
          >
            <Phone className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.5} aria-hidden />
            <span className="font-display tracking-tight group-hover:underline">
              {negocio.telefono}
            </span>
          </a>
          <a
            href={negocio.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <MapPin className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} aria-hidden />
            <span className="underline-offset-4 group-hover:underline">
              {negocio.direccionCompleta}
            </span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9, ease: silk }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <PremiumButton href={negocio.telHref} data-cursor-label="Llamar">
            Llamar {negocio.telefono}
          </PremiumButton>
          <PremiumButton href="#servicios" variant="ghost">
            Ver servicios
          </PremiumButton>
        </motion.div>

        <motion.dl
          data-reveal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="mt-12 grid max-w-2xl grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-3"
        >
          {[
            { v: String(negocio.activoDesde), l: "En activo desde" },
            { v: negocio.nota?.valor ?? "—", l: "Valoración en Google" },
            { v: "1 solo canal", l: "Reserva por teléfono" },
          ].map((k) => (
            <div key={k.l}>
              <dt className="font-display text-2xl tracking-tight sm:text-3xl">{k.v}</dt>
              <dd className="mt-2 text-xs text-muted-foreground sm:text-sm">{k.l}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      {/* Imagen flotante con parallax de ratón */}
      <motion.div
        aria-hidden={false}
        style={reduce ? undefined : { y, scale, x: floatX, rotateX: tiltX, rotateY: tiltY }}
        className="pointer-events-none absolute right-[-10%] top-[10%] hidden w-[46vw] max-w-[720px] [perspective:1200px] lg:block"
      >
        <motion.div
          style={reduce ? undefined : { y: floatY }}
          initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)", scale: 1.1 }}
          animate={{ opacity: 1, clipPath: "inset(0% 0 0 0)", scale: 1 }}
          transition={{ delay: 0.4, duration: 1.6, ease: silk }}
          className="grain relative overflow-hidden rounded-[3rem] border border-border shadow-[var(--shadow-lift)]"
        >
          <img
            src={heroImg}
            width={1600}
            height={1200}
            alt="Interior del salón Peluquería Pedro en Alcoi"
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
          animate={reduce ? undefined : { scaleY: [0.2, 1, 0.2], originY: [0, 0, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="block h-16 w-px bg-accent"
        />
      </motion.div>
    </section>
  );
}
