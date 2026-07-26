import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Magnetic } from "./primitives";

const links = [
  { label: "Servicios", href: "#servicios" },
  { label: "Filosofía", href: "#filosofia" },
  { label: "El local", href: "#local" },
  { label: "Contacto", href: "#contacto" },
];

const silk = [0.16, 1, 0.3, 1] as const;

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
    setHidden(y > last && y > 220 && !open);
    setLast(y);
  });

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: silk }}
        className="fixed inset-x-0 top-0 z-[60] px-4 pt-4 sm:px-6 sm:pt-6"
      >
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full px-5 py-3 transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] sm:px-7 ${
            scrolled ? "glass-panel" : "border border-transparent"
          }`}
        >
          <a
            href="#inicio"
            data-cursor="logo"
            className="flex min-w-0 items-center gap-3"
            aria-label="Peluquería Pedro, inicio"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-accent/40 bg-accent-soft font-display text-sm">
              P
            </span>
            <span className="truncate font-display text-sm font-medium tracking-tight">
              Peluquería Pedro
            </span>
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  data-cursor="link"
                  className="link-underline text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            <Magnetic strength={0.25} className="hidden sm:inline-block">
              <a
                href="#contacto"
                data-cursor="cta"
                data-cursor-label="Reservar"
                className="group relative inline-flex items-center overflow-hidden rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-shadow duration-500 hover:shadow-[var(--shadow-glow)]"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(100deg,transparent,oklch(1_0_0/40%),transparent)] transition-transform duration-1000 group-hover:translate-x-full" />
                <span className="relative">Pedir cita</span>
              </a>
            </Magnetic>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border transition-colors duration-300 hover:border-accent/60 hover:bg-accent-soft lg:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[59] bg-background/90 backdrop-blur-2xl lg:hidden"
          >
            <ul className="flex h-full flex-col items-start justify-center gap-2 px-8">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.06 * i, duration: 0.7, ease: silk }}
                  className="w-full border-b border-border/60"
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-5 font-display text-3xl tracking-tight"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
