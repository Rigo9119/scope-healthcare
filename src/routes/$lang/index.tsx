import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { PageSkeleton } from "#/components/PageSkeleton.js";
import { CareJourney } from "#/components/sections/CareJourney.js";
import { CtaBand } from "#/components/sections/CtaBand.js";
import { Hero } from "#/components/sections/Hero.js";
import { Specialties } from "#/components/sections/Specialties.js";
import { StatsBand } from "#/components/sections/StatsBand.js";
import { Testimonials } from "#/components/sections/Testimonials.js";
import { WhyUs } from "#/components/sections/WhyUs.js";
import { FALLBACK } from "#/lib/homeFallback.js";
import { homePageQueryOptions } from "#/lib/queries.js";
import { HOME_SEO, seoHead } from "#/lib/seo.js";

export const Route = createFileRoute("/$lang/")({
	loader: async ({ context: { queryClient }, params }) => {
		try {
			return await Promise.race([
				queryClient.ensureQueryData(homePageQueryOptions(params.lang)),
				new Promise<null>((resolve) => setTimeout(() => resolve(null), 4000)),
			]);
		} catch {
			return null;
		}
	},
	head: ({ params, loaderData }) => {
		const locale = params.lang === "en" ? "en" : "es";
		const seo = loaderData?.seo;
		return seoHead({
			locale,
			path: "",
			title: seo?.seoTitle || HOME_SEO[locale].title,
			description: seo?.seoDescription || HOME_SEO[locale].description,
			image: seo?.ogImage || undefined,
		});
	},
	pendingComponent: PageSkeleton,
	component: Home,
});

function Home() {
	const { lang } = Route.useParams();
	const { data } = useSuspenseQuery(homePageQueryOptions(lang));
	const page = data ?? FALLBACK;

	return (
		<>
			<Hero hero={page.hero} />
			<StatsBand stats={page.stats} />
			<Specialties
				specialtiesEyebrow={page.specialtiesEyebrow}
				specialtiesTitle={page.specialtiesTitle}
				specialtiesSubtitle={page.specialtiesSubtitle}
				specialtiesLinkLabel={page.specialtiesLinkLabel}
				specialties={page.specialties}
			/>
			<CareJourney
				processEyebrow={page.processEyebrow}
				processTitle={page.processTitle}
				journey={page.journey}
			/>
			<WhyUs
				whyUsEyebrow={page.whyUsEyebrow}
				whyUsTitle={page.whyUsTitle}
				whyUsSubtitle={page.whyUsSubtitle}
				whyUsBadgeText={page.whyUsBadgeText}
				reasons={page.reasons}
			/>
			<Testimonials
				testimonialsEyebrow={page.testimonialsEyebrow}
				testimonialsTitle={page.testimonialsTitle}
				testimonials={page.testimonials}
			/>
			<CtaBand
				ctaEyebrow={page.ctaEyebrow}
				ctaTitle={page.ctaTitle}
				ctaSubtitle={page.ctaSubtitle}
				ctaPrimaryLabel={page.ctaPrimaryLabel}
				ctaPhone={page.ctaPhone}
			/>
		</>
	);
}
