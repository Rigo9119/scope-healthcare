import { Link } from "@tanstack/react-router";
import {
	ArrowLeft,
	Check,
	ClipboardList,
	HeartPulse,
	ListChecks,
} from "lucide-react";
import { IconComponent } from "#/components/Icon.js";
import { BookingCta } from "#/components/ui/BookingCta.js";
import { Eyebrow } from "#/components/ui/Eyebrow.js";
import { ImagePlaceholder } from "#/components/ui/ImagePlaceholder.js";
import { PageHeader } from "#/components/ui/PageHeader.js";
import { useLang } from "#/i18n.js";
import type { PillarItemContent } from "#/lib/pillarContent.js";
import { PILLAR_UI, type Pillar, type PillarItem } from "#/lib/pillars.js";

type Program = NonNullable<PillarItemContent["programs"]>[number];

/** Pillar item detail page (wireframe 1.2 / 2.2 / 3.2). Every content block is
 *  optional and renders only when the item has it, so the same template serves
 *  a full specialty (Gastroenterología) and a one-paragraph one (Nutrición). */
export function PillarItemPage({
	pillar,
	item,
	content,
}: {
	pillar: Pillar;
	item: PillarItem;
	content: PillarItemContent;
}) {
	const { locale } = useLang();
	const ui = PILLAR_UI[locale];
	const { intro, audience, lists, programs, steps, approach, cta } = content;

	return (
		<>
			<PageHeader
				eyebrow={content.tagline ?? pillar.title[locale]}
				title={item.title[locale]}
				subtitle={content.summary}
			/>

			{/* Intro split: visual left, icon + intro right. */}
			<section className="px-4 py-12 sm:px-6 lg:py-20">
				<div className="mx-auto max-w-6xl">
					<Link
						to="/$lang/$section/"
						params={{ lang: locale, section: pillar.slug }}
						className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-colors duration-200 hover:text-primary-700"
					>
						<ArrowLeft size={16} />
						<span className="link-animated">
							{ui.backTo(pillar.title[locale])}
						</span>
					</Link>

					<div className="mt-8 grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
						<ImagePlaceholder className="aspect-[4/3] w-full lg:sticky lg:top-28" />
						{/* Centred so a one-line intro doesn't leave a gap under it. */}
						<div className="lg:self-center">
							<span className="inline-flex h-12 w-12 items-center justify-center bg-primary-50">
								<IconComponent
									name={item.icon}
									size={24}
									className="text-primary-600"
								/>
							</span>
							{(intro?.length ? intro : [ui.programBody]).map((p) => (
								<p
									key={p}
									className="mt-5 leading-relaxed text-text-secondary sm:text-lg"
								>
									{p}
								</p>
							))}
						</div>
					</div>
				</div>
			</section>

			{steps?.length ? (
				<section className="bg-bg-section px-4 py-16 sm:px-6 lg:py-24">
					<div className="mx-auto max-w-7xl">
						<SectionHeading eyebrow={ui.stepsEyebrow} title={ui.stepsTitle} />
						<ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
							{steps.map((step, i) => (
								<li
									key={step.title}
									className="flex flex-col border border-border-default bg-white p-6 shadow-sm"
								>
									<span className="font-heading text-3xl font-extrabold text-primary-200">
										{String(i + 1).padStart(2, "0")}
									</span>
									<h3 className="mt-4 font-heading text-lg font-bold text-text-primary">
										{step.title}
									</h3>
									{step.subtitle && (
										<p className="mt-1 text-sm font-semibold text-primary-600">
											{step.subtitle}
										</p>
									)}
									<p className="mt-3 text-sm leading-relaxed text-text-secondary">
										{step.body}
									</p>
								</li>
							))}
						</ol>
					</div>
				</section>
			) : null}

			{/* Audience opens the grey band; the lists join it (pt-0) so they read as one block. */}
			{audience && (
				<section
					className={`bg-bg-section px-4 pt-16 sm:px-6 lg:pt-24 ${lists?.length ? "" : "pb-16 lg:pb-24"}`}
				>
					<div
						className={`mx-auto flex flex-col gap-5 p-6 shadow-card sm:flex-row sm:gap-6 sm:p-8 lg:p-10 ${lists?.length === 1 ? "max-w-3xl" : "max-w-6xl"}`}
						style={{
							background:
								"linear-gradient(120deg, #1059b5 0%, #0b78b0 55%, #009999 100%)",
						}}
					>
						<span className="flex h-12 w-12 shrink-0 items-center justify-center bg-white text-primary-600 shadow-sm">
							<HeartPulse size={24} aria-hidden />
						</span>
						<div>
							<h2 className="font-heading text-xl font-bold text-white sm:text-2xl">
								{audience.title}
							</h2>
							<p className="mt-3 max-w-4xl leading-relaxed text-white/90">
								{audience.body}
							</p>
						</div>
					</div>
				</section>
			)}

			{lists?.length ? (
				<section
					className={`bg-bg-section px-4 pb-16 sm:px-6 lg:pb-24 ${audience ? "pt-6" : "pt-16 lg:pt-24"}`}
				>
					<div
						className={`mx-auto grid gap-6 ${lists.length > 1 ? "max-w-6xl md:grid-cols-2" : "max-w-3xl"}`}
					>
						{lists.map((list, i) => {
							const ListIcon = i % 2 ? ListChecks : ClipboardList;
							return (
								<div
									key={list.title}
									className="border border-t-4 border-border-default border-t-primary-500 bg-white p-6 shadow-sm transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card sm:p-8"
								>
									<div className="flex items-center gap-4">
										<span className="flex h-11 w-11 shrink-0 items-center justify-center bg-primary-50 text-primary-600">
											<ListIcon size={22} aria-hidden />
										</span>
										<h2 className="font-heading text-xl font-bold text-text-primary">
											{list.title}
										</h2>
									</div>
									<CheckList items={list.items} className="mt-6" />
								</div>
							);
						})}
					</div>
				</section>
			) : null}

			{programs?.length ? (
				<section className="px-4 py-16 sm:px-6 lg:py-24">
					<div className="mx-auto max-w-6xl">
						<SectionHeading
							eyebrow={ui.programsEyebrow}
							title={ui.programsTitle}
						/>
						<div className="mt-10 grid gap-6 lg:grid-cols-2">
							{programs.map((program) => (
								<ProgramCard
									key={program.name}
									program={program}
									includesLabel={ui.programIncludes}
								/>
							))}
						</div>
					</div>
				</section>
			) : null}

			{approach && (
				<section className="px-4 py-16 sm:px-6 lg:py-24">
					<div className="mx-auto max-w-3xl text-center">
						<Eyebrow>{approach.title}</Eyebrow>
						<p className="mt-2 font-heading text-lg leading-relaxed font-medium text-text-primary sm:text-xl">
							{approach.body}
						</p>
					</div>
				</section>
			)}

			<BookingCta
				eyebrow={cta?.eyebrow}
				title={cta?.title ?? ui.bookTitle}
				subtitle={cta?.body ?? ui.bookSubtitle}
				cta={cta?.label ?? ui.bookCta}
			/>
		</>
	);
}

