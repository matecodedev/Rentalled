import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = join(rootDir, "dist");
const sourceDir = join(rootDir, "src");
const failures = [];

const expectedLaunch = {
  baseUrl: "https://rentalled.com.ar",
  whatsappUrl: "https://wa.me/5491149734510",
  instagramUrl: "https://www.instagram.com/rentalled.ar",
  ogImageUrl: "https://rentalled.com.ar/og-rental-led.png",
  ogImageType: "image/png",
  ogImageWidth: 1200,
  ogImageHeight: 630
};

const check = (condition, message) => {
  if (!condition) failures.push(message);
};

const toProjectPath = (filePath) => relative(rootDir, filePath) || ".";

const readRequired = (filePath, label) => {
  if (!existsSync(filePath)) {
    failures.push(`${label} is missing: ${toProjectPath(filePath)}`);
    return "";
  }

  return readFileSync(filePath, "utf8");
};

const walkFiles = (directory, predicate) => {
  if (!existsSync(directory)) return [];

  const results = [];

  for (const entry of readdirSync(directory)) {
    const filePath = join(directory, entry);
    const stats = statSync(filePath);

    if (stats.isDirectory()) {
      results.push(...walkFiles(filePath, predicate));
    } else if (!predicate || predicate(filePath)) {
      results.push(filePath);
    }
  }

  return results;
};

