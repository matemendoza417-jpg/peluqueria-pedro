import { createFileRoute } from "@tanstack/react-router";
import { H2, LegalLayout, P, Strong, UL } from "@/components/site/legal-layout";
import { negocio } from "@/lib/business";

export const Route = createFileRoute("/aviso-legal")({
  head: () => ({
    meta: [
      { title: `Aviso legal — ${negocio.nombre} Alcoi` },
      { name: "robots", content: "noindex, follow" },
      {
        name: "description",
        content: `Aviso legal de ${negocio.nombre}, peluquería en ${negocio.direccionCompleta}.`,
      },
    ],
  }),
  component: AvisoLegal,
});

function AvisoLegal() {
  return (
    <LegalLayout title="Aviso legal" updated="septiembre de 2026">
      <H2>1. Titular del sitio</H2>
      <P>
        <Strong>Establecimiento:</Strong> {negocio.nombre}
        <br />
        <Strong>Titular:</Strong> {negocio.titular}
        <br />
        <Strong>Domicilio del establecimiento:</Strong> {negocio.direccionCompleta}{" "}
        (España)
        <br />
        <Strong>Condición fiscal:</Strong> el titular actúa como autónomo. El NIF
        no se publica en esta web por decisión del propio negocio; se facilitará a
        quien lo solicite por teléfono.
        <br />
        <Strong>Teléfono:</Strong>{" "}
        <a href={negocio.telHref} className="text-foreground underline underline-offset-4">
          {negocio.telefono}
        </a>
      </P>

      <H2>2. Naturaleza de esta web</H2>
      <P>
        Esta web es una <Strong>propuesta de diseño</Strong> preparada para{" "}
        {negocio.nombre}. Las fotografías de ambiente y los trabajos mostrados en
        la galería son <Strong>material de muestra</Strong> y no deben
        interpretarse como trabajos reales del salón.
      </P>
      <P>
        El negocio aparece en directories y plataformas con reseñas públicas. Las
        citas textuales que se muestran proceden de reseñas públicas y se
        atribuyen a Google. El número de reseñas varía según la plataforma, por
        lo que no se publica.
      </P>

      <H2>3. Precios y servicios (art. 7 LSSI)</H2>
      <P>
        Los servicios y cualquier referencia de precio de esta web tienen carácter{" "}
        <Strong>meramente informativo</Strong>. El precio depende del trabajo
        concreto y se confirma siempre antes de empezar, por teléfono.
      </P>

      <H2>4. Reservas</H2>
      <P>
        El salón <Strong>no gestiona citas online</Strong>. El único canal de
        reserva es el teléfono. Esta web no almacena solicitudes de cita.
      </P>

      <H2>5. Enlaces externos</H2>
      <P>
        La web enlaza a Google Maps. El negocio no dispone de web propia, redes
        sociales, WhatsApp ni correo electrónico publicados, por lo que no se
        incluyen enlaces a esos servicios.
      </P>

      <H2>6. Legislación aplicable y jurisdicción</H2>
      <P>
        Estas condiciones se rigen por la legislación española. Para cualquier
        controversia las partes se someten a los juzgados y tribunales de{" "}
        <Strong>{negocio.ciudad} ({negocio.provincia})</Strong>.
      </P>
    </LegalLayout>
  );
}
