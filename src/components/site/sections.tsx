import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import {
  Clock,
  MapPin,
  Phone,
  Quote,
  Scissors,
  Sparkles,
  Star,
  Waves,
} from "lucide-react";
import { useRef } from "react";
import corteImg from "@/assets/corte.jpg";
import localImg from "@/assets/local-interior.jpg";
import { negocio } from "@/lib/business";
import { Magnetic, PremiumButton, Reveal, SplitText } from "./primitives";

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
    name: "Corte de pelo",
    desc: "El servicio principal del salón. Estudio de la forma, lavado, corte y acabado. La técnica concreta y el precio se confirman por teléfono.",
  },
  {
    icon: Waves,
    name: "Arreglo de barba",
    desc: "Perfilado, toalla caliente y cuidado de la barba. También se atiende a quien viene solo por esto.",
  },
  {
    icon: Sparkles,
    name: "Color y retoques",
    desc: "Color, cejas y otros trabajos según el caso. Llámanos y te decimos qué se puede hacer y cuánto cuesta.",
  },
  {
    icon: Star,
    name: "Pequeños de la casa",
    desc: "Cortes para los peques. Dilo al reservar y se busca un hueco tranquilo.",
  },
];

export function Servicios() {
  return (
    <section id="servicios" className="relative z-10 px-4 py-28 sm:px-6 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          eyebrow="Servicios"
          title="Un salón de barrio, sin lista cerrada."
          intro="Estos son los bloques de trabajo del local. No publicamos tarifas porque cambian: la llamada te da el precio exacto antes de sentarte en la silla."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.name} mode="elastic" delay={i * 0.09}>
              <motion.article
                data-cursor="card"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.6, ease: silk }}
                className="group glass-panel relative h-full overflow-hidden rounded-[2rem] p-8 sm:p-10"
              >
                <span className="pointer-events-none absolute inset-x-0 -top-32 h-64 bg-[radial-gradient(50%_60%_at_50%_50%,var(--color-accent-soft),transparent)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <span className="pointer-events-none absolute inset-0 rounded-[2rem] border border-transparent transition-colors duration-700 group-hover:border-accent/40" />
                <div className="relative flex items-start justify-between gap-6">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-border bg-accent-soft transition-transform duration-700 group-hover:rotate-[9deg] group-hover:scale-110">
                    <s.icon className="h-5 w-5 text-accent" strokeWidth={1.4} />
                  </div>
                  <span className="rounded-full border border-border px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Precio al llamar
                  </span>
                </div>
                <h3 className="relative mt-8 font-display text-2xl tracking-tight">{s.name}</h3>
                <p className="relative mt-3 text-base leading-relaxed text-muted-foreground">
                  {s.desc}
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
  {
    n: "01",
    t: "Escuchar antes de cortar",
    d: "Cada cabeza tiene su forma, su remolino y su rutina. Primero preguntamos, después cortamos.",
  },
  {
    n: "02",
    t: "Trato de barrio",
    d: "Somos de Alcoi. Aquí se viene a cortarse el pelo y también a estar a gusto un rato.",
  },
  {
    n: "03",
    t: "Un solo teléfono",
    d: "Si el salón está lleno, se dice. No hay reservas online ni formularios: se llama y se busca hueco.",
  },
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
                alt="Corte de pelo en el salón Peluquería Pedro de Alcoi"
                style={{ y: imgY }}
                className="h-[30rem] w-full scale-110 object-cover transition-transform duration-[1400ms] hover:scale-[1.16] sm:h-[38rem]"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,oklch(0.16_0.028_249/0.85))]" />
              <div className="absolute bottom-6 left-6 right-6 glass-panel rounded-3xl px-6 py-5">
                <p className="eyebrow">En activo desde {negocio.activoDesde}</p>
                <p className="mt-2 font-display text-xl tracking-tight">
                  {negocio.titular}
                </p>
              </div>
            </motion.div>
          </Reveal>
        </div>

        <div className="order-1 lg:order-2">
          <SectionHead
            eyebrow="Filosofía"
            title="No cortamos rápido. Cortamos bien."
            intro={`Pedro lleva el salón desde ${negocio.activoDesde} con una idea simple: tratar a cada cliente como si fuera el único de la mañana.`}
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

