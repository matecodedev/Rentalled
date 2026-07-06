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
export type ServiceItem = { id: string; title: LocalizedText; description: LocalizedText };
export type FaqItem = { id: string; question: LocalizedText; answer: LocalizedText };
export type ClientTypeItem = { id: string; title: LocalizedText; description: LocalizedText };
export type PortfolioItem = {
  id: string;
  fileName: string;
  alt: LocalizedText;
  category: LocalizedText;
  featured?: boolean;
};

export type SectionCopy = { eyebrow: string; title: string; body: string };

export type LandingSections = {
  shell: {
    skipLabel: string;
    navLabel: string;
    languageLabel: string;
    menuOpenLabel: string;
    menuCloseLabel: string;
    eyebrow: string;
    title: string;
    intro: string;
  };
  hero: { eyebrow: string; title: string; subtitle: string; primaryCta: string; secondaryCta: string };
  about: SectionCopy & { stat: string; details: string[] };
  services: SectionCopy;
  portfolio: SectionCopy & { brandAlt: string; brandCaption: string };
  clients: SectionCopy;
  faq: SectionCopy;
  contact: SectionCopy & { whatsappLabel: string; instagramLabel: string; locationLabel: string };
  footer: { rights: string; languageLabel: string };
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
  themeColor: "#05070b",
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
    { id: "corporate", title: { es: "Pantallas LED para eventos corporativos", en: "LED Screens for Corporate Events" }, description: { es: "Soluciones visuales para lanzamientos, congresos, conferencias y activaciones de marca.", en: "Visual solutions for launches, conferences, conventions and brand activations." } },
    { id: "social", title: { es: "Pantallas LED para eventos sociales", en: "LED Screens for Social Events" }, description: { es: "Presencia visual de alto impacto para celebraciones, shows y experiencias privadas.", en: "High-impact visual presence for celebrations, shows and private experiences." } },
    { id: "operation", title: { es: "Armado, operación y soporte técnico", en: "Setup, Operation and Technical Support" }, description: { es: "Equipo técnico propio para montaje, operación en vivo y asistencia durante el evento.", en: "In-house technical crew for setup, live operation and event support." } },
    { id: "brands", title: { es: "Marcas, agencias y productoras", en: "Brands, Agencies and Producers" }, description: { es: "Acompañamiento para campañas, presentaciones y contenidos que necesitan ejecución precisa.", en: "Support for campaigns, presentations and content that require precise execution." } },
    { id: "venues", title: { es: "Salones, venues y producción integral", en: "Venues and Production Companies" }, description: { es: "Integración con equipos de venue, sonido, iluminación y producción para una operación ordenada.", en: "Coordination with venue, audio, lighting and production teams for a reliable operation." } }
  ],
  clients: [
    { id: "companies", title: { es: "Empresas", en: "Companies" }, description: { es: "Pantallas LED para presentaciones, celebraciones internas y encuentros comerciales.", en: "LED screens for presentations, internal celebrations and commercial gatherings." } },
    { id: "agencies", title: { es: "Agencias", en: "Agencies" }, description: { es: "Respuesta técnica para activaciones, campañas y experiencias de marca.", en: "Technical response for activations, campaigns and brand experiences." } },
    { id: "producers", title: { es: "Productoras", en: "Production Companies" }, description: { es: "Coordinación clara con sonido, iluminación, escenario y dirección técnica.", en: "Clear coordination with audio, lighting, staging and technical direction." } },
    { id: "venues", title: { es: "Salones y venues", en: "Venues" }, description: { es: "Integración con accesos, tiempos de montaje y condiciones del espacio.", en: "Integration with access, setup timing and venue conditions." } },
    { id: "social-organizers", title: { es: "Organizadores sociales", en: "Social Event Organizers" }, description: { es: "Acompañamiento para celebraciones que necesitan impacto visual y operación confiable.", en: "Support for celebrations that need visual impact and reliable operation." } }
  ],
  faq: [
    { id: "area", question: { es: "¿En qué zonas trabajan?", en: "Which areas do you cover?" }, answer: { es: "Trabajamos en CABA y Buenos Aires, Argentina, con coordinación previa para cada evento.", en: "We work across CABA and Buenos Aires, Argentina, with planning adapted to each event." } },
    { id: "events", question: { es: "¿Qué tipos de eventos cubren?", en: "What event types do you cover?" }, answer: { es: "Eventos corporativos, sociales, activaciones, shows, congresos y producciones especiales.", en: "Corporate events, social events, activations, shows, conferences and special productions." } },
    { id: "screens", question: { es: "¿Qué pantallas LED ofrecen?", en: "What LED screens do you offer?" }, answer: { es: "Contamos con pantallas indoor pitch 2.6 mm y outdoor pitch 3.9 mm para distintos contextos.", en: "We provide indoor 2.6 mm pitch and outdoor 3.9 mm pitch LED screens for different contexts." } },
    { id: "operation", question: { es: "¿Incluyen armado y operación?", en: "Is setup and operation included?" }, answer: { es: "Sí. El servicio contempla montaje, operación técnica y soporte durante el evento.", en: "Yes. The service includes setup, technical operation and support during the event." } },
    { id: "quote", question: { es: "¿Cómo se solicita una cotización?", en: "How do I request a quote?" }, answer: { es: "Puede escribir por WhatsApp con fecha, lugar, horario y tipo de evento para recibir una propuesta.", en: "Contact us on WhatsApp with the date, venue, schedule and event type to receive a proposal." } },
    { id: "timing", question: { es: "¿Con cuánto tiempo conviene consultar?", en: "How far in advance should I contact you?" }, answer: { es: "Recomendamos consultar con anticipación para validar disponibilidad, medidas, accesos y requerimientos técnicos.", en: "We recommend contacting us early to confirm availability, dimensions, access and technical requirements." } }
  ],
  portfolio: [
    { id: "screen-01", fileName: "1000085426.jpg", alt: { es: "Pantalla LED en evento con operación técnica", en: "LED screen at an event with technical operation" }, category: { es: "Evento técnico", en: "Technical Event" }, featured: true },
    { id: "screen-02", fileName: "1000084648.jpg", alt: { es: "Montaje de pantalla LED para presentación", en: "LED screen setup for a presentation" }, category: { es: "Corporativo", en: "Corporate" } },
    { id: "screen-03", fileName: "1000084628 (1).jpg", alt: { es: "Pantalla LED para evento social", en: "LED screen for a social event" }, category: { es: "Social", en: "Social" } },
    { id: "screen-04", fileName: "1000084639.jpg", alt: { es: "Escenario con pantalla LED indoor", en: "Stage with indoor LED screen" }, category: { es: "Indoor", en: "Indoor" } },
    { id: "screen-05", fileName: "1000118364.jpg", alt: { es: "Pantalla LED para show y contenido visual", en: "LED screen for a show and visual content" }, category: { es: "Show", en: "Show" } },
    { id: "screen-06", fileName: "1000118370.jpg", alt: { es: "Evento con pantalla LED y ambientación", en: "Event with LED screen and atmosphere" }, category: { es: "Producción", en: "Production" } },
    { id: "screen-07", fileName: "1000140534.jpg", alt: { es: "Pantalla LED de gran formato para evento", en: "Large-format LED screen for an event" }, category: { es: "Gran formato", en: "Large Format" } },
    { id: "screen-08", fileName: "1000118367.jpg", alt: { es: "Pantalla LED en espacio de eventos", en: "LED screen in an event venue" }, category: { es: "Venue", en: "Venue" } },
    { id: "screen-09", fileName: "1000084631.jpg", alt: { es: "Contenido visual en pantalla LED", en: "Visual content on an LED screen" }, category: { es: "Contenido", en: "Content" } },
    { id: "screen-10", fileName: "1000084684.jpg", alt: { es: "Montaje técnico para pantalla LED", en: "Technical setup for an LED screen" }, category: { es: "Montaje", en: "Setup" } },
    { id: "screen-11", fileName: "1000085410.jpg", alt: { es: "Pantalla LED para presentación en vivo", en: "LED screen for a live presentation" }, category: { es: "En vivo", en: "Live" } },
    { id: "screen-12", fileName: "1000084645.jpg", alt: { es: "Pantalla LED integrada a producción de evento", en: "LED screen integrated into event production" }, category: { es: "Integración", en: "Integration" } },
    { id: "screen-13", fileName: "1000084679.jpg", alt: { es: "Pantalla LED con visuales para audiencia", en: "LED screen with visuals for an audience" }, category: { es: "Audiencia", en: "Audience" } },
    { id: "screen-14", fileName: "1000085416.jpg", alt: { es: "Pantalla LED para experiencia de marca", en: "LED screen for a brand experience" }, category: { es: "Marca", en: "Brand" } }
  ],
  pages: {
    es: {
      locale: "es",
      htmlLang: "es-AR",
      route: "/",
      alternateRoute: "/en/",
      seo: { title: "Rental Led | Pantallas LED para eventos en Buenos Aires", description: "Alquiler de pantallas LED para eventos corporativos y sociales en CABA y Buenos Aires, con operación técnica propia.", canonicalPath: "/", ogImage: "/og-rental-led.png", ogImageAlt: "Operación de pantallas LED de Rental Led para eventos" },
      sections: {
        shell: { skipLabel: "Saltar al contenido principal", navLabel: "Navegación principal", languageLabel: "Selector de idioma", menuOpenLabel: "Menú", menuCloseLabel: "Cerrar", eyebrow: "Scaffold inicial", title: "Pantallas LED para eventos con operación técnica propia", intro: "Base de contenido, diseño e i18n preparada para construir la landing de Rental Led." },
        hero: { eyebrow: "Rental Led", title: "Pantallas LED para eventos corporativos y sociales", subtitle: "Más de 12 años de experiencia en eventos, respuesta rápida y acompañamiento técnico en CABA y Buenos Aires.", primaryCta: "Cotizar por WhatsApp", secondaryCta: "Ver portfolio" },
        about: { eyebrow: "Experiencia", title: "Más de 12 años de experiencia en eventos", body: "Operamos pantallas LED indoor pitch 2.6 mm y outdoor pitch 3.9 mm con equipo técnico propio, planificación clara y atención personalizada para cada proyecto.", stat: "12+ años de experiencia en eventos", details: ["Operación técnica propia", "Pantallas indoor 2.6 mm y outdoor 3.9 mm", "Respuesta rápida y seguimiento responsable"] },
        services: { eyebrow: "Servicios", title: "Soluciones LED para cada formato de evento", body: "Trabajamos con empresas, agencias, productoras, venues y organizadores sociales que necesitan impacto visual y soporte confiable." },
        portfolio: { eyebrow: "Portfolio real", title: "Pantallas en eventos, shows y producciones", body: "Una selección de montajes reales con pantallas LED, operación técnica y contenido visual aplicado a distintos formatos de evento.", brandAlt: "Logo de Rental Led", brandCaption: "Marca y operación propias para eventos en Buenos Aires." },
        clients: { eyebrow: "Clientes", title: "Acompañamos a quienes producen experiencias", body: "Sin logos inventados ni testimonios fabricados: el foco está en los tipos de equipos que suelen necesitar una operación LED confiable." },
        faq: { eyebrow: "Preguntas frecuentes", title: "Información clave antes de cotizar", body: "Respuestas directas sobre cobertura, tipos de eventos, operación técnica, tiempos y soporte." },
        contact: { eyebrow: "Contacto", title: "Hablemos sobre su evento", body: "Compartir fecha, lugar, horarios y necesidades técnicas permite preparar una propuesta clara.", whatsappLabel: "Escribir por WhatsApp", instagramLabel: "Ver Instagram", locationLabel: "Zona de cobertura" },
        footer: { rights: "Pantallas LED para eventos en CABA y Buenos Aires.", languageLabel: "Idioma" }
      }
    },
    en: {
      locale: "en",
      htmlLang: "en",
      route: "/en/",
      alternateRoute: "/",
      seo: { title: "Rental Led | LED Screen Rental in Buenos Aires", description: "LED screen rental for corporate and social events in Buenos Aires, with in-house technical operation.", canonicalPath: "/en/", ogImage: "/og-rental-led.png", ogImageAlt: "Rental Led LED screen operation for events" },
      sections: {
        shell: { skipLabel: "Skip to main content", navLabel: "Primary navigation", languageLabel: "Language selector", menuOpenLabel: "Menu", menuCloseLabel: "Close", eyebrow: "Initial scaffold", title: "LED Screens for Events With In-House Technical Operation", intro: "Content, design tokens and i18n foundation for the Rental Led landing page." },
        hero: { eyebrow: "Rental Led", title: "LED Screens for Corporate and Social Events", subtitle: "12+ years of event experience, fast response and technical support across Buenos Aires.", primaryCta: "Request a WhatsApp Quote", secondaryCta: "View Portfolio" },
        about: { eyebrow: "Experience", title: "12+ Years of Event Experience", body: "We operate indoor 2.6 mm pitch and outdoor 3.9 mm pitch LED screens with an in-house technical crew, clear planning and personalized attention for every project.", stat: "12+ years of event experience", details: ["In-house technical operation", "Indoor 2.6 mm and outdoor 3.9 mm screens", "Fast response and responsible follow-through"] },
        services: { eyebrow: "Services", title: "LED Solutions for Every Event Format", body: "We support companies, agencies, production teams, venues and social organizers that need visual impact and reliable technical support." },
        portfolio: { eyebrow: "Real Portfolio", title: "Screens Across Events, Shows and Productions", body: "A selection of real setups with LED screens, technical operation and visual content adapted to different event formats.", brandAlt: "Rental Led logo", brandCaption: "Owned brand and operation for events in Buenos Aires." },
        clients: { eyebrow: "Clients", title: "Built for Teams Producing Experiences", body: "No invented logos or fabricated testimonials: the focus is on the teams that usually need reliable LED operation." },
        faq: { eyebrow: "FAQ", title: "Key Details Before Requesting a Quote", body: "Direct answers about coverage, event types, technical operation, timing and support." },
        contact: { eyebrow: "Contact", title: "Tell Us About Your Event", body: "Share the date, venue, schedule and technical needs to receive a clear proposal.", whatsappLabel: "Message on WhatsApp", instagramLabel: "View Instagram", locationLabel: "Service Area" },
        footer: { rights: "LED screens for events in CABA and Buenos Aires.", languageLabel: "Language" }
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
      logo: imageUrl,
      image: imageUrl,
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
