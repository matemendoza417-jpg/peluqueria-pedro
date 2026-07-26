import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Atmosphere, Cursor, ScrollProgress } from "@/components/site/atmosphere";
import { Hero } from "@/components/site/hero";
import { Loader } from "@/components/site/loader";
import { Navbar } from "@/components/site/navbar";
import {
  Contacto,
  Filosofia,
  Footer,
  Local,
  MobileActionBar,
  Servicios,
} from "@/components/site/sections";

const title = "Peluquería Pedro | Barbería premium en Alcoy";
const description =
  "Barbería y peluquería masculina en Alcoy: cortes de precisión, arreglo de barba con navaja y ritual completo. Pide cita por teléfono o WhatsApp.";

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
          name: "Peluquería Pedro",
          description,
          image: "/favicon.ico",
          telephone: "+34965000000",
          priceRange: "€€",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Carrer Sant Nicolau 12",
            addressLocality: "Alcoy",
            addressRegion: "Alicante",
            postalCode: "03801",
            addressCountry: "ES",
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              opens: "09:30",
              closes: "20:30",
            },
          ],
        }),
      },
    ],
  }),
});

function Index() {
  const [ready, setReady] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <Loader onDone={() => setReady(true)} />
      <Cursor />
      <ScrollProgress />
      <Atmosphere />
      <Navbar />
      <main
        className={`relative z-10 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
      >
        <Hero />
        <Servicios />
        <Filosofia />
        <Local />
        <Contacto />
      </main>
      <Footer />
      <MobileActionBar />
    </div>
  );
}
