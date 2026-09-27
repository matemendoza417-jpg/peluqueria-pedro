import { Phone, MapPin, Clock } from "lucide-react";
import { negocio } from "@/lib/business";

/**
 * Barra de contacto fija en móvil/tablet.
 *
 * Este negocio NO tiene WhatsApp (buscado, sin resultado), así que la acción
 * intermedia no puede ser un chat: se sustituye por el acceso directo al
 * horario del local, que es lo segundo que se busca después de llamar.
 */
export function ContactBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[58] lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="glass-panel grid grid-cols-3 divide-x divide-border bg-background/95">
        <a
          href={negocio.telHref}
          className="flex flex-col items-center gap-1.5 py-3 text-[11px] font-medium"
        >
          <Phone className="h-5 w-5" strokeWidth={1.5} aria-hidden />
          Llamar
        </a>
        <a
          href="#horario"
          className="flex flex-col items-center gap-1.5 py-3 text-[11px] font-medium"
        >
          <Clock className="h-5 w-5" strokeWidth={1.5} aria-hidden />
          Horario
        </a>
        <a
          href={negocio.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1.5 py-3 text-[11px] font-medium"
        >
          <MapPin className="h-5 w-5" strokeWidth={1.5} aria-hidden />
          Cómo llegar
        </a>
      </div>
    </div>
  );
}
