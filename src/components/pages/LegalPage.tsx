import { PageHeader } from "#/components/ui/PageHeader.js";
import { useLang } from "#/i18n.js";
import type { Locale } from "#/lib/localizedRoutes.js";

export type LegalKind = "privacy" | "terms" | "cookies";

// Placeholder legal copy — structure is real so links resolve and the pages are
// indexable; the actual clauses must be reviewed/provided by the client's legal
// team (or moved to Sanity) before launch.
const LEGAL: Record<
	LegalKind,
	Record<
		Locale,
		{ eyebrow: string; title: string; intro: string; body: string[] }
	>
> = {
	privacy: {
		es: {
			eyebrow: "Legal",
			title: "Política de privacidad",
			intro:
				"En Scope Health nos tomamos en serio la protección de tus datos personales.",
			body: [
				"Esta página describirá qué datos personales recopilamos, con qué finalidad los tratamos, la base legal para ello y durante cuánto tiempo los conservamos.",
				"También detallará tus derechos (acceso, rectificación, supresión y oposición) y cómo ejercerlos, así como las medidas de seguridad que aplicamos.",
				"El texto definitivo será revisado y aprobado por el equipo legal antes del lanzamiento. Para cualquier consulta sobre privacidad, escríbenos a través de la página de contacto.",
			],
		},
		en: {
			eyebrow: "Legal",
			title: "Privacy Policy",
			intro:
				"At Scope Health we take the protection of your personal data seriously.",
			body: [
				"This page will describe what personal data we collect, the purposes for which we process it, the legal basis for doing so, and how long we retain it.",
				"It will also detail your rights (access, rectification, erasure and objection) and how to exercise them, along with the security measures we apply.",
				"The final text will be reviewed and approved by the legal team before launch. For any privacy questions, reach us via the contact page.",
			],
		},
	},
	terms: {
		es: {
			eyebrow: "Legal",
			title: "Términos y condiciones",
			intro:
				"Estas condiciones regulan el uso del sitio web y los servicios de Scope Health.",
			body: [
				"Aquí se especificarán las condiciones de uso del sitio, la reserva de citas, las responsabilidades de las partes y las limitaciones aplicables.",
				"El contenido médico de este sitio es informativo y no sustituye una consulta médica presencial con un profesional certificado.",
				"El texto definitivo será revisado y aprobado por el equipo legal antes del lanzamiento.",
			],
		},
		en: {
			eyebrow: "Legal",
			title: "Terms & Conditions",
			intro:
				"These terms govern the use of Scope Health's website and services.",
			body: [
				"This page will set out the conditions for using the site, booking appointments, the responsibilities of each party, and any applicable limitations.",
				"The medical content on this site is informational and does not replace an in-person consultation with a board-certified professional.",
				"The final text will be reviewed and approved by the legal team before launch.",
			],
		},
	},
	cookies: {
		es: {
			eyebrow: "Legal",
			title: "Política de cookies",
			intro:
				"Usamos cookies para que el sitio funcione y para mejorar tu experiencia.",
			body: [
				"Esta página explicará qué cookies utilizamos (técnicas, analíticas y de terceros), su finalidad y su duración.",
				"También describirá cómo puedes aceptar, rechazar o gestionar las cookies desde tu navegador o desde el panel de preferencias.",
				"El texto definitivo será revisado y aprobado por el equipo legal antes del lanzamiento.",
			],
		},
		en: {
			eyebrow: "Legal",
			title: "Cookie Policy",
			intro:
				"We use cookies to make the site work and to improve your experience.",
			body: [
				"This page will explain which cookies we use (essential, analytics and third-party), their purpose and how long they last.",
				"It will also describe how you can accept, reject or manage cookies from your browser or the preferences panel.",
				"The final text will be reviewed and approved by the legal team before launch.",
			],
		},
	},
};

export function LegalPage({ kind }: { kind: LegalKind }) {
	const { locale } = useLang();
	const copy = LEGAL[kind][locale];

	return (
		<>
			<PageHeader
				eyebrow={copy.eyebrow}
				title={copy.title}
				subtitle={copy.intro}
			/>

			<section className="px-4 py-12 sm:px-6 lg:py-20">
				<div className="mx-auto max-w-3xl space-y-5">
					{copy.body.map((paragraph) => (
						<p key={paragraph} className="leading-relaxed text-text-secondary">
							{paragraph}
						</p>
					))}
				</div>
			</section>
		</>
	);
}