const parseAttributes = (source) => {
  const attrs = {};
  const attrPattern = /([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;

  for (const match of source.matchAll(attrPattern)) {
    attrs[match[1].toLowerCase()] = match[2] ?? match[3] ?? match[4] ?? "";
  }

  return attrs;
};

const getTags = (html, tagName) => {
  const pattern = new RegExp(`<${tagName}\\b[^>]*>`, "gi");
  return [...html.matchAll(pattern)].map((match) => ({ raw: match[0], attrs: parseAttributes(match[0]) }));
};

const getElements = (html, tagName) => {
  const pattern = new RegExp(`<${tagName}\\b([^>]*)>([\\s\\S]*?)<\\/${tagName}>`, "gi");
  return [...html.matchAll(pattern)].map((match) => ({ attrs: parseAttributes(match[1]), text: match[2].replace(/<[^>]*>/g, "").trim() }));
};

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

const validateBuiltHtml = () => {
  const pages = [
    { label: "Spanish page", file: "index.html", lang: "es-AR" },
    { label: "English page", file: "en/index.html", lang: "en" }
  ];

  for (const page of pages) {
    const html = readRequired(join(distDir, page.file), page.label);
    if (!html) continue;

    const htmlAttrs = parseAttributes(html.match(/<html\b[^>]*>/i)?.[0] ?? "");
    const viewport = getTags(html, "meta").find(({ attrs }) => attrs.name === "viewport")?.attrs.content ?? "";
    const metas = getTags(html, "meta").map(({ attrs }) => attrs);
    const images = getTags(html, "img");
    const buttons = getElements(html, "button");

    check(htmlAttrs.lang === page.lang, `${page.label} must use <html lang="${page.lang}">.`);
    check(viewport.includes("width=device-width"), `${page.label} must include a responsive viewport.`);
    check(!/user-scalable\s*=\s*no|maximum-scale\s*=\s*1/i.test(viewport), `${page.label} must not disable pinch zoom.`);
    check(html.includes('class="skip-link"') && html.includes('href="#main"'), `${page.label} must include a skip link to main content.`);
    check(html.includes('<main id="main"'), `${page.label} must include the main landmark.`);
    check(!/<(?:form|input|textarea)\b/i.test(html), `${page.label} must not render contact form controls.`);
    check(html.includes(expectedLaunch.whatsappUrl), `${page.label} must include production WhatsApp URL ${expectedLaunch.whatsappUrl}.`);
    check(html.includes(expectedLaunch.instagramUrl), `${page.label} must include production Instagram URL ${expectedLaunch.instagramUrl}.`);
    check(!/https?:\/\/[^"'`\s]*\.example\b/i.test(html), `${page.label} must not include a reserved .example domain.`);
    check(!/1234[-\s]?5678/.test(html), `${page.label} must not include a sample WhatsApp display.`);
    check(!/(?:instagram\.com\/[^"'`\s]*\.ba\b|@[^"'`\s]*\.ba\b)/i.test(html), `${page.label} must not include the old placeholder Instagram handle.`);
    check(!html.includes("og-rental-led.svg"), `${page.label} must not use the SVG-only OG fallback.`);
    check(getMetaContent(metas, "property", "og:image") === expectedLaunch.ogImageUrl, `${page.label} must use PNG OG image ${expectedLaunch.ogImageUrl}.`);
    check(getMetaContent(metas, "property", "og:image:type") === expectedLaunch.ogImageType, `${page.label} OG image type must be ${expectedLaunch.ogImageType}.`);
    check(Number(getMetaContent(metas, "property", "og:image:width")) === expectedLaunch.ogImageWidth, `${page.label} OG image width must be ${expectedLaunch.ogImageWidth}.`);
    check(Number(getMetaContent(metas, "property", "og:image:height")) === expectedLaunch.ogImageHeight, `${page.label} OG image height must be ${expectedLaunch.ogImageHeight}.`);
    check(getMetaContent(metas, "name", "twitter:image") === expectedLaunch.ogImageUrl, `${page.label} must use PNG Twitter image ${expectedLaunch.ogImageUrl}.`);

    for (const { raw, attrs } of images) {
      check("alt" in attrs, `${page.label} image is missing alt text: ${raw}`);
      check("width" in attrs && "height" in attrs, `${page.label} image must include width and height: ${raw}`);
    }

    for (const button of buttons) {
      check(button.text || button.attrs["aria-label"], `${page.label} button must have visible text or aria-label.`);
    }
  }
};

const validateCrawlerFriendlyOgAsset = () => {
  for (const filePath of [join(rootDir, "public/og-rental-led.png"), join(distDir, "og-rental-led.png")]) {
    const dimensions = readPngDimensions(filePath, "OG image");

    if (!dimensions) continue;

    check(
      dimensions.width === expectedLaunch.ogImageWidth && dimensions.height === expectedLaunch.ogImageHeight,
      `${toProjectPath(filePath)} must be ${expectedLaunch.ogImageWidth}x${expectedLaunch.ogImageHeight}; found ${dimensions.width}x${dimensions.height}.`
    );
  }
};

const validateSourceMarkup = () => {
  const sourceFiles = walkFiles(sourceDir, (filePath) => [".astro", ".ts", ".css"].includes(extname(filePath)));

  for (const filePath of sourceFiles) {
    const source = readFileSync(filePath, "utf8");
    check(!/transition\s*:\s*all\b|transition-all/i.test(source), `${toProjectPath(filePath)} must not use transition: all.`);
    check(!/outline\s*:\s*(?:none|0)\b/i.test(source), `${toProjectPath(filePath)} must not remove outlines without a visible replacement.`);
    check(!/<(?:form|input|textarea)\b/i.test(source), `${toProjectPath(filePath)} must not include contact form controls.`);
  }
};

const validateCssMotionAndResponsiveHooks = () => {
  const css = readRequired(join(sourceDir, "styles/global.css"), "global CSS");
  if (!css) return;

  const transitionDeclarations = [...css.matchAll(/transition\s*:\s*([^;]+)/gi)].map((match) => match[1]);
  const layoutTransition = transitionDeclarations.find((value) => /\b(?:width|height|top|right|bottom|left|margin|padding)\b/i.test(value));

  check(css.includes("@media (prefers-reduced-motion: reduce)"), "global CSS must include a reduced-motion media query.");
  check(!layoutTransition, `global CSS must not transition layout-heavy properties: ${layoutTransition ?? ""}`);
  check(css.includes("overflow-x: hidden"), "global CSS must guard against horizontal overflow.");
  check(css.includes("min-width: 320px"), "global CSS must preserve the 320px minimum responsive target.");
  check(css.includes(".site-header[data-nav-ready=\"true\"] .site-nav"), "global CSS must keep the mobile nav visible when menu JavaScript is unavailable.");
  check(css.includes(".brand-link { min-width: 0; min-height: 44px"), "brand link must meet the 44px hit-area target.");
  check(css.includes(".nav-links a { min-height: 44px"), "nav links must meet the 44px hit-area target.");
  check(css.includes(".faq-item summary { min-height: 44px"), "FAQ summaries must meet the 44px hit-area target.");
  check(css.includes(".site-footer a { min-height: 44px; min-inline-size: 44px"), "footer links must meet the 44x44 hit-area target.");
};

const validateKeyboardHooks = () => {
  const navSource = readRequired(join(sourceDir, "scripts/nav.ts"), "mobile nav script");
  if (!navSource) return;

  check(navSource.includes('root.dataset.navReady = "true"'), "mobile nav must only hide the fallback menu after JavaScript is bound.");
  check(navSource.includes('event.key === "Escape"'), "mobile nav must close on Escape.");
  check(navSource.includes('event.key !== "Tab"'), "mobile nav must trap Tab focus while open.");
  check(navSource.includes("toggle.focus()"), "mobile nav must restore focus to the toggle after Escape.");
};

const validateClientJsBudget = () => {
  const jsFiles = walkFiles(distDir, (filePath) => extname(filePath) === ".js");
  const externalGzipBytes = jsFiles.reduce((total, filePath) => total + gzipSync(readFileSync(filePath)).length, 0);
  const inlineGzipBytesByPage = ["index.html", "en/index.html"].map((file) => {
    const html = readRequired(join(distDir, file), `${file} for inline JS budget`);
    const clientScripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
      .filter((match) => parseAttributes(match[1]).type !== "application/ld+json")
      .map((match) => match[2].trim())
      .filter(Boolean);

    return clientScripts.reduce((total, script) => total + gzipSync(Buffer.from(script)).length, 0);
  });
  const inlineGzipBytes = Math.max(0, ...inlineGzipBytesByPage);
  const gzipBytes = externalGzipBytes + inlineGzipBytes;
  const budgetBytes = 50 * 1024;

  check(gzipBytes < budgetBytes, `client JS must stay below 50KB gzipped; found ${gzipBytes} bytes across ${jsFiles.length} external file(s) plus inline scripts.`);

  return { gzipBytes, fileCount: jsFiles.length, inlineGzipBytes };
};

const validateNoGsapBaseline = () => {
  const packageJson = readRequired(join(rootDir, "package.json"), "package.json");
  const sourceFiles = walkFiles(sourceDir, (filePath) => [".astro", ".ts"].includes(extname(filePath)));
  const sourceIncludesGsap = sourceFiles.some((filePath) => readFileSync(filePath, "utf8").includes("gsap"));

  check(!packageJson.includes('"gsap"'), "GSAP must not be added for the CSS-only motion baseline.");
  check(!sourceIncludesGsap, "Source files must not import GSAP for the CSS-only motion baseline.");
};

validateBuiltHtml();
validateSourceMarkup();
validateCssMotionAndResponsiveHooks();
validateCrawlerFriendlyOgAsset();
validateKeyboardHooks();
const jsBudget = validateClientJsBudget();
validateNoGsapBaseline();

if (failures.length > 0) {
  console.error(`Final check failed with ${failures.length} issue(s):`);

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exit(1);
}

console.log(`Final check passed: a11y/static motion/launch checks passed; client JS is ${jsBudget.gzipBytes} bytes gzipped (${jsBudget.fileCount} external file(s), ${jsBudget.inlineGzipBytes} inline bytes).`);
