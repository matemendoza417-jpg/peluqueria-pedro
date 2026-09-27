import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { negocio } from "@/lib/business";

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <main className="relative z-10 mx-auto max-w-3xl px-6 pb-40 pt-32 md:pt-40">
        <p className="mb-3 eyebrow">{negocio.nombre} · {negocio.ciudad}</p>
        <h1 className="font-display text-[clamp(2.5rem,6vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.04em]">
          {title}
        </h1>
        <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">
          Actualizado: {updated}
        </p>

        <div className="mt-14 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
          {children}
        </div>

        <div className="mt-20 flex flex-wrap items-center gap-6 border-t border-border pt-8 text-sm">
          <Link to="/" className="text-accent underline-offset-4 hover:underline">
            ← Volver a la web
          </Link>
          <a href={negocio.telHref} className="text-foreground underline-offset-4 hover:underline">
            {negocio.telefono}
          </a>
          <a
            href={negocio.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline-offset-4 hover:underline"
          >
            {negocio.direccionCompleta}
          </a>
        </div>
      </main>
    </div>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="pt-8 font-display text-2xl tracking-tight text-foreground">{children}</h2>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p>{children}</p>;
}

export function UL({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-2 pl-5">{children}</ul>;
}

export function Strong({ children }: { children: ReactNode }) {
  return <strong className="font-medium text-foreground">{children}</strong>;
}