function SectionHeading({
	eyebrow,
	title,
}: {
	eyebrow: string;
	title: string;
}) {
	return (
		<div className="text-center">
			<Eyebrow>{eyebrow}</Eyebrow>
			<h2 className="font-heading text-2xl font-extrabold text-text-primary sm:text-3xl">
				{title}
			</h2>
		</div>
	);
}

function CheckList({
	items,
	className = "",
}: {
	items: string[];
	className?: string;
}) {
	return (
		<ul className={`space-y-3 ${className}`}>
			{items.map((text) => (
				<li key={text} className="flex gap-3 text-text-secondary">
					{/* em-sized so the badge centres on the first line at text-base and text-sm. */}
					<span className="mt-[0.2em] flex h-[1.25em] w-[1.25em] shrink-0 items-center justify-center bg-primary-500 text-white">
						<Check
							className="h-[0.8em] w-[0.8em]"
							strokeWidth={3}
							aria-hidden
						/>
					</span>
					<span className="leading-relaxed">{text}</span>
				</li>
			))}
		</ul>
	);
}

function ProgramCard({
	program,
	includesLabel,
}: {
	program: Program;
	includesLabel: string;
}) {
	const hasBody = Boolean(program.steps?.length || program.features?.length);
	return (
		<article
			className={`flex flex-col border border-border-default bg-white shadow-sm ${hasBody ? "" : "self-start"}`}
		>
			<header
				className={`bg-primary-50 p-6 sm:p-8 ${hasBody ? "border-b border-border-default" : ""}`}
			>
				<h3 className="font-heading text-2xl font-extrabold text-text-primary">
					{program.name}
				</h3>
				{program.subtitle && (
					<p className="mt-1 text-xs font-bold tracking-[0.12em] text-primary-600 uppercase">
						{program.subtitle}
					</p>
				)}
				{program.description && (
					<p className="mt-3 leading-relaxed text-text-secondary">
						{program.description}
					</p>
				)}
			</header>

			{hasBody ? (
				<div className="flex flex-1 flex-col gap-6 p-6 sm:p-8">
					{program.steps?.length ? (
						<ol className="divide-y divide-border-default">
							{program.steps.map((step, i) => (
								<li
									key={step.title}
									className="flex gap-4 py-4 first:pt-0 last:pb-0"
								>
									{program.steps && program.steps.length > 1 && (
										<span className="flex h-8 w-8 shrink-0 items-center justify-center bg-primary-500 font-heading text-sm font-bold text-white">
											{i}
										</span>
									)}
									<div className="min-w-0 flex-1">
										<div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
											<h4 className="font-heading font-bold text-text-primary">
												{step.title}
											</h4>
											{step.price && (
												<span className="font-heading font-bold whitespace-nowrap text-primary-700">
													{step.price}
												</span>
											)}
										</div>
										{step.details?.length ? (
											<ul className="mt-1.5 space-y-1 text-sm leading-relaxed text-text-secondary">
												{step.details.map((d) => (
													<li key={d}>{d}</li>
												))}
											</ul>
										) : null}
									</div>
								</li>
							))}
						</ol>
					) : null}

					{program.features?.length ? (
						<div className="mt-auto border-t border-border-default pt-6">
							<p className="text-xs font-bold tracking-[0.12em] text-text-muted uppercase">
								{includesLabel}
							</p>
							<CheckList items={program.features} className="mt-3 text-sm" />
						</div>
					) : null}
				</div>
			) : null}
		</article>
	);
}
