export type Locale = "es" | "en";
export type LocalizedText = Record<Locale, string>;

export type ContactConfig = {
  whatsappDisplay: string;
  whatsappDigits: string;
  whatsappUrl: string;
  instagramHandle: string;
  instagramUrl: string;
  location: LocalizedText;
};

export type SeoMeta = {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage: string;
  ogImageAlt: string;
};

export type JsonLdObject = Record<string, unknown>;

export type NavItem = { id: string; href: string; label: LocalizedText };
export type ServiceItem = { id: string; icon: string; title: LocalizedText; description: LocalizedText };
export type FaqItem = { id: string; question: LocalizedText; answer: LocalizedText };
export type ClientTypeItem = { id: string; icon: string; title: LocalizedText; description: LocalizedText };
export type PortfolioSize = "big" | "tall" | "std";
export type PortfolioItem = {
  id: string;
  fileName: string;
  width: number;
  height: number;
  size: PortfolioSize;
  alt: LocalizedText;
  category: LocalizedText;
  featured?: boolean;
};

export type SectionCopy = { eyebrow: string; title: string; body: string };
export type HeroStat = { key: string; value: string; label: string };
export type HeroMedia = { fileName: string; category: string; liveLabel: string };

export type LandingSections = {
  shell: {
    skipLabel: string;
    navLabel: string;
    languageLabel: string;
    menuOpenLabel: string;
    menuCloseLabel: string;
  };
  hero: {
    eyebrow: string;
    titleLead: string;
    titleHighlight: string;
    subtitle: string;
    primaryCta: string;
    primaryCtaShort: string;
    secondaryCta: string;
    stats: HeroStat[];
    media: HeroMedia[];
    ticker: string[];
  };
  about: SectionCopy & {
    years: string;
    yearsLabel: string;
    details: string[];
    imageFileName: string;
    imageWidth: number;
    imageHeight: number;
    imageAlt: string;
    imageTag: string;
  };
  services: SectionCopy;
  portfolio: SectionCopy & { cta: string };
  clients: SectionCopy;
  faq: SectionCopy;
  contact: SectionCopy & {
    whatsappLabel: string;
    instagramLabel: string;
    locationLabel: string;
  };
  footer: { rights: string; navLabel: string; contactLabel: string; languageLabel: string; tagline: string };
};

export type LocalizedPage = {
  locale: Locale;
  htmlLang: string;
  route: string;
  alternateRoute: string;
  seo: SeoMeta;
  sections: LandingSections;
  nav: NavItem[];
  services: ServiceItem[];
  faq: FaqItem[];
  portfolio: PortfolioItem[];
  clients: ClientTypeItem[];
};

type PageBase = Omit<LocalizedPage, "nav" | "services" | "faq" | "portfolio" | "clients">;

