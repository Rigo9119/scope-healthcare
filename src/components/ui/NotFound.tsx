import { Link } from "@tanstack/react-router";
import { useLang } from "#/i18n";

export default function NotFound() {
	const { locale } = useLang();
	return (
		<section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
			<p className="font-heading text-6xl font-extrabold text-primary-500">
				404
			</p>
			<h2 className="mt-4 font-heading text-2xl font-bold text-text-primary">
				{locale === "en" ? "Page not found" : "Página no encontrada"}
			</h2>
			<p className="mt-2 text-text-secondary">
				{locale === "en"
					? "The page you're looking for doesn't exist."
					: "La página que buscas no existe."}
			</p>
			<Link
				to="/$lang"
				params={{ lang: locale }}
				className="mt-8 inline-flex bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-btn-primary transition hover:bg-primary-600"
			>
				{locale === "en" ? "Back home" : "Volver al inicio"}
			</Link>
		</section>
	);
}
