// SSG / prerender step. Runs AFTER `vite build`.
//
// Serves the built `dist/` locally, opens each locale route in headless Chrome,
// lets the app render (the route loader fetches Sanity — or falls back), and
// snapshots the finished HTML (content + per-locale <head> meta) to
// `dist/<locale>/index.html`. Netlify then serves those static files, so
// crawlers and link-preview scrapers (WhatsApp/Facebook) get real HTML.
//
// Re-run on every deploy; pair with a Sanity → Netlify build hook so content
// edits trigger a rebuild (see CLAUDE.md → Deployment).
import { createServer } from "node:http";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";
import puppeteer from "puppeteer";

const DIST = "dist";
// Keep in sync with src/lib/localizedRoutes.ts (SECTIONS) + sitemap.xml.
const ROUTES = [
	"/es",
	"/en",
	"/es/nuestros-servicios",
	"/en/our-services",
	"/es/nuestro-equipo",
	"/en/our-team",
	"/es/blog",
	"/en/blog",
	"/es/sobre-nosotros",
	"/en/about-us",
	"/es/contacto",
	"/en/contact",
];
const PORT = 4178;
// Every page renders an <h1> inside <main> once the real content is mounted
// (the home skeleton has none), so this is a universal "content ready" signal.
const CONTENT_READY_SELECTOR = "main h1";

const MIME = {
	".html": "text/html; charset=utf-8",
	".js": "text/javascript",
	".mjs": "text/javascript",
	".css": "text/css",
	".json": "application/json",
	".svg": "image/svg+xml",
	".png": "image/png",
	".jpg": "image/jpeg",
	".webp": "image/webp",
	".ico": "image/x-icon",
	".woff2": "font/woff2",
	".woff": "font/woff",
	".xml": "application/xml",
	".txt": "text/plain",
};

// Minimal static file server with SPA fallback to index.html.
function startServer() {
	const server = createServer(async (req, res) => {
		const urlPath = decodeURIComponent((req.url ?? "/").split("?")[0]);
		let filePath = join(DIST, urlPath);
		let body;
		try {
			body = await readFile(filePath);
		} catch {
			filePath = join(DIST, "index.html");
			body = await readFile(filePath);
		}
		res.setHeader(
			"Content-Type",
			MIME[extname(filePath)] ?? "application/octet-stream",
		);
		res.end(body);
	});
	return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

async function run() {
	const server = await startServer();
	const browser = await puppeteer.launch({
		headless: true,
		args: ["--no-sandbox", "--disable-setuid-sandbox"],
	});

	try {
		for (const route of ROUTES) {
			const page = await browser.newPage();
			page.on("pageerror", (e) =>
				console.error(`  [page error @ ${route}] ${e.message}`),
			);
			await page.goto(`http://localhost:${PORT}${route}`, {
				waitUntil: "domcontentloaded",
				timeout: 30000,
			});
			await page.waitForSelector(CONTENT_READY_SELECTOR, { timeout: 30000 });
			// Let any in-flight data/meta settle (don't fail if it never idles).
			await page
				.waitForNetworkIdle({ idleTime: 500, timeout: 5000 })
				.catch(() => {});

			const html = `<!doctype html>\n${await page.evaluate(
				() => document.documentElement.outerHTML,
			)}`;
			const outDir = join(DIST, route.slice(1));
			await mkdir(outDir, { recursive: true });
			await writeFile(join(outDir, "index.html"), html);
			console.log(`✓ prerendered ${route} → ${outDir}/index.html`);
			await page.close();
		}
	} finally {
		await browser.close();
		server.close();
	}
}

run().catch((err) => {
	console.error("Prerender failed:", err);
	process.exit(1);
});