export const site = {
  name: "Rental Led",
  baseUrl: "https://rentalled.com.ar",
  themeColor: "#05080e",
  contact: {
    whatsappDisplay: "+54 9 11 4973 4510",
    whatsappDigits: "5491149734510",
    whatsappUrl: "https://wa.me/5491149734510",
    instagramHandle: "@rentalled.ar",
    instagramUrl: "https://www.instagram.com/rentalled.ar",
    location: { es: "CABA y Buenos Aires, Argentina", en: "CABA and Buenos Aires, Argentina" }
  },
  schema: {
    areaServed: [
      { "@type": "City", name: "CABA" },
      { "@type": "AdministrativeArea", name: "Buenos Aires" },
      { "@type": "Country", name: "Argentina" }
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Buenos Aires",
      addressRegion: "Buenos Aires",
      addressCountry: "AR"
    },
    languages: ["es", "en"]
  },
  nav: [
    { id: "hero", href: "#hero", label: { es: "Inicio", en: "Home" } },
    { id: "about", href: "#about", label: { es: "Experiencia", en: "About" } },
    { id: "services", href: "#services", label: { es: "Servicios", en: "Services" } },
    { id: "portfolio", href: "#portfolio", label: { es: "Portfolio", en: "Portfolio" } },
    { id: "clients", href: "#clients", label: { es: "Clientes", en: "Clients" } },
    { id: "faq", href: "#faq", label: { es: "FAQ", en: "FAQ" } },
    { id: "contact", href: "#contact", label: { es: "Contacto", en: "Contact" } }
  ],
  services: [
    { id: "corporate", icon: "building-2", title: { es: "Pantallas LED para eventos corporativos", en: "LED screens for corporate events" }, description: { es: "Soluciones visuales para lanzamientos, congresos, conferencias y activaciones de marca.", en: "Visual solutions for launches, conferences, conventions and brand activations." } },
    { id: "social", icon: "sparkles", title: { es: "Pantallas LED para eventos sociales", en: "LED screens for social events" }, description: { es: "Presencia visual de alto impacto para celebraciones, shows y experiencias privadas.", en: "High-impact visual presence for celebrations, shows and private experiences." } },
    { id: "operation", icon: "wrench", title: { es: "Armado, operación y soporte técnico", en: "Setup, operation and technical support" }, description: { es: "Equipo técnico propio para montaje, operación en vivo y asistencia durante el evento.", en: "In-house technical crew for setup, live operation and event support." } },
    { id: "brands", icon: "megaphone", title: { es: "Marcas, agencias y productoras", en: "Brands, agencies and producers" }, description: { es: "Acompañamiento para campañas, presentaciones y contenidos que necesitan ejecución precisa.", en: "Support for campaigns, presentations and content that require precise execution." } },
    { id: "venues", icon: "warehouse", title: { es: "Salones, venues y producción integral", en: "Venues and full production" }, description: { es: "Integración con equipos de venue, sonido, iluminación y producción para una operación ordenada.", en: "Coordination with venue, audio, lighting and production teams for a reliable operation." } }
  ],
  clients: [
    { id: "companies", icon: "building-2", title: { es: "Empresas", en: "Companies" }, description: { es: "Pantallas LED para presentaciones, celebraciones internas y encuentros comerciales.", en: "LED screens for presentations, internal celebrations and commercial gatherings." } },
    { id: "agencies", icon: "megaphone", title: { es: "Agencias", en: "Agencies" }, description: { es: "Respuesta técnica para activaciones, campañas y experiencias de marca.", en: "Technical response for activations, campaigns and brand experiences." } },
    { id: "producers", icon: "clapperboard", title: { es: "Productoras", en: "Production companies" }, description: { es: "Coordinación clara con sonido, iluminación, escenario y dirección técnica.", en: "Clear coordination with audio, lighting, staging and technical direction." } },
    { id: "venues", icon: "map-pin", title: { es: "Salones y venues", en: "Venues" }, description: { es: "Integración con accesos, tiempos de montaje y condiciones del espacio.", en: "Integration with access, setup timing and venue conditions." } },
    { id: "social-organizers", icon: "party-popper", title: { es: "Organizadores sociales", en: "Social event organizers" }, description: { es: "Acompañamiento para celebraciones que necesitan impacto visual y operación confiable.", en: "Support for celebrations that need visual impact and reliable operation." } }
  ],
  faq: [
    { id: "area", question: { es: "¿En qué zonas trabajan?", en: "Which areas do you cover?" }, answer: { es: "Trabajamos en CABA y Buenos Aires, Argentina, con coordinación previa para cada evento.", en: "We work across CABA and Buenos Aires, Argentina, with planning adapted to each event." } },
    { id: "events", question: { es: "¿Qué tipos de eventos cubren?", en: "What event types do you cover?" }, answer: { es: "Eventos corporativos, sociales, activaciones, shows, congresos y producciones especiales.", en: "Corporate events, social events, activations, shows, conferences and special productions." } },
    { id: "screens", question: { es: "¿Qué pantallas LED ofrecen?", en: "What LED screens do you offer?" }, answer: { es: "Contamos con pantallas indoor pitch 2.6 mm y outdoor pitch 3.9 mm para distintos contextos.", en: "We provide indoor 2.6 mm pitch and outdoor 3.9 mm pitch LED screens for different contexts." } },
    { id: "operation", question: { es: "¿Incluyen armado y operación?", en: "Is setup and operation included?" }, answer: { es: "Sí. El servicio contempla montaje, operación técnica y soporte durante el evento.", en: "Yes. The service includes setup, technical operation and support during the event." } },
    { id: "quote", question: { es: "¿Cómo se solicita una cotización?", en: "How do I request a quote?" }, answer: { es: "Podés escribir por WhatsApp con fecha, lugar, horario y tipo de evento para recibir una propuesta.", en: "Contact us on WhatsApp with the date, venue, schedule and event type to receive a proposal." } },
    { id: "timing", question: { es: "¿Con cuánto tiempo conviene consultar?", en: "How far in advance should I contact you?" }, answer: { es: "Recomendamos consultar con anticipación para validar disponibilidad, medidas, accesos y requerimientos técnicos.", en: "We recommend contacting us early to confirm availability, dimensions, access and technical requirements." } }
  ],
  portfolio: [
    { id: "screen-01", fileName: "1000085426.webp", width: 900, height: 1600, size: "big", alt: { es: "Pantalla LED en evento con operación técnica", en: "LED screen at an event with technical operation" }, category: { es: "Evento técnico", en: "Technical event" }, featured: true },
    { id: "screen-02", fileName: "1000084648.webp", width: 960, height: 1280, size: "std", alt: { es: "Montaje de pantalla LED para presentación", en: "LED screen setup for a presentation" }, category: { es: "Corporativo", en: "Corporate" } },
    { id: "screen-03", fileName: "1000084628-1.webp", width: 960, height: 1280, size: "tall", alt: { es: "Pantalla LED para evento social", en: "LED screen for a social event" }, category: { es: "Social", en: "Social" } },
    { id: "screen-04", fileName: "1000084639.webp", width: 1280, height: 960, size: "std", alt: { es: "Escenario con pantalla LED indoor", en: "Stage with indoor LED screen" }, category: { es: "Indoor", en: "Indoor" } },
    { id: "screen-05", fileName: "1000118364.webp", width: 1200, height: 1600, size: "tall", alt: { es: "Pantalla LED para show y contenido visual", en: "LED screen for a show" }, category: { es: "Show", en: "Show" } },
    { id: "screen-06", fileName: "1000118370.webp", width: 960, height: 1280, size: "std", alt: { es: "Evento con pantalla LED y ambientación", en: "Event with LED screen" }, category: { es: "Producción", en: "Production" } },
    { id: "screen-07", fileName: "1000140534.webp", width: 1200, height: 1600, size: "big", alt: { es: "Pantalla LED de gran formato para evento", en: "Large-format LED screen" }, category: { es: "Gran formato", en: "Large format" } },
    { id: "screen-08", fileName: "1000118367.webp", width: 960, height: 1280, size: "std", alt: { es: "Pantalla LED en espacio de eventos", en: "LED screen in an event venue" }, category: { es: "Venue", en: "Venue" } },
    { id: "screen-09", fileName: "1000084631.webp", width: 1280, height: 960, size: "tall", alt: { es: "Contenido visual en pantalla LED", en: "Visual content on an LED screen" }, category: { es: "Contenido", en: "Content" } },
    { id: "screen-10", fileName: "1000084684.webp", width: 960, height: 1280, size: "std", alt: { es: "Montaje técnico para pantalla LED", en: "Technical setup for an LED screen" }, category: { es: "Montaje", en: "Setup" } },
    { id: "screen-11", fileName: "1000085410.webp", width: 1600, height: 900, size: "std", alt: { es: "Pantalla LED para presentación en vivo", en: "LED screen for a live presentation" }, category: { es: "En vivo", en: "Live" } },
    { id: "screen-12", fileName: "1000084645.webp", width: 960, height: 1280, size: "tall", alt: { es: "Pantalla LED integrada a producción de evento", en: "LED screen integrated into event production" }, category: { es: "Integración", en: "Integration" } },
    { id: "screen-13", fileName: "1000084679.webp", width: 960, height: 1280, size: "std", alt: { es: "Pantalla LED con visuales para audiencia", en: "LED screen with visuals for an audience" }, category: { es: "Audiencia", en: "Audience" } },
    { id: "screen-14", fileName: "1000085416.webp", width: 900, height: 1600, size: "std", alt: { es: "Pantalla LED para experiencia de marca", en: "LED screen for a brand experience" }, category: { es: "Marca", en: "Brand" } }
  ],
  pages: {
    es: {
      locale: "es",
      htmlLang: "es-AR",
      route: "/",
      alternateRoute: "/en/",
      seo: { title: "Rental Led | Pantallas LED para eventos en Buenos Aires", description: "Alquiler de pantallas LED para eventos corporativos y sociales en CABA y Buenos Aires, con montaje, operación en vivo y soporte técnico.", canonicalPath: "/", ogImage: "/og-rental-led.png", ogImageAlt: "Operación de pantallas LED de Rental Led para eventos" },
      sections: {
        shell: { skipLabel: "Saltar al contenido principal", navLabel: "Navegación principal", languageLabel: "Selector de idioma", menuOpenLabel: "Menú", menuCloseLabel: "Cerrar" },
        hero: {
          eyebrow: "Rental Led · Pantallas LED",
          titleLead: "Pantallas LED para eventos que tienen que verse",
          titleHighlight: "impecables",
          subtitle: "Resolvemos la técnica visual de tu evento con pantallas LED, operación profesional y una puesta cuidada de principio a fin. En CABA y Buenos Aires, para eventos corporativos, sociales y producciones que no pueden fallar.",
          primaryCta: "Cotizar por WhatsApp",
          primaryCtaShort: "Cotizar",
          secondaryCta: "Ver portfolio",
          stats: [
            { key: "Trayectoria", value: "12+", label: "años en eventos" },
            { key: "Indoor", value: "2.6 mm", label: "pixel pitch" },
            { key: "Outdoor", value: "3.9 mm", label: "pixel pitch" }
          ],
          media: [
            { fileName: "1000085426.webp", category: "Evento corporativo", liveLabel: "" }
          ],
          ticker: ["Pantallas LED", "Eventos corporativos", "Eventos sociales", "CABA · Buenos Aires", "Operación técnica propia", "Indoor 2.6mm", "Outdoor 3.9mm", "Producciones en vivo"]
        },
        about: {
          eyebrow: "Experiencia",
          years: "12+",
          yearsLabel: "años de experiencia en eventos",
          title: "Un socio técnico, no solo un proveedor de equipos",
          body: "Operamos pantallas LED indoor pitch 2.6 mm y outdoor pitch 3.9 mm con equipo técnico propio, planificación clara y atención personalizada para cada proyecto.",
          details: ["Operación técnica propia", "Pantallas indoor 2.6 mm y outdoor 3.9 mm", "Respuesta rápida y seguimiento responsable"],
          imageFileName: "1000140534-about.webp",
          imageWidth: 1200,
          imageHeight: 900,
          imageAlt: "Pantalla LED de gran formato en evento",
          imageTag: "Operación en vivo"
        },
        services: { eyebrow: "Servicios", title: "Soluciones LED para cada formato de evento", body: "Trabajamos con empresas, agencias, productoras, venues y organizadores sociales que necesitan impacto visual y soporte confiable." },
        portfolio: { eyebrow: "Portfolio real", title: "Pantallas en eventos, shows y producciones", body: "Una selección de montajes reales con pantallas LED, operación técnica y contenido visual aplicado a distintos formatos de evento.", cta: "Pedir más ejemplos" },
        clients: { eyebrow: "Clientes", title: "Acompañamos a quienes producen experiencias", body: "Sin logos inventados ni testimonios fabricados: el foco está en los equipos que suelen necesitar una operación LED confiable." },
        faq: { eyebrow: "Preguntas frecuentes", title: "Información clave antes de cotizar", body: "Respuestas directas sobre cobertura, tipos de eventos, operación técnica, tiempos y soporte." },
        contact: { eyebrow: "Contacto", title: "Hablemos sobre tu evento", body: "Compartinos fecha, lugar, horarios y necesidades técnicas y preparamos una propuesta clara para tu evento.", whatsappLabel: "Escribir por WhatsApp", instagramLabel: "Ver Instagram", locationLabel: "Zona de cobertura" },
        footer: { rights: "Pantallas LED para eventos en CABA y Buenos Aires, con operación técnica propia de principio a fin.", navLabel: "Navegación", contactLabel: "Contacto", languageLabel: "Idioma", tagline: "Pantallas LED · Producción técnica para eventos" }
      }
    },
    en: {
      locale: "en",
      htmlLang: "en",
      route: "/en/",
      alternateRoute: "/",
      seo: { title: "Rental Led | LED Screen Rental in Buenos Aires", description: "LED screen rental for corporate and social events in Buenos Aires, with setup, live operation and technical support.", canonicalPath: "/en/", ogImage: "/og-rental-led.png", ogImageAlt: "Rental Led LED screen operation for events" },
      sections: {
        shell: { skipLabel: "Skip to main content", navLabel: "Primary navigation", languageLabel: "Language selector", menuOpenLabel: "Menu", menuCloseLabel: "Close" },
        hero: {
          eyebrow: "Rental Led · LED Screens",
          titleLead: "LED screens for events that need to look",
          titleHighlight: "flawless",
          subtitle: "We handle the visual side of your event with LED screens, professional operation and a polished setup from start to finish. Based in Buenos Aires, for corporate events, social events and productions that cannot fail.",
          primaryCta: "Request a WhatsApp quote",
          primaryCtaShort: "Get a quote",
          secondaryCta: "View portfolio",
          stats: [
            { key: "Track record", value: "12+", label: "years in events" },
            { key: "Indoor", value: "2.6 mm", label: "pixel pitch" },
            { key: "Outdoor", value: "3.9 mm", label: "pixel pitch" }
          ],
          media: [
            { fileName: "1000085426.webp", category: "Corporate event", liveLabel: "" }
          ],
          ticker: ["LED screens", "Corporate events", "Social events", "Buenos Aires", "In-house technical crew", "Indoor 2.6mm", "Outdoor 3.9mm", "Live productions"]
        },
        about: {
          eyebrow: "Experience",
          years: "12+",
          yearsLabel: "years of event experience",
          title: "A technical partner, not just an equipment supplier",
          body: "We operate indoor 2.6 mm pitch and outdoor 3.9 mm pitch LED screens with an in-house technical crew, clear planning and personalized attention for every project.",
          details: ["In-house technical operation", "Indoor 2.6 mm and outdoor 3.9 mm screens", "Fast response and responsible follow-through"],
          imageFileName: "1000140534-about.webp",
          imageWidth: 1200,
          imageHeight: 900,
          imageAlt: "Large-format LED screen at an event",
          imageTag: "Live operation"
        },
        services: { eyebrow: "Services", title: "LED solutions for every event format", body: "We support companies, agencies, production teams, venues and social organizers that need visual impact and reliable technical support." },
        portfolio: { eyebrow: "Real portfolio", title: "Screens across events, shows and productions", body: "A selection of real setups with LED screens, technical operation and visual content adapted to different event formats.", cta: "Ask for more examples" },
        clients: { eyebrow: "Clients", title: "Built for teams producing experiences", body: "No invented logos or fabricated testimonials: the focus is on the teams that usually need reliable LED operation." },
        faq: { eyebrow: "FAQ", title: "Key details before requesting a quote", body: "Direct answers about coverage, event types, technical operation, timing and support." },
        contact: { eyebrow: "Contact", title: "Tell us about your event", body: "Share the date, venue, schedule and technical needs and we will prepare a clear proposal for your event.", whatsappLabel: "Message on WhatsApp", instagramLabel: "View Instagram", locationLabel: "Service area" },
        footer: { rights: "LED screens for events in CABA and Buenos Aires, with in-house technical operation from start to finish.", navLabel: "Navigation", contactLabel: "Contact", languageLabel: "Language", tagline: "LED screens · Technical production for events" }
      }
    }
  }
} satisfies {
  name: string;
  baseUrl: string;
  themeColor: string;
  contact: ContactConfig;
  schema: {
    areaServed: Array<Record<string, string>>;
    address: Record<string, string>;
    languages: string[];
  };
  nav: NavItem[];
  services: ServiceItem[];
  clients: ClientTypeItem[];
  faq: FaqItem[];
  portfolio: PortfolioItem[];
  pages: Record<Locale, PageBase>;
};

