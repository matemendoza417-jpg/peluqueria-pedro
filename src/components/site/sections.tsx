import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import {
  Clock,
  Instagram,
  MapPin,
  MessageCircle,
  MoveHorizontal,
  Phone,
  Quote,
  Scissors,
  Sparkles,
  Star,
  Waves,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import corteImg from "@/assets/corte.jpg";
import localImg from "@/assets/local-interior.jpg";
import { Magnetic, PremiumButton, Reveal, Scramble, SplitText } from "./primitives";


const silk = [0.16, 1, 0.3, 1] as const;

function SectionHead({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="max-w-3xl">
      <Reveal mode="slide">
        <p className="eyebrow flex items-center gap-3">
          <span className="inline-block h-px w-8 bg-accent" />
          {eyebrow}
        </p>
      </Reveal>
      <h2 className="mt-6 font-display text-[clamp(2.25rem,5.5vw,4rem)] font-medium leading-[1.02] tracking-[-0.04em]">
        <SplitText text={title} by="word" stagger={0.05} />
      </h2>
      {intro ? (
        <Reveal mode="blur" delay={0.15}>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{intro}</p>
        </Reveal>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------- Servicios */

const services = [
  {
    icon: Scissors,
    name: "Corte de precisión",
    price: "16 €",
    time: "40 min",
    text: "Estudio de forma, lavado, corte a tijera y máquina, y acabado con producto a medida.",
  },
  {
    icon: Waves,
    name: "Barba & perfilado",
    price: "12 €",
    time: "30 min",
    text: "Diseño de contorno, tijera, navaja y toalla caliente con bálsamo calmante.",
  },
  {
    icon: Sparkles,
    name: "Ritual completo",
    price: "26 €",
    time: "70 min",
    text: "Corte, barba, tratamiento capilar y masaje craneal. La experiencia completa.",
  },
  {
    icon: Star,
    name: "Extras de casa",
    price: "desde 8 €",
    time: "15 min",
    text: "Cejas, mascarilla negra, color y camuflaje de canas, corte infantil.",
  },
];

export function Servicios() {
  return (
    <section id="servicios" className="relative z-10 px-4 py-28 sm:px-6 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          eyebrow="Servicios"
          title="Cada servicio, un protocolo propio."
          intro="Trabajamos con tiempos reales y precios claros. Nada de prisas ni sorpresas al pagar."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.name} mode="elastic" delay={i * 0.09}>
              <motion.article
                data-cursor="card"
                whileHover={{ y: -8, rotateX: 3, rotateY: -3 }}
                transition={{ duration: 0.6, ease: silk }}
                className="group glass-panel relative h-full overflow-hidden rounded-[2rem] p-8 [transform-style:preserve-3d] [perspective:900px] sm:p-10"
              >
                <span className="pointer-events-none absolute inset-x-0 -top-32 h-64 bg-[radial-gradient(50%_60%_at_50%_50%,var(--color-accent-soft),transparent)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <span className="pointer-events-none absolute inset-0 rounded-[2rem] border border-transparent transition-colors duration-700 group-hover:border-accent/40" />
                <div className="relative flex items-start justify-between gap-6">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-border bg-accent-soft transition-transform duration-700 group-hover:rotate-[9deg] group-hover:scale-110">
                    <s.icon className="h-5 w-5 text-accent" strokeWidth={1.4} />
                  </div>
                  <div className="text-right">
                    <p className="font-display text-2xl tracking-tight">{s.price}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{s.time}</p>
                  </div>
                </div>
                <h3 className="relative mt-8 font-display text-2xl tracking-tight">{s.name}</h3>
                <p className="relative mt-3 text-base leading-relaxed text-muted-foreground">
                  {s.text}
                </p>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Filosofía */

const pillars = [
  { n: "01", t: "Escuchar antes de cortar", d: "Cada cabeza tiene su forma, su remolino y su rutina. Empezamos preguntando." },
  { n: "02", t: "Técnica sin atajos", d: "Formación continua, herramienta afilada y protocolos que no se saltan nunca." },
  { n: "03", t: "Trato de barrio", d: "Somos de Alcoy. Aquí se viene a cortarse el pelo y también a estar a gusto." },
];

export function Filosofia() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="filosofia" className="relative z-10 px-4 py-28 sm:px-6 sm:py-40">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1fr_1.05fr] lg:items-center">
        <div ref={ref} className="order-2 lg:order-1">
          <Reveal mode="mask">
            <motion.div
              data-cursor="image"
              className="grain relative overflow-hidden rounded-[2.5rem] border border-border shadow-[var(--shadow-lift)]"
            >
              <motion.img
                src={corteImg}
                loading="lazy"
                width={1200}
                height={1504}
                alt="Barbero cortando el pelo con tijera en Peluquería Pedro"
                style={{ y: imgY }}
                className="h-[30rem] w-full scale-110 object-cover transition-transform duration-[1400ms] hover:scale-[1.16] sm:h-[38rem]"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,oklch(0.16_0.028_249/0.85))]" />
              <div className="absolute bottom-6 left-6 right-6 glass-panel rounded-3xl px-6 py-5">
                <p className="eyebrow">Desde 2007</p>
                <p className="mt-2 font-display text-xl tracking-tight">
                  Un oficio que se aprende con las manos.
                </p>
              </div>
            </motion.div>
          </Reveal>
        </div>

        <div className="order-1 lg:order-2">
          <SectionHead
            eyebrow="Filosofía"
            title="No cortamos rápido. Cortamos bien."
            intro="Pedro abrió con una idea simple: tratar a cada cliente como si fuera el único de la mañana. Todo lo demás viene de ahí."
          />
          <ul className="mt-12 space-y-px">
            {pillars.map((p, i) => (
              <Reveal key={p.n} mode="fade" delay={i * 0.12}>
                <li className="group grid grid-cols-[auto_minmax(0,1fr)] gap-6 border-t border-border py-8 transition-colors duration-500 hover:border-accent/50">
                  <span className="font-display text-sm text-accent">{p.n}</span>
                  <div className="min-w-0">
                    <h3 className="font-display text-xl tracking-tight transition-transform duration-500 group-hover:translate-x-1.5">
                      {p.t}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-muted-foreground">{p.d}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- Local */

export function Local() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.02, 1.15]);

  return (
    <section id="local" className="relative z-10 py-28 sm:py-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead
          eyebrow="El local"
          title="Un espacio que invita a quedarse."
        />
      </div>

      <div ref={ref} className="relative mt-16 overflow-hidden">
        <motion.div
          initial={{ clipPath: "inset(12% 12% 12% 12% round 3rem)" }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0% round 0rem)" }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.4, ease: silk }}
          className="grain relative h-[60vh] min-h-[26rem] w-full overflow-hidden"
        >
          <motion.img
            src={localImg}
            loading="lazy"
            width={1408}
            height={1760}
            alt="Interior del local de Peluquería Pedro en Alcoy"
            style={{ y, scale }}
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,var(--color-background)_0%,transparent_28%,transparent_62%,var(--color-background)_100%)]" />
        </motion.div>
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl gap-5 px-4 sm:grid-cols-3 sm:px-6">
        {[
          { i: MapPin, t: "Alcoy, Alicante", d: "Carrer Sant Nicolau 12, a dos minutos del centro." },
          { i: Clock, t: "Martes a sábado", d: "09:30 – 14:00 · 16:30 – 20:30" },
          { i: Sparkles, t: "Sin esperas", d: "Cita previa por teléfono, WhatsApp o formulario." },
        ].map((c, i) => (
          <Reveal key={c.t} mode="wipe" delay={i * 0.1}>
            <div className="glass-panel h-full rounded-[1.75rem] p-7 transition-transform duration-700 hover:-translate-y-1.5">
              <c.i className="h-5 w-5 text-accent" strokeWidth={1.4} />
              <p className="mt-5 font-display text-lg tracking-tight">{c.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mx-auto mt-20 max-w-6xl px-4 sm:px-6">
        <div className="hairline" />
      </div>

      {/* Marquee de detalle */}
      <div className="relative mt-10 overflow-hidden py-4">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          className="flex w-max gap-12 whitespace-nowrap"
        >
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-12">
              {["Corte a tijera", "Navaja clásica", "Toalla caliente", "Degradados", "Color y canas", "Cuidado de barba"].map(
                (w) => (
                  <span
                    key={w}
                    className="font-display text-2xl tracking-tight text-muted-foreground/50 sm:text-4xl"
                  >
                    {w}
                    <span className="ml-12 text-accent">·</span>
                  </span>
                ),
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Contacto */

export function Contacto() {
  return (
    <section id="contacto" className="relative z-10 px-4 py-28 sm:px-6 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="glass-panel grain relative overflow-hidden rounded-[2.5rem] px-6 py-14 sm:px-14 sm:py-20">
          <motion.span
            aria-hidden
            animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.15, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/20 blur-[90px]"
          />
          <div className="relative grid gap-14 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <SectionHead
                eyebrow="Reservar"
                title="Pide tu cita en un minuto."
                intro="Elige el canal que prefieras. Confirmamos en el mismo día, siempre con hora exacta."
              />
              <div className="mt-10 flex flex-wrap gap-3">
                <PremiumButton href="https://wa.me/34600000000" data-cursor-label="WhatsApp">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </PremiumButton>
                <PremiumButton href="tel:+34965000000" variant="ghost">
                  <Phone className="h-4 w-4" />
                  965 00 00 00
                </PremiumButton>
              </div>
              <div className="mt-12 space-y-4 text-sm text-muted-foreground">
                <p className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.4} />
                  Carrer Sant Nicolau 12, 03801 Alcoy (Alicante)
                </p>
                <p className="flex items-center gap-3">
                  <Clock className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.4} />
                  Martes a sábado · 09:30–14:00 y 16:30–20:30
                </p>
              </div>
            </div>

            <Reveal mode="blur" delay={0.1}>
              <form
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  const f = new FormData(e.currentTarget);
                  const msg = `Hola Pedro, soy ${f.get("nombre")}. Me gustaría pedir cita para ${f.get("servicio")}. ${f.get("mensaje") ?? ""}`;
                  window.open(`https://wa.me/34600000000?text=${encodeURIComponent(msg)}`, "_blank");
                }}
              >
                {[
                  { id: "nombre", label: "Nombre", type: "text", ph: "Tu nombre" },
                  { id: "telefono", label: "Teléfono", type: "tel", ph: "600 000 000" },
                ].map((f) => (
                  <div key={f.id} className="group">
                    <label htmlFor={f.id} className="eyebrow">
                      {f.label}
                    </label>
                    <input
                      id={f.id}
                      name={f.id}
                      type={f.type}
                      required
                      placeholder={f.ph}
                      className="mt-3 w-full rounded-2xl border border-input bg-background/40 px-5 py-4 text-base outline-none transition-all duration-500 placeholder:text-muted-foreground/60 focus:border-accent/70 focus:bg-background/70 focus:shadow-[var(--shadow-glow)]"
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="servicio" className="eyebrow">
                    Servicio
                  </label>
                  <select
                    id="servicio"
                    name="servicio"
                    className="mt-3 w-full appearance-none rounded-2xl border border-input bg-background/40 px-5 py-4 text-base outline-none transition-all duration-500 focus:border-accent/70 focus:bg-background/70 focus:shadow-[var(--shadow-glow)]"
                  >
                    {services.map((s) => (
                      <option key={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="mensaje" className="eyebrow">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={3}
                    placeholder="¿Algún día u hora preferida?"
                    className="mt-3 w-full resize-none rounded-2xl border border-input bg-background/40 px-5 py-4 text-base outline-none transition-all duration-500 placeholder:text-muted-foreground/60 focus:border-accent/70 focus:bg-background/70 focus:shadow-[var(--shadow-glow)]"
                  />
                </div>
                <Magnetic strength={0.2}>
                  <button
                    type="submit"
                    data-cursor="cta"
                    data-cursor-label="Enviar"
                    className="group relative w-full overflow-hidden rounded-full bg-accent px-8 py-4 text-sm font-medium text-accent-foreground transition-shadow duration-500 hover:shadow-[var(--shadow-glow)]"
                  >
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(100deg,transparent,oklch(1_0_0/40%),transparent)] transition-transform duration-1000 group-hover:translate-x-full" />
                    <span className="relative">Enviar solicitud</span>
                  </button>
                </Magnetic>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Footer */

export function Footer() {
  return (
    <footer className="relative z-10 px-4 pb-12 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="hairline" />
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-6 py-10 sm:flex sm:justify-between">
          <div className="min-w-0">
            <p className="font-display text-lg tracking-tight">Peluquería Pedro</p>
            <p className="mt-1 text-sm text-muted-foreground">Barbería de autor · Alcoy</p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <Magnetic>
              <a
                href="https://instagram.com"
                aria-label="Instagram de Peluquería Pedro"
                data-cursor="link"
                className="grid h-11 w-11 place-items-center rounded-full border border-border transition-all duration-500 hover:border-accent/60 hover:bg-accent-soft"
              >
                <Instagram className="h-4 w-4" strokeWidth={1.4} />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="https://wa.me/34600000000"
                aria-label="WhatsApp de Peluquería Pedro"
                data-cursor="link"
                className="grid h-11 w-11 place-items-center rounded-full border border-border transition-all duration-500 hover:border-accent/60 hover:bg-accent-soft"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.4} />
              </a>
            </Magnetic>
          </div>
        </div>
        <p className="pb-2 text-xs text-muted-foreground/70">
          © {new Date().getFullYear()} Peluquería Pedro. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

/* Barra fija de acción en móvil */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[58] px-4 pb-4 lg:hidden">
      <div className="glass-panel flex items-center gap-2 rounded-full p-2">
        <a
          href="tel:+34965000000"
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border px-4 py-3 text-sm"
        >
          <Phone className="h-4 w-4" strokeWidth={1.5} /> Llamar
        </a>
        <a
          href="https://wa.me/34600000000"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-medium text-accent-foreground"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={1.5} /> Reservar
        </a>
      </div>
    </div>
  );
}
