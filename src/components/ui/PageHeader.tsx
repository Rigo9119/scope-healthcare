import { Eyebrow } from "#/components/ui/Eyebrow.js";

/** Standard top-of-page header used by the inner (non-home) pages. */
export function PageHeader({
	eyebrow,
	title,
	subtitle,
}: {
	eyebrow?: string;
	title: string;
	subtitle?: string;
}) {
	return (
		<section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-bg-page">
			<div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:py-24">
				{eyebrow && (
					<div className="flex justify-center">
						<Eyebrow>{eyebrow}</Eyebrow>
					</div>
				)}
				<h1 className="font-heading text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
					{title}
				</h1>
				{subtitle && (
					<p className="mx-auto mt-4 max-w-2xl text-text-secondary sm:text-lg">
						{subtitle}
					</p>
				)}
			</div>
		</section>
	);
}