export const locales: Locale[] = ["es", "en"];
export const getPage = (locale: Locale): LocalizedPage => ({ ...site.pages[locale], nav: site.nav, services: site.services, clients: site.clients, faq: site.faq, portfolio: site.portfolio });
export const translate = (text: LocalizedText, locale: Locale) => text[locale];

export const toAbsoluteUrl = (path: string): string => new URL(path, site.baseUrl).toString();

export const getCanonicalUrl = (page: LocalizedPage): string => toAbsoluteUrl(page.seo.canonicalPath);

export const getAlternateLinks = (): Array<{ hreflang: "es" | "en" | "x-default"; href: string }> => [
  { hreflang: "es", href: toAbsoluteUrl(site.pages.es.route) },
  { hreflang: "en", href: toAbsoluteUrl(site.pages.en.route) },
  { hreflang: "x-default", href: toAbsoluteUrl(site.pages.es.route) }
];

export const getStructuredData = (page: LocalizedPage): JsonLdObject[] => {
  const canonicalUrl = getCanonicalUrl(page);
  const siteUrl = toAbsoluteUrl("/");
  const imageUrl = toAbsoluteUrl(page.seo.ogImage);
  const organizationId = `${siteUrl}#organization`;
  const localBusinessId = `${siteUrl}#local-business`;
  const serviceId = `${canonicalUrl}#led-screen-rental-service`;
  const faqId = `${canonicalUrl}#faq`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": organizationId,
      name: site.name,
      url: siteUrl,
      logo: toAbsoluteUrl("/logo.webp"),
      image: imageUrl,
      knowsLanguage: ["Spanish", "English"],
      sameAs: [site.contact.instagramUrl],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: site.contact.whatsappDisplay,
          url: site.contact.whatsappUrl,
          areaServed: "AR",
          availableLanguage: site.schema.languages
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": localBusinessId,
      name: site.name,
      url: siteUrl,
      image: imageUrl,
      telephone: site.contact.whatsappDisplay,
      address: site.schema.address,
      areaServed: site.schema.areaServed,
      description: page.seo.description,
      parentOrganization: { "@id": organizationId },
      sameAs: [site.contact.instagramUrl]
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": serviceId,
      name: page.sections.services.title,
      description: page.sections.services.body,
      url: canonicalUrl,
      provider: { "@id": localBusinessId },
      areaServed: site.schema.areaServed,
      serviceType: page.services.map((service) => translate(service.title, page.locale)),
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: site.contact.whatsappUrl,
        availableLanguage: site.schema.languages
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": faqId,
      inLanguage: page.htmlLang,
      mainEntity: page.faq.map((item) => ({
        "@type": "Question",
        name: translate(item.question, page.locale),
        acceptedAnswer: {
          "@type": "Answer",
          text: translate(item.answer, page.locale)
        }
      }))
    }
  ];
};
