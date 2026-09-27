import { createFileRoute } from "@tanstack/react-router";
import { H2, LegalLayout, P, Strong, UL } from "@/components/site/legal-layout";
import { negocio } from "@/lib/business";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: `Política de cookies — ${negocio.nombre} Alcoi` },
      { name: "robots", content: "noindex, follow" },
      {
        name: "description",
        content: `Política de cookies de ${negocio.nombre}. Esta web no utiliza cookies de perfilado.`,
      },
    ],
  }),
  component: Cookies,
});

function Cookies() {
  return (
    <LegalLayout title="Política de cookies" updated="septiembre de 2026">
      <H2>1. Qué son las cookies</H2>
      <P>
        Las cookies son pequeños archivos que tu navegador guarda en el
        dispositivo con el que visitas una web. Algunas son necesarias para que
        la web funcione; otras permiten a terceros medir o personalizar
        contenidos.
      </P>

      <H2>2. Qué cookies usa esta web</H2>
      <P>
        Esta web <Strong>no instala cookies de perfilado ni de publicidad</Strong>.
        Solo utiliza almacenamiento local estrictamente técnico del navegador,
        para que la página se comporte igual en visitas sucesivas y no te
        permita identificar fuera de tu propio navegador.
      </P>

      <H2>3. Cookies de terceros</H2>
      <P>
        Las tipografías se cargan desde Google Fonts y quedan sujetas a la{" "}
        <a
          href="https://policies.google.com/technologies/cookies"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline underline-offset-4"
        >
          política de cookies de Google
        </a>
        . Los enlaces a Google Maps son externos y aplican sus propias
        políticas; no se incrusta ningún mapa ni se cargan sus cookies de
        seguimiento en esta versión del sitio.
      </P>

      <H2>4. Cómo gestionarlas</H2>
      <P>
        Puedes bloquear o eliminar las cookies desde los ajustes de tu
        navegador. Ten en cuenta que desactivar el almacenamiento local puede
        alterar alguna función de la web.
      </P>

      <H2>5. Cambios en esta política</H2>
      <P>
        Si en el futuro esta web incorpora cookies analíticas o de marketing,
        esta política se actualizará y se solicitará el consentimiento previo
        exigido por la LSSI.
      </P>
    </LegalLayout>
  );
}
