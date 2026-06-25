export function Eyebrow({
	children,
	light = false,
}: {
	children: React.ReactNode;
	light?: boolean;
}) {
	if (light) {
		return (
			<p className="mb-4 inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.18em] text-white/65">
				<span className="h-px w-7 bg-white/50" />
				{children}
			</p>
		);
	}
	return (
		<p className="mb-3 inline-flex items-center gap-2 bg-primary-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-primary-700">
			<span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
			{children}
		</p>
	);
}
