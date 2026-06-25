import { IconComponent } from "#/components/Icon.js";
import type { HomePageData } from "#/lib/queries.js";

export function StatsBand({ stats }: { stats: HomePageData["stats"] }) {
	return (
		<section className="border-y border-border-default bg-white">
			<div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-8 sm:gap-6 sm:px-6 sm:py-10 sm:grid-cols-4">
				{stats?.map(({ value, label, icon }) => (
					<div
						key={label}
						className="flex flex-col items-center gap-2 text-center sm:flex-row sm:items-center sm:gap-4 sm:text-left"
					>
						<span className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary-50 sm:h-12 sm:w-12">
							<IconComponent
								name={icon}
								size={20}
								className="text-primary-600"
							/>
						</span>
						<div>
							<p className="font-heading text-2xl font-extrabold text-text-primary">
								{value}
							</p>
							<p className="text-xs text-text-muted">{label}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
