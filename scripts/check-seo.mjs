import { existsSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = join(rootDir, "dist");
const baseUrl = "https://rentalled.com.ar";

const urls = {
  es: `${baseUrl}/`,
  en: `${baseUrl}/en/`,
  sitemapIndex: `${baseUrl}/sitemap-index.xml`,
  sitemap: `${baseUrl}/sitemap-0.xml`
};

const expectedLaunch = {
  whatsappDisplay: "+54 9 11 4973 4510",
  whatsappDigits: "5491149734510",
  whatsappUrl: "https://wa.me/5491149734510",
  instagramHandle: "@rentalled.ar",
  instagramUrl: "https://www.instagram.com/rentalled.ar",
  ogImagePath: "/og-rental-led.png",
  ogImageUrl: `${baseUrl}/og-rental-led.png`,
  ogImageType: "image/png",
  ogImageWidth: 1200,
  ogImageHeight: 630
};

const expectedAlternateLinks = [
  { hreflang: "es", href: urls.es },
  { hreflang: "en", href: urls.en },
  { hreflang: "x-default", href: urls.es }
];

const expectedPages = [
  {
    locale: "es",
    file: "index.html",
    htmlLang: "es-AR",
    canonical: urls.es,
    faq: [
      {
        question: "¿En qué zonas trabajan?",
        answer: "Trabajamos en CABA y Buenos Aires, Argentina, con coordinación previa para cada evento."
      },
      {
        question: "¿Qué tipos de eventos cubren?",
        answer: "Congresos médicos y científicos, eventos corporativos, lanzamientos, convenciones, activaciones y producciones especiales. También eventos sociales de alto perfil."
      },
      {
        question: "¿Qué pantallas LED ofrecen?",
        answer: "Contamos con pantallas indoor pitch 2.6 mm y outdoor pitch 3.9 mm para distintos contextos."
      },
      {
        question: "¿Incluyen armado y operación?",
        answer: "Sí. El servicio contempla montaje, operación técnica y soporte durante el evento."
      },
      {
        question: "¿Cómo se solicita una cotización?",
        answer: "Podés escribir por WhatsApp con fecha, lugar, horario y tipo de evento para recibir una propuesta."
      },
      {
        question: "¿Con cuánto tiempo conviene consultar?",
        answer: "Recomendamos consultar con anticipación para validar disponibilidad, medidas, accesos y requerimientos técnicos."
      }
    ]
  },
  {
    locale: "en",
    file: "en/index.html",
    htmlLang: "en",
    canonical: urls.en,
    faq: [
      {
        question: "Which areas do you cover?",
        answer: "We work across CABA and Buenos Aires, Argentina, with planning adapted to each event."
      },
      {
        question: "What event types do you cover?",
        answer: "Medical and scientific congresses, corporate events, launches, conventions, activations and special productions. Also high-profile social events."
      },
      {
        question: "What LED screens do you offer?",
        answer: "We provide indoor 2.6 mm pitch and outdoor 3.9 mm pitch LED screens for different contexts."
      },
      {
        question: "Is setup and operation included?",
        answer: "Yes. The service includes setup, technical operation and support during the event."
      },
      {
        question: "How do I request a quote?",
        answer: "Contact us on WhatsApp with the date, venue, schedule and event type to receive a proposal."
      },
      {
        question: "How far in advance should I contact you?",
        answer: "We recommend contacting us early to confirm availability, dimensions, access and technical requirements."
      }
    ]
  }
];

const requiredOpenGraph = [
  "og:type",
  "og:site_name",
  "og:url",
  "og:title",
  "og:description",
  "og:image",
  "og:image:secure_url",
  "og:image:type",
  "og:image:width",
  "og:image:height",
  "og:image:alt"
];

const requiredTwitter = [
  "twitter:card",
  "twitter:title",
  "twitter:description",
  "twitter:image",
  "twitter:image:alt"
];

const requiredSchemaTypes = ["Organization", "LocalBusiness", "Service", "FAQPage"];
const failures = [];

const toProjectPath = (filePath) => relative(rootDir, filePath) || ".";

const check = (condition, message) => {
  if (!condition) {
    failures.push(message);
  }
};

const readRequired = (filePath, label) => {
  if (!existsSync(filePath)) {
    failures.push(`${label} is missing: ${toProjectPath(filePath)}`);
    return "";
  }

  return readFileSync(filePath, "utf8");
};

const parseAttributes = (source) => {
  const attrs = {};
  const attrPattern = /([^\s"'<>/=]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/g;

  for (const match of source.matchAll(attrPattern)) {
    attrs[match[1].toLowerCase()] = match[2] ?? match[3] ?? match[4] ?? "";
  }

  return attrs;
};

const getTags = (html, tagName) => {
  const pattern = new RegExp(`<${tagName}\\b[^>]*>`, "gi");
  return [...html.matchAll(pattern)].map((match) => ({ raw: match[0], attrs: parseAttributes(match[0]) }));
};

const getJsonLdBlocks = (html, label) => {
  const scripts = [];
  const scriptPattern = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;

  for (const match of html.matchAll(scriptPattern)) {
    const attrs = parseAttributes(match[1]);

    if (attrs.type !== "application/ld+json") {
      continue;
    }

    try {
      scripts.push(JSON.parse(match[2].trim()));
    } catch (error) {
      failures.push(`${label} has invalid JSON-LD: ${error.message}`);
    }
  }

  return scripts;
};

const getSchemaType = (schema) => {
  const type = schema?.["@type"];
  return Array.isArray(type) ? type : [type];
};

const findSchema = (schemas, type) => schemas.find((schema) => getSchemaType(schema).includes(type));

const getXmlLocs = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

const getMetaContent = (metas, key, value) => metas.find((attrs) => attrs[key] === value)?.content ?? "";

const readPngDimensions = (filePath, label) => {
  if (!existsSync(filePath)) {
    failures.push(`${label} is missing: ${toProjectPath(filePath)}`);
    return null;
  }

  const buffer = readFileSync(filePath);
  const pngSignature = "89504e470d0a1a0a";

  if (buffer.subarray(0, 8).toString("hex") !== pngSignature) {
    failures.push(`${label} must be a PNG file: ${toProjectPath(filePath)}`);
    return null;
  }

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20)
  };
};

const validateMetadata = (page, html) => {
  const label = `${page.locale} page`;
  const htmlTag = html.match(/<html\b[^>]*>/i)?.[0] ?? "";
  const htmlAttrs = parseAttributes(htmlTag);
  const links = getTags(html, "link").map(({ attrs }) => attrs);
  const metas = getTags(html, "meta").map(({ attrs }) => attrs);

  check(htmlAttrs.lang === page.htmlLang, `${label} must use <html lang="${page.htmlLang}">.`);
  check(
    links.some((attrs) => attrs.rel === "canonical" && attrs.href === page.canonical),
    `${label} must include canonical URL ${page.canonical}.`
  );

  for (const alternate of expectedAlternateLinks) {
    check(
      links.some(
        (attrs) =>
          attrs.rel === "alternate" &&
          attrs.hreflang === alternate.hreflang &&
          attrs.href === alternate.href
      ),
      `${label} must include hreflang ${alternate.hreflang} -> ${alternate.href}.`
    );
  }

  for (const property of requiredOpenGraph) {
    check(
      metas.some((attrs) => attrs.property === property && attrs.content),
      `${label} must include Open Graph metadata ${property}.`
    );
  }

  for (const name of requiredTwitter) {
    check(
      metas.some((attrs) => attrs.name === name && attrs.content),
      `${label} must include Twitter metadata ${name}.`
    );
  }

  check(getMetaContent(metas, "property", "og:image") === expectedLaunch.ogImageUrl, `${label} must use PNG OG image ${expectedLaunch.ogImageUrl}.`);
  check(getMetaContent(metas, "property", "og:image:secure_url") === expectedLaunch.ogImageUrl, `${label} must use secure PNG OG image ${expectedLaunch.ogImageUrl}.`);
  check(getMetaContent(metas, "property", "og:image:type") === expectedLaunch.ogImageType, `${label} OG image type must be ${expectedLaunch.ogImageType}.`);
  check(Number(getMetaContent(metas, "property", "og:image:width")) === expectedLaunch.ogImageWidth, `${label} OG image width must be ${expectedLaunch.ogImageWidth}.`);
  check(Number(getMetaContent(metas, "property", "og:image:height")) === expectedLaunch.ogImageHeight, `${label} OG image height must be ${expectedLaunch.ogImageHeight}.`);
  check(getMetaContent(metas, "name", "twitter:image") === expectedLaunch.ogImageUrl, `${label} must use PNG Twitter image ${expectedLaunch.ogImageUrl}.`);
};

const validateJsonLd = (page, html) => {
  const label = `${page.locale} page`;
  const schemas = getJsonLdBlocks(html, label);

  check(schemas.length > 0, `${label} must include JSON-LD blocks.`);

  for (const type of requiredSchemaTypes) {
    check(findSchema(schemas, type), `${label} JSON-LD must include ${type}.`);
  }

  const organization = findSchema(schemas, "Organization");
  const localBusiness = findSchema(schemas, "LocalBusiness");
  const service = findSchema(schemas, "Service");

  check(organization?.url === urls.es, `${label} Organization URL must be ${urls.es}.`);
  check(organization?.logo === `${baseUrl}/logo.webp`, `${label} Organization logo must use the production logo.`);
  check(organization?.image === expectedLaunch.ogImageUrl, `${label} Organization image must use the PNG OG image.`);
  check(Array.isArray(organization?.sameAs) && organization.sameAs.includes(expectedLaunch.instagramUrl), `${label} Organization sameAs must include ${expectedLaunch.instagramUrl}.`);

  const contactPoint = Array.isArray(organization?.contactPoint) ? organization.contactPoint[0] : undefined;
  check(contactPoint?.telephone === expectedLaunch.whatsappDisplay, `${label} Organization contactPoint telephone must be ${expectedLaunch.whatsappDisplay}.`);
  check(contactPoint?.url === expectedLaunch.whatsappUrl, `${label} Organization contactPoint URL must be ${expectedLaunch.whatsappUrl}.`);

  check(localBusiness?.url === urls.es, `${label} LocalBusiness URL must be ${urls.es}.`);
  check(localBusiness?.image === expectedLaunch.ogImageUrl, `${label} LocalBusiness image must use the PNG OG image.`);
  check(localBusiness?.telephone === expectedLaunch.whatsappDisplay, `${label} LocalBusiness telephone must be ${expectedLaunch.whatsappDisplay}.`);
  check(Array.isArray(localBusiness?.sameAs) && localBusiness.sameAs.includes(expectedLaunch.instagramUrl), `${label} LocalBusiness sameAs must include ${expectedLaunch.instagramUrl}.`);
  check(service?.availableChannel?.serviceUrl === expectedLaunch.whatsappUrl, `${label} Service channel must use ${expectedLaunch.whatsappUrl}.`);

  const faqPage = findSchema(schemas, "FAQPage");

  if (!faqPage) {
    return;
  }

  check(faqPage.inLanguage === page.htmlLang, `${label} FAQPage must use inLanguage ${page.htmlLang}.`);
  check(Array.isArray(faqPage.mainEntity), `${label} FAQPage must include a mainEntity array.`);

  if (!Array.isArray(faqPage.mainEntity)) {
    return;
  }

  check(
    faqPage.mainEntity.length === page.faq.length,
    `${label} FAQPage must include exactly ${page.faq.length} Q/A entries.`
  );

  for (const expected of page.faq) {
    const question = faqPage.mainEntity.find((entry) => entry?.name === expected.question);
    check(question, `${label} FAQPage is missing question: ${expected.question}`);

    if (question) {
      check(
        question.acceptedAnswer?.text === expected.answer,
        `${label} FAQPage answer mismatch for question: ${expected.question}`
      );
    }
  }
};

const validateSitemapsAndRobots = () => {
  const sitemapIndex = readRequired(join(distDir, "sitemap-index.xml"), "sitemap index");
  const sitemap = readRequired(join(distDir, "sitemap-0.xml"), "sitemap");
  const robots = readRequired(join(distDir, "robots.txt"), "robots.txt");

  const sitemapIndexLocs = getXmlLocs(sitemapIndex);
  const sitemapLocs = getXmlLocs(sitemap);

  check(sitemapIndexLocs.includes(urls.sitemap), `sitemap-index.xml must point to ${urls.sitemap}.`);
  check(sitemapLocs.includes(urls.es), `sitemap-0.xml must list ${urls.es}.`);
  check(sitemapLocs.includes(urls.en), `sitemap-0.xml must list ${urls.en}.`);
  check(
    new RegExp(`^Sitemap:\\s*${urls.sitemapIndex.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*$`, "m").test(robots),
    `robots.txt must point to ${urls.sitemapIndex}.`
  );
};

const validateSourceProductionValues = () => {
  const siteSource = readRequired(join(rootDir, "src/content/site.ts"), "source content");
  const robotsSource = readRequired(join(rootDir, "public/robots.txt"), "robots.txt source");

  check(siteSource.includes(`baseUrl: "${baseUrl}"`), `src/content/site.ts must use production baseUrl ${baseUrl}.`);
  check(siteSource.includes(`whatsappDisplay: "${expectedLaunch.whatsappDisplay}"`), `src/content/site.ts must use production WhatsApp display ${expectedLaunch.whatsappDisplay}.`);
  check(siteSource.includes(`whatsappDigits: "${expectedLaunch.whatsappDigits}"`), `src/content/site.ts must derive WhatsApp digits ${expectedLaunch.whatsappDigits}.`);
  check(siteSource.includes(`whatsappUrl: "${expectedLaunch.whatsappUrl}"`), `src/content/site.ts must use production wa.me URL ${expectedLaunch.whatsappUrl}.`);
  check(siteSource.includes(`instagramHandle: "${expectedLaunch.instagramHandle}"`), `src/content/site.ts must use production Instagram handle ${expectedLaunch.instagramHandle}.`);
  check(siteSource.includes(`instagramUrl: "${expectedLaunch.instagramUrl}"`), `src/content/site.ts must use production Instagram URL ${expectedLaunch.instagramUrl}.`);
  check(siteSource.includes(`ogImage: "${expectedLaunch.ogImagePath}"`), `src/content/site.ts must use crawler-friendly OG image ${expectedLaunch.ogImagePath}.`);
  check(!/placeholder-unconfirmed/i.test(siteSource), "src/content/site.ts must not include placeholder-unconfirmed launch markers.");
  check(!/https?:\/\/[^"'`\s]*\.example\b/i.test(siteSource), "src/content/site.ts must not include a reserved .example domain.");
  check(!/1234[-\s]?5678/.test(siteSource), "src/content/site.ts must not include a sample WhatsApp display.");
  check(!/(?:instagram\.com\/[^"'`\s]*\.ba\b|@[^"'`\s]*\.ba\b)/i.test(siteSource), "src/content/site.ts must not include the old placeholder Instagram handle.");
  check(robotsSource.includes(`Sitemap: ${urls.sitemapIndex}`), `public/robots.txt must point to ${urls.sitemapIndex}.`);
  check(!robotsSource.toLowerCase().includes("placeholder"), "public/robots.txt must not mention placeholder launch values.");
};

const validateOgImageAsset = () => {
  for (const filePath of [join(rootDir, "public/og-rental-led.png"), join(distDir, "og-rental-led.png")]) {
    const dimensions = readPngDimensions(filePath, "OG image");

    if (!dimensions) {
      continue;
    }

    check(
      dimensions.width === expectedLaunch.ogImageWidth && dimensions.height === expectedLaunch.ogImageHeight,
      `${toProjectPath(filePath)} must be ${expectedLaunch.ogImageWidth}x${expectedLaunch.ogImageHeight}; found ${dimensions.width}x${dimensions.height}.`
    );
  }
};

for (const page of expectedPages) {
  const html = readRequired(join(distDir, page.file), `${page.locale} page`);

  if (!html) {
    continue;
  }

  validateMetadata(page, html);
  validateJsonLd(page, html);
}

validateSitemapsAndRobots();
validateSourceProductionValues();
validateOgImageAsset();

if (failures.length > 0) {
  console.error(`SEO check failed with ${failures.length} issue(s):`);

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exit(1);
}

console.log("SEO check passed: ES/EN metadata, JSON-LD, sitemap, robots, production launch values, and PNG OG image are valid.");
