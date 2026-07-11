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
  problem: SectionCopy & { riskLabel: string; risks: string[]; solutionLabel: string; solutions: string[] };
  process: SectionCopy & { steps: { icon: string; title: string; body: string }[] };
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
    { id: "congresses", icon: "presentation", title: { es: "Congresos, simposios y seminarios", en: "Congresses, symposia and seminars" }, description: { es: "Soporte visual para congresos médicos y científicos: salas plenarias, salas paralelas y contenido para presentaciones técnicas.", en: "Visual support for medical and scientific congresses: plenary halls, parallel sessions and content for technical presentations." } },
    { id: "corporate", icon: "sparkles", title: { es: "Lanzamientos y eventos corporativos", en: "Launches and corporate events" }, description: { es: "Pantallas LED para lanzamientos de producto, convenciones, conferencias y activaciones de marca.", en: "LED screens for product launches, conventions, conferences and brand activations." } },
    { id: "producers", icon: "clapperboard", title: { es: "Productoras y agencias", en: "Production companies and agencies" }, description: { es: "Ejecución precisa para campañas, presentaciones y contenidos que no admiten improvisación.", en: "Precise execution for campaigns, presentations and content that leaves no room for improvisation." } },
    { id: "operation", icon: "wrench", title: { es: "Armado, operación y soporte técnico", en: "Setup, operation and technical support" }, description: { es: "Equipo técnico propio para montaje, operación en vivo y asistencia durante todo el evento.", en: "In-house technical crew for setup, live operation and support throughout the event." } },
    { id: "social", icon: "party-popper", title: { es: "Eventos sociales de alto perfil", en: "High-profile social events" }, description: { es: "Presencia visual de primer nivel para celebraciones y experiencias privadas exigentes.", en: "First-class visual presence for demanding celebrations and private experiences." } }
  ],
  clients: [
    { id: "labs", icon: "building-2", title: { es: "Laboratorios y empresas", en: "Laboratories and companies" }, description: { es: "Pantallas LED para congresos, convenciones internas y presentaciones comerciales.", en: "LED screens for congresses, internal conventions and commercial presentations." } },
    { id: "agencies", icon: "megaphone", title: { es: "Agencias", en: "Agencies" }, description: { es: "Respuesta técnica para activaciones, campañas y experiencias de marca.", en: "Technical response for activations, campaigns and brand experiences." } },
    { id: "producers", icon: "clapperboard", title: { es: "Productoras", en: "Production companies" }, description: { es: "Coordinación clara con sonido, iluminación, escenario y dirección técnica.", en: "Clear coordination with audio, lighting, staging and technical direction." } },
    { id: "venues", icon: "warehouse", title: { es: "Salones y venues", en: "Venues" }, description: { es: "Integración con accesos, tiempos de montaje y condiciones del espacio.", en: "Integration with access, setup timing and venue conditions." } },
    { id: "congress-organizers", icon: "map-pin", title: { es: "Organizadores de congresos", en: "Congress organizers" }, description: { es: "Soporte para eventos científicos y profesionales con salas simultáneas.", en: "Support for scientific and professional events with simultaneous sessions." } }
  ],
  faq: [
    { id: "area", question: { es: "¿En qué zonas trabajan?", en: "Which areas do you cover?" }, answer: { es: "Trabajamos en CABA y Buenos Aires, Argentina, con coordinación previa para cada evento.", en: "We work across CABA and Buenos Aires, Argentina, with planning adapted to each event." } },
    { id: "events", question: { es: "¿Qué tipos de eventos cubren?", en: "What event types do you cover?" }, answer: { es: "Congresos médicos y científicos, eventos corporativos, lanzamientos, convenciones, activaciones y producciones especiales. También eventos sociales de alto perfil.", en: "Medical and scientific congresses, corporate events, launches, conventions, activations and special productions. Also high-profile social events." } },
    { id: "screens", question: { es: "¿Qué pantallas LED ofrecen?", en: "What LED screens do you offer?" }, answer: { es: "Contamos con pantallas indoor pitch 2.6 mm y outdoor pitch 3.9 mm para distintos contextos.", en: "We provide indoor 2.6 mm pitch and outdoor 3.9 mm pitch LED screens for different contexts." } },
    { id: "operation", question: { es: "¿Incluyen armado y operación?", en: "Is setup and operation included?" }, answer: { es: "Sí. El servicio contempla montaje, operación técnica y soporte durante el evento.", en: "Yes. The service includes setup, technical operation and support during the event." } },
    { id: "quote", question: { es: "¿Cómo se solicita una cotización?", en: "How do I request a quote?" }, answer: { es: "Podés escribir por WhatsApp con fecha, lugar, horario y tipo de evento para recibir una propuesta.", en: "Contact us on WhatsApp with the date, venue, schedule and event type to receive a proposal." } },
    { id: "timing", question: { es: "¿Con cuánto tiempo conviene consultar?", en: "How far in advance should I contact you?" }, answer: { es: "Recomendamos consultar con anticipación para validar disponibilidad, medidas, accesos y requerimientos técnicos.", en: "We recommend contacting us early to confirm availability, dimensions, access and technical requirements." } },
    { id: "cost", question: { es: "¿Cuánto cuesta alquilar una pantalla LED?", en: "How much does it cost to rent an LED screen?" }, answer: { es: "El costo depende del tamaño de la pantalla, el tipo de evento, la duración y los requerimientos técnicos. Escribinos por WhatsApp con los detalles y te pasamos una cotización a medida.", en: "The cost depends on screen size, event type, duration and technical requirements. Message us on WhatsApp with the details and we'll send a tailored quote." } },
    { id: "medical", question: { es: "¿Alquilan pantallas LED para congresos médicos?", en: "Do you rent LED screens for medical congresses?" }, answer: { es: "Sí. Trabajamos con laboratorios y organizadores en congresos, simposios y seminarios médicos, incluyendo salas plenarias y salas paralelas, con operación técnica en vivo.", en: "Yes. We work with laboratories and organizers on medical congresses, symposia and seminars, including plenary halls and parallel sessions, with live technical operation." } },
    { id: "pitch", question: { es: "¿Qué diferencia hay entre el pitch 2.6 mm y el 3.9 mm?", en: "What's the difference between 2.6 mm and 3.9 mm pitch?" }, answer: { es: "El pitch es la distancia entre píxeles: cuanto menor, mayor definición de cerca. El de 2.6 mm es ideal para indoor, con el público cerca; el de 3.9 mm rinde en outdoor y a mayores distancias.", en: "Pitch is the distance between pixels: the smaller it is, the sharper the image up close. The 2.6 mm one is ideal indoors, with the audience nearby; the 3.9 mm one performs outdoors and at greater distances." } }
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
      seo: { title: "Rental Led | Pantallas LED para congresos y eventos corporativos en Buenos Aires", description: "Alquiler y operación de pantallas LED para congresos médicos, lanzamientos y eventos corporativos en CABA y Buenos Aires. Equipo técnico propio: montaje y operación en vivo.", canonicalPath: "/", ogImage: "/og-rental-led.png", ogImageAlt: "Operación de pantallas LED de Rental Led para eventos" },
      sections: {
        shell: { skipLabel: "Saltar al contenido principal", navLabel: "Navegación principal", languageLabel: "Selector de idioma", menuOpenLabel: "Menú", menuCloseLabel: "Cerrar" },
        hero: {
          eyebrow: "Rental Led · Producción técnica LED",
          titleLead: "Pantallas LED para eventos donde la imagen no puede",
          titleHighlight: "fallar",
          subtitle: "Alquiler, montaje y operación en vivo de pantallas LED para congresos, lanzamientos y eventos corporativos. Equipo técnico propio de principio a fin, en CABA y Buenos Aires.",
          primaryCta: "Cotizar por WhatsApp",
          primaryCtaShort: "Cotizar",
          secondaryCta: "Ver montajes reales",
          stats: [
            { key: "Trayectoria", value: "12+", label: "años en eventos" },
            { key: "Indoor", value: "2.6 mm", label: "pixel pitch" },
            { key: "Outdoor", value: "3.9 mm", label: "pixel pitch" }
          ],
          media: [
            { fileName: "1000085426.webp", category: "Evento corporativo", liveLabel: "" }
          ],
          ticker: ["Pantallas LED", "Congresos y simposios", "Eventos corporativos", "Lanzamientos de marca", "CABA · Buenos Aires", "Operación técnica propia", "Indoor 2.6mm", "Outdoor 3.9mm"]
        },
        about: {
          eyebrow: "Experiencia",
          years: "12+",
          yearsLabel: "años de experiencia en eventos",
          title: "Un socio técnico, no un simple alquiler de equipos",
          body: "Operamos pantallas LED indoor de pitch 2.6 mm y outdoor de 3.9 mm con equipo técnico propio. Planificamos cada montaje con anticipación y operamos en vivo, para que la parte visual de tu congreso, lanzamiento o evento salga exactamente como está previsto.",
          details: ["Equipo técnico propio, sin tercerizar", "Pantallas indoor 2.6 mm y outdoor 3.9 mm", "Planificación previa y operación en vivo"],
          imageFileName: "1000140534-about.webp",
          imageWidth: 1200,
          imageHeight: 900,
          imageAlt: "Pantalla LED de gran formato en evento",
          imageTag: "Operación en vivo"
        },
        services: { eyebrow: "Servicios", title: "Pantallas LED para cada formato profesional", body: "Trabajamos con productoras, agencias, laboratorios y organizadores de congresos que necesitan impacto visual y una operación técnica sin fisuras." },
        problem: {
          eyebrow: "El riesgo real",
          title: "En un congreso o un lanzamiento, la pantalla no puede fallar",
          body: "Cuando sube el orador o arranca el simposio, no hay segunda toma. Un parpadeo, un desfasaje o un operador que no está arruina el momento más importante del evento.",
          riskLabel: "Sin un operador técnico dedicado",
          risks: [
            "La pantalla titila o corta justo en la charla principal",
            "Nadie resuelve en vivo si algo se cae",
            "El contenido se ve borroso o mal escalado",
            "El armado se atrasa y llegás sobre la hora"
          ],
          solutionLabel: "Con Rental Led",
          solutions: [
            "Equipo técnico propio operando en vivo, de principio a fin",
            "Un técnico dedicado atento durante toda la jornada",
            "Contenido probado y calibrado antes de abrir puertas",
            "Montaje planificado con anticipación, sin corridas"
          ]
        },
        process: {
          eyebrow: "Cómo trabajamos",
          title: "Tres pasos, cero improvisación",
          body: "Un proceso claro para que llegues al día del evento sin sorpresas.",
          steps: [
            { icon: "phone", title: "Nos contás tu evento", body: "Fecha, sede, tipo de evento y necesidades técnicas. Te respondemos con una propuesta clara y sin vueltas." },
            { icon: "wrench", title: "Planificamos y montamos", body: "Definimos medidas, accesos y tiempos. Llegamos con anticipación y dejamos todo probado antes de que empiece." },
            { icon: "presentation", title: "Operamos en vivo", body: "Un técnico opera la pantalla durante todo el evento y resuelve cualquier ajuste en el momento." }
          ]
        },
        portfolio: { eyebrow: "Portfolio real", title: "Pantallas en congresos, eventos y producciones", body: "Una selección de montajes reales con pantallas LED, operación técnica y contenido visual en distintos formatos profesionales.", cta: "Pedir ejemplos de tu tipo de evento" },
        clients: { eyebrow: "Clientes", title: "Trabajamos detrás de escena de tu evento", body: "Sin logos inventados ni testimonios fabricados. El foco está en los equipos que necesitan una operación LED confiable: laboratorios, productoras, agencias y organizadores de congresos." },
        faq: { eyebrow: "Preguntas frecuentes", title: "Información clave antes de cotizar", body: "Respuestas directas sobre cobertura, tipos de eventos, operación técnica, tiempos y soporte." },
        contact: { eyebrow: "Contacto", title: "Hablemos de tu evento", body: "Compartinos fecha, sede, horarios y requerimientos técnicos, y preparamos una propuesta clara para tu congreso, lanzamiento o evento.", whatsappLabel: "Escribir por WhatsApp", instagramLabel: "Ver Instagram", locationLabel: "Zona de cobertura" },
        footer: { rights: "Pantallas LED para congresos y eventos corporativos en CABA y Buenos Aires, con operación técnica propia de principio a fin.", navLabel: "Navegación", contactLabel: "Contacto", languageLabel: "Idioma", tagline: "Pantallas LED · Producción técnica para eventos profesionales" }
      }
    },
    en: {
      locale: "en",
      htmlLang: "en",
      route: "/en/",
      alternateRoute: "/",
      seo: { title: "Rental Led | LED Screen Rental for Congresses & Corporate Events in Buenos Aires", description: "LED screen rental and operation for medical congresses, product launches and corporate events in Buenos Aires. In-house technical crew: setup and live operation.", canonicalPath: "/en/", ogImage: "/og-rental-led.png", ogImageAlt: "Rental Led LED screen operation for events" },
      sections: {
        shell: { skipLabel: "Skip to main content", navLabel: "Primary navigation", languageLabel: "Language selector", menuOpenLabel: "Menu", menuCloseLabel: "Close" },
        hero: {
          eyebrow: "Rental Led · LED Technical Production",
          titleLead: "LED screens for events where the image cannot",
          titleHighlight: "fail",
          subtitle: "LED screen rental, setup and live operation for congresses, product launches and corporate events. In-house technical crew from start to finish, in Buenos Aires.",
          primaryCta: "Request a WhatsApp quote",
          primaryCtaShort: "Get a quote",
          secondaryCta: "See real setups",
          stats: [
            { key: "Track record", value: "12+", label: "years in events" },
            { key: "Indoor", value: "2.6 mm", label: "pixel pitch" },
            { key: "Outdoor", value: "3.9 mm", label: "pixel pitch" }
          ],
          media: [
            { fileName: "1000085426.webp", category: "Corporate event", liveLabel: "" }
          ],
          ticker: ["LED screens", "Congresses & symposia", "Corporate events", "Brand launches", "Buenos Aires", "In-house technical crew", "Indoor 2.6mm", "Outdoor 3.9mm"]
        },
        about: {
          eyebrow: "Experience",
          years: "12+",
          yearsLabel: "years of event experience",
          title: "A technical partner, not just an equipment rental",
          body: "We operate indoor 2.6 mm pitch and outdoor 3.9 mm pitch LED screens with an in-house technical crew. We plan every setup in advance and operate live, so the visual side of your congress, launch or event runs exactly as planned.",
          details: ["In-house technical crew, never outsourced", "Indoor 2.6 mm and outdoor 3.9 mm screens", "Advance planning and live operation"],
          imageFileName: "1000140534-about.webp",
          imageWidth: 1200,
          imageHeight: 900,
          imageAlt: "Large-format LED screen at an event",
          imageTag: "Live operation"
        },
        services: { eyebrow: "Services", title: "LED screens for every professional format", body: "We work with production companies, agencies, laboratories and congress organizers that need visual impact and flawless technical operation." },
        problem: {
          eyebrow: "The real risk",
          title: "At a congress or a launch, the screen cannot fail",
          body: "When the speaker walks on stage or the symposium starts, there is no second take. A flicker, a sync issue or a missing operator ruins the most important moment of the event.",
          riskLabel: "Without a dedicated technical operator",
          risks: [
            "The screen flickers or cuts out during the main talk",
            "No one solves it live if something goes down",
            "Content looks blurry or badly scaled",
            "Setup runs late and you finish just in time"
          ],
          solutionLabel: "With Rental Led",
          solutions: [
            "Our own technical crew operating live, from start to finish",
            "A dedicated technician watching the operation all day",
            "Content tested and calibrated before doors open",
            "Setup planned well in advance, no rush"
          ]
        },
        process: {
          eyebrow: "How we work",
          title: "Three steps, zero improvisation",
          body: "A clear process so you reach event day with no surprises.",
          steps: [
            { icon: "phone", title: "You tell us about your event", body: "Date, venue, event type and technical needs. We reply with a clear, straightforward proposal." },
            { icon: "wrench", title: "We plan and set up", body: "We define dimensions, access and timing. We arrive early and leave everything tested before it starts." },
            { icon: "presentation", title: "We operate live", body: "A technician runs the screen throughout the event and handles any adjustment on the spot." }
          ]
        },
        portfolio: { eyebrow: "Real portfolio", title: "Screens across congresses, events and productions", body: "A selection of real setups with LED screens, technical operation and visual content across different professional formats.", cta: "Ask for examples for your type of event" },
        clients: { eyebrow: "Clients", title: "We work behind the scenes of your event", body: "No invented logos or fabricated testimonials. The focus is on the teams that need reliable LED operation: laboratories, production companies, agencies and congress organizers." },
        faq: { eyebrow: "FAQ", title: "Key details before requesting a quote", body: "Direct answers about coverage, event types, technical operation, timing and support." },
        contact: { eyebrow: "Contact", title: "Let's talk about your event", body: "Share the date, venue, schedule and technical requirements and we will prepare a clear proposal for your congress, launch or event.", whatsappLabel: "Message on WhatsApp", instagramLabel: "View Instagram", locationLabel: "Service area" },
        footer: { rights: "LED screens for congresses and corporate events in CABA and Buenos Aires, with in-house technical operation from start to finish.", navLabel: "Navigation", contactLabel: "Contact", languageLabel: "Language", tagline: "LED screens · Technical production for professional events" }
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
      knowsAbout: [
        "Alquiler de pantallas LED",
        "Pantallas LED indoor",
        "Pantallas LED outdoor",
        "Producción técnica de eventos",
        "Congresos y simposios médicos",
        "Eventos corporativos y lanzamientos de producto"
      ],
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
