import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageSkeleton } from "#/components/PageSkeleton.js";
import { CareJourney } from "#/components/sections/CareJourney.js";
import { CtaBand } from "#/components/sections/CtaBand.js";
import { Hero } from "#/components/sections/Hero.js";
import { Specialties } from "#/components/sections/Specialties.js";
import { StatsBand } from "#/components/sections/StatsBand.js";
import { Testimonials } from "#/components/sections/Testimonials.js";
import { WhyUs } from "#/components/sections/WhyUs.js";
import { useLang } from "#/i18n.js";
import { FALLBACK } from "#/lib/homeFallback.js";
import { fetchHomePage, type HomePageData } from "#/lib/queries.js";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	const { locale } = useLang();
	const [page, setPage] = useState<HomePageData>(FALLBACK);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		fetchHomePage(locale)
			.then((data) => {
				if (data) setPage(data);
			})
			.catch(() => {})
			.finally(() => setLoading(false));
	}, [locale]);

	if (loading) return <PageSkeleton />;

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
