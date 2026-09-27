/**
 * Datos verificados de Peluquería Pedro (Alcoi, l'Eixample).
 *
 * REGLA: solo entran datos con 2+ fuentes públicas coincidentes, o datos de
 * fuente única marcados como tales. Lo que no se pudo verificar NO está aquí.
 *
 * Verificado: teléfono (9 fuentes, 0 contradicciones), dirección y coordenadas,
 * barrio l'Eixample, activo desde ~octubre de 2018, valoración 4,8 (las fuentes
 * discrepan en el número de reseñas, por eso no se publica el contador).
 *
 * NO existe (buscado, sin resultado): WhatsApp, Instagram, Facebook, web,
 * email, horario. Por eso el único canal de reserva es el teléfono y no se
 * publica ningún horario.
 *
 * OJO: este negocio NO es "La Barbería Alcoy" (Carrer dels Alçamora 35,
 * 965 33 40 90). No mezclar datos de los dos.
 */

export const negocio = {
  nombre: "Peluquería Pedro",
  titular: "Pedro Vicente Llorca Pascual",
  claim: "Peluquería de barrio en l'Eixample, Alcoi",

  telefono: "965 33 18 49",
  telHref: "tel:+34965331849",

  direccion: "Carrer Na Saurina d'Entença, 70",
  cp: "03803",
  ciudad: "Alcoi",
  provincia: "Alicante",
  barrio: "l'Eixample",
  direccionCompleta: "Carrer Na Saurina d'Entença, 70, 03803 Alcoi, Alicante",
  coords: "38.7033176,-0.4776347",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=38.7033176,-0.4776347",
  mapsEmbed:
    "https://www.google.com/maps?q=38.7033176,-0.4776347&hl=es&z=17&output=embed",

  activoDesde: 2018,

  /**
   * SIN horario publicado: la única fuente es un ficha de Yelp marcada como
   * "Sin reclamar" y Volumus dice literalmente "Horario no disponible".
   * Se omite entero (ver _PATRONES.md §0).
   */
  horario: null,

  /**
   * Sin redes sociales propias. Cero presencia digital: ese es el gancho de
   * venta, así que la web no debe fingir enlaces que no existen.
   */
  instagram: null,
  facebook: null,
  whatsapp: null,
  email: null,

  /**
   * Valoración 4,8: única cifra en la que coinciden todas las fuentes.
   * El número de reseñas discrepa (8 · 21 · 22), así que se publica la nota
   * SIN contador.
   */
  nota: { valor: "4,8", fuente: "Google" } as
    | { valor: string; fuente: string }
    | null,

  /**
   * Reseñas públicas textuales. Se citan literalmente y se atribuye la fuente.
   */
  resenas: [
    "El number one de los peluqueros, simpatía y conversación a raudales",
    "Pedro un encanto de persona",
    "Simplemente fantástico tanto el trato como el trabajo",
  ],
} as const;

export type Negocio = typeof negocio;
