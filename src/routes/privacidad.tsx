import { createFileRoute } from "@tanstack/react-router";
import { H2, LegalLayout, P, Strong, UL } from "@/components/site/legal-layout";
import { negocio } from "@/lib/business";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title: `Política de privacidad — ${negocio.nombre} Alcoi` },
      { name: "robots", content: "noindex, follow" },
      {
        name: "description",
        content: `Política de privacidad y protección de datos de ${negocio.nombre} conforme al RGPD.`,
      },
    ],
  }),
  component: Privacidad,
});

function Privacidad() {
  return (
    <LegalLayout title="Política de privacidad" updated="septiembre de 2026">
      <H2>1. Responsable del tratamiento</H2>
      <P>
        <Strong>Identidad:</Strong> {negocio.nombre} — titular {negocio.titular}
        <br />
        <Strong>Domicilio:</Strong> {negocio.direccionCompleta}
        <br />
        <Strong>Teléfono:</Strong>{" "}
        <a href={negocio.telHref} className="text-foreground underline underline-offset-4">
          {negocio.telefono}
        </a>
      </P>
      <P>
        No se publica dirección de correo electrónico. Para ejercer cualquier
        derecho puedes llamar al negocio o presentarte en el establecimiento.
      </P>

      <H2>2. Qué datos tratamos</H2>
      <UL>
        <li>
          <Strong>Datos identificativos y de contacto</Strong> que nos facilitas
          al llamar, al escribirnos o al leer nuestras publicaciones.
        </li>
        <li>
          <Strong>Preferencias de servicio</Strong> cuando el trabajo lo requiere
          para atenderte correctamente.
        </li>
      </UL>

      <H2>3. Finalidad y base legal</H2>
      <P>
        Tratamos tus datos para <Strong>gestionar tus citas y atender tus
        consultas</Strong>. La base legal es tu consentimiento y, cuando exista
        relación de servicios, la ejecución de esa relación (art. 6.1.a y 6.1.b
        RGPD). No elaboramos perfiles ni publicidad segmentada.
      </P>

      <H2>4. Conservación</H2>
      <P>
        Conservamos los datos mientras dure la relación comercial o hasta que
        retires tu consentimiento; después, durante los plazos legalmente
        exigibles.
      </P>

      <H2>5. Destinatarios</H2>
      <P>
        No cedemos tus datos a terceros con fines comerciales. Solo los
        comunicamos cuando exista obligación legal.
      </P>

      <H2>6. Tus derechos</H2>
      <UL>
        <li>Acceso, rectificación, supresión y limitación del tratamiento.</li>
        <li>Oposición y portabilidad.</li>
        <li>Retirar el consentimiento en cualquier momento.</li>
        <li>
          Reclamar ante la Agencia Española de Protección de Datos
          (www.aepd.es).
        </li>
      </UL>

      <H2>7. Seguridad</H2>
      <P>
        Esta web no tiene formularios de reserva, no almacena datos de clientes
        en bases de datos propias y no utiliza cookies de perfilado. Los enlaces
        a Google Maps quedan bajo la política de privacidad de Google.
      </P>
    </LegalLayout>
  );
}
