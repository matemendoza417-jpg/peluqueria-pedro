import { createFileRoute } from "@tanstack/react-router";
import { Atmosphere, Cursor, ScrollProgress } from "@/components/site/atmosphere";
import { Hero } from "@/components/site/hero";
import { Loader } from "@/components/site/loader";
import { Navbar } from "@/components/site/navbar";
import { ContactBar } from "@/components/site/contact-bar";
import {
  Contacto,
  Filosofia,
  Footer,
  Local,
  Resenas,
  Servicios,
} from "@/components/site/sections";
import { negocio } from "@/lib/business";

const title = `${negocio.nombre} — Peluquería en ${negocio.barrio}, ${negocio.ciudad}`;
const description = `Peluquería de barrio en ${negocio.direccionCompleta}. Corte de pelo y arreglo de barba. Reserva por teléfono: ${negocio.telefono}.`;

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HairSalon",
          name: negocio.nombre,
          description,
          url: "https://peluqueria-pedro-web-v2.vercel.app/",
          image: "https://peluqueria-pedro-web-v2.vercel.app/favicon.ico",
          telephone: negocio.telHref.replace("tel:", ""),
          founder: { "@type": "Person", name: negocio.titular },
          address: {
            "@type": "PostalAddress",
            streetAddress: negocio.direccion,
            addressLocality: negocio.ciudad,
            addressRegion: negocio.provincia,
            postalCode: negocio.cp,
            addressCountry: "ES",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 38.7033176,
            longitude: -0.4776347,
          },
          areaServed: { "@type": "City", name: negocio.ciudad },
          // openingHoursSpecification OMITIDO: no hay horario verificado
          // (única fuente: ficha de Yelp sin reclamar). Ver _PATRONES.md §0.
          // sameAs OMITIDO: el negocio no tiene redes sociales.
          // aggregateRating OMITIDO: 4,8 coincide, pero el nº de reseñas
          // discrepa (8 · 21 · 22) y schema.org exige reviewCount coherente.
        }),
      },
    ],
  }),
});

function Index() {
  // El Loader ya es una capa fija opaca que tapa la página, así que el contenido
  // NO se pone en opacity:0: si el JS falla, el texto sigue siendo visible
  // (requisito de accesibilidad de animaciones).
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <Loader />
      <Cursor />
      <ScrollProgress />
      <Atmosphere />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Servicios />
        <Filosofia />
        <Resenas />
        <Local />
        <Contacto />
      </main>
      <Footer />
      <ContactBar />
    </div>
  );
}