/* --------------------------------------------------------------- Reseñas */

export function Resenas() {
  return (
    <section id="resenas" className="relative z-10 px-4 py-28 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          eyebrow="Reseñas"
          title={`${negocio.nota?.valor} en Google, y lo que dicen.`}
          intro="Citas textuales de reseñas públicas de Google. El número de reseñas que aparece en cada plataforma no coincide, así que no lo publicamos."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {negocio.resenas.map((r, i) => (
            <Reveal key={r} mode="fade" delay={i * 0.1}>
              <figure className="glass-panel flex h-full flex-col rounded-[2rem] p-8">
                <Quote className="h-6 w-6 text-accent" strokeWidth={1.4} aria-hidden />
                <blockquote className="mt-6 flex-1 font-display text-xl leading-snug tracking-tight">
                  &laquo;{r}&raquo;
                </blockquote>
                <figcaption className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Reseña de Google
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- Local */

export function Local() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.02, 1.15]);

  const cards = [
    {
      i: MapPin,
      t: `Alcoi, ${negocio.barrio}`,
      d: `${negocio.direccion}, ${negocio.cp} ${negocio.ciudad} (${negocio.provincia}).`,
    },
    {
      i: Clock,
      t: "Horario por teléfono",
      d: "No lo publicamos hasta confirmarlo con el salón. Llama y te decimos si hoy hay hueco y a qué hora.",
    },
    {
      i: Phone,
      t: "Solo un canal",
      d: `No hay reservas online. La cita se pide llamando al ${negocio.telefono}.`,
    },
  ];

  return (
    <section id="local" className="relative z-10 py-28 sm:py-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead eyebrow="El local" title="Un espacio que invita a quedarse." />
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
            alt="Interior del local de Peluquería Pedro en Alcoi"
            style={reduce ? undefined : { y, scale }}
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,var(--color-background)_0%,transparent_28%,transparent_62%,var(--color-background)_100%)]" />
        </motion.div>
      </div>

      <div id="horario" className="mx-auto mt-16 grid max-w-6xl scroll-mt-28 gap-5 px-4 sm:grid-cols-3 sm:px-6">
        {cards.map((c, i) => (
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
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          className="flex w-max gap-12 whitespace-nowrap"
        >
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-12">
              {["Corte de pelo", "Arreglo de barba", "Servicio de barrio", "Cita por teléfono", "l'Eixample, Alcoi", "Desde 2018"].map(
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
                title="Pide tu cita por teléfono."
                intro="Es el único canal del salón, y el que mejor funciona. Una llamada y te decimos si hay hueco."
              />
              <div className="mt-10 flex flex-wrap gap-3">
                <PremiumButton href={negocio.telHref} data-cursor-label="Llamar">
                  <Phone className="h-4 w-4" />
                  {negocio.telefono}
                </PremiumButton>
                <PremiumButton href={negocio.mapsUrl} target="_blank" rel="noopener noreferrer" variant="ghost">
                  <MapPin className="h-4 w-4" />
                  Cómo llegar
                </PremiumButton>
              </div>
              <div className="mt-12 space-y-4 text-sm text-muted-foreground">
                <p className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.4} aria-hidden />
                  <span>
                    {negocio.direccion}, {negocio.cp} {negocio.ciudad} ({negocio.provincia}) —{" "}
                    {negocio.barrio}
                  </span>
                </p>
                <p className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.4} aria-hidden />
                  <span>Horario: consúltalo por teléfono. No lo publicamos sin confirmarlo.</span>
                </p>
                <p className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.4} aria-hidden />
                  <span>Sin WhatsApp, sin reservas online. Titular: {negocio.titular}.</span>
                </p>
              </div>
            </div>

            <Reveal mode="blur" delay={0.1}>
              <div className="glass-panel h-full rounded-[2rem] p-8 sm:p-10">
                <h3 className="font-display text-2xl tracking-tight">
                  Antes de llamar, esto te ahorra un minuto
                </h3>
                <ul className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <li>
                    <strong className="text-foreground">¿Vas con la web?</strong> Esta
                    es la primera. Antes de este trabajo, Peluquería Pedro no tenía
                    ninguna.
                  </li>
                  <li>
                    <strong className="text-foreground">¿Precio?</strong> Va por
                    trabajo, no por lista cerrada. Se dice antes de empezar.
                  </li>
                  <li>
                    <strong className="text-foreground">¿Cita?</strong> Se
                    recomienda, pero en un salón de barrio muchas veces se entra
                    directo.
                  </li>
                </ul>
                <div className="mt-8">
                  <Magnetic strength={0.2}>
                    <a
                      href={negocio.telHref}
                      data-cursor="cta"
                      data-cursor-label="Llamar"
                      className="group relative block w-full overflow-hidden rounded-full bg-accent px-8 py-4 text-center text-sm font-medium text-accent-foreground transition-shadow duration-500 hover:shadow-[var(--shadow-glow)]"
                    >
                      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(100deg,transparent,oklch(1_0_0/40%),transparent)] transition-transform duration-1000 group-hover:translate-x-full" />
                      <span className="relative">Llamar {negocio.telefono}</span>
                    </a>
                  </Magnetic>
                </div>
              </div>
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
    <footer className="relative z-10 px-4 pb-32 sm:px-6 lg:pb-12">
      <div className="mx-auto max-w-6xl">
        <div className="hairline" />
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-6 py-10 sm:flex sm:justify-between">
          <div className="min-w-0">
            <p className="font-display text-lg tracking-tight">{negocio.nombre}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Peluquería de barrio · {negocio.barrio}, {negocio.ciudad}
            </p>
            <a
              href={negocio.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              {negocio.direccion}, {negocio.cp} {negocio.ciudad}
            </a>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <Magnetic>
              <a
                href={negocio.telHref}
                aria-label={`Llamar a ${negocio.nombre}`}
                data-cursor="link"
                className="grid h-11 w-11 place-items-center rounded-full border border-border transition-all duration-500 hover:border-accent/60 hover:bg-accent-soft"
              >
                <Phone className="h-4 w-4" strokeWidth={1.4} />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={negocio.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Cómo llegar a ${negocio.nombre}`}
                data-cursor="link"
                className="grid h-11 w-11 place-items-center rounded-full border border-border transition-all duration-500 hover:border-accent/60 hover:bg-accent-soft"
              >
                <MapPin className="h-4 w-4" strokeWidth={1.4} />
              </a>
            </Magnetic>
          </div>
        </div>

        <nav aria-label="Enlaces legales" className="flex flex-wrap gap-x-5 gap-y-2 pb-2">
          <a href="/aviso-legal" className="text-xs text-muted-foreground/70 underline-offset-4 hover:text-foreground hover:underline">
            Aviso legal
          </a>
          <a href="/privacidad" className="text-xs text-muted-foreground/70 underline-offset-4 hover:text-foreground hover:underline">
            Privacidad
          </a>
          <a href="/cookies" className="text-xs text-muted-foreground/70 underline-offset-4 hover:text-foreground hover:underline">
            Cookies
          </a>
        </nav>

        <p className="pb-2 text-xs text-muted-foreground/70">
          © {new Date().getFullYear()} {negocio.nombre}. Todos los derechos reservados.
        </p>
        <p className="max-w-3xl pb-2 text-[11px] leading-relaxed text-muted-foreground/60">
          Propuesta de diseño. Proyectos y opiniones mostrados son material de
          muestra. Los precios y servicios indicados son meramente informativos
          (art. 7 LSSI).
        </p>
      </div>
    </footer>
  );
}
