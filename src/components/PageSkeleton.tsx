function Skel({ className = "" }: { className?: string }) {
	return <div className={`animate-pulse bg-neutral-200 ${className}`} />;
}

export function PageSkeleton() {
	return (
		// Navbar/Footer are persistent chrome from the root layout — the
		// skeleton only stands in for the page content inside <Outlet />.
		<div>
			{/* Hero */}
			<div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-primary-800 sm:min-h-[90vh]">
				<div className="relative w-full max-w-2xl px-5 py-12 text-center sm:py-20">
					<Skel className="mx-auto mb-6 h-5 w-44 bg-white/20" />
					<Skel className="mx-auto mb-3 h-10 w-full bg-white/20 sm:h-14" />
					<Skel className="mx-auto mb-6 h-10 w-3/4 bg-white/20 sm:h-14" />
					<Skel className="mx-auto mb-2 h-5 w-full max-w-md bg-white/20" />
					<Skel className="mx-auto mb-8 h-5 w-2/3 max-w-sm bg-white/20 sm:mb-10" />
					<div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
						<Skel className="h-12 w-full bg-white/25 sm:w-44" />
						<Skel className="h-12 w-full bg-white/15 sm:w-44" />
					</div>
				</div>
			</div>

			{/* Stats band */}
			<div className="border-y border-border-default bg-white px-4 py-8 sm:px-6 sm:py-10">
				<div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
					{["s1", "s2", "s3", "s4"].map((k) => (
						<div
							key={k}
							className="flex flex-col items-center gap-2 text-center sm:flex-row sm:items-center sm:gap-4 sm:text-left"
						>
							<Skel className="h-10 w-10 shrink-0 sm:h-12 sm:w-12" />
							<div className="space-y-2">
								<Skel className="h-7 w-14" />
								<Skel className="h-3 w-20" />
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Specialties */}
			<div className="px-4 py-12 sm:px-6 sm:py-20 lg:py-28">
				<div className="mx-auto max-w-7xl">
					<div className="mx-auto mb-8 max-w-2xl space-y-4 text-center sm:mb-14">
						<Skel className="mx-auto h-7 w-32" />
						<Skel className="mx-auto h-8 w-64 sm:h-10" />
						<Skel className="mx-auto h-5 w-full max-w-sm" />
					</div>
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8"].map((k) => (
							<div
								key={k}
								className="border border-border-default bg-white p-5 sm:p-7"
							>
								<Skel className="h-12 w-12 sm:h-14 sm:w-14" />
								<Skel className="mt-4 h-5 w-3/4 sm:mt-5" />
								<Skel className="mt-3 h-4 w-full" />
								<Skel className="mt-2 h-4 w-5/6" />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
