import { Newspaper } from "lucide-react";
import { ImagePlaceholder } from "#/components/ui/ImagePlaceholder.js";
import { PageHeader } from "#/components/ui/PageHeader.js";

// Placeholder posts — real articles will come from Sanity later.
const POSTS = [
	{
		title: "Título del artículo",
		excerpt: "Breve descripción del artículo que aparecerá aquí.",
		date: "Jun 2026",
	},
	{
		title: "Título del artículo",
		excerpt: "Breve descripción del artículo que aparecerá aquí.",
		date: "Jun 2026",
	},
	{
		title: "Título del artículo",
		excerpt: "Breve descripción del artículo que aparecerá aquí.",
		date: "May 2026",
	},
];

export function BlogPage() {
	return (
		<>
			<PageHeader
				eyebrow="Blog"
				title="Guías y artículos de salud"
				subtitle="Información útil sobre turismo médico, tratamientos y bienestar."
			/>

			<section className="px-4 py-16 sm:px-6 lg:py-24">
				<div className="mx-auto max-w-7xl">
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{POSTS.map((post, i) => (
							<article
								key={`${post.title}-${i}`}
								className="flex flex-col overflow-hidden border border-border-default bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-card"
							>
								<ImagePlaceholder
									icon={Newspaper}
									className="aspect-[16/9] w-full"
								/>
								<div className="flex flex-1 flex-col p-6">
									<span className="text-xs font-semibold uppercase tracking-wide text-primary-600">
										{post.date}
									</span>
									<h3 className="mt-2 font-heading text-lg font-bold text-text-primary">
										{post.title}
									</h3>
									<p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
										{post.excerpt}
									</p>
								</div>
							</article>
						))}
					</div>
					<p className="mt-12 text-center text-sm text-text-muted">
						Próximamente más artículos.
					</p>
				</div>
			</section>
		</>
	);
}
