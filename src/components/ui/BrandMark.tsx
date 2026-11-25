// The colour logo's swirl uses a multiply blend and a white centre, so it only
// reads on white; dark surfaces get the white variant.
export function BrandMark({ tone = "dark" }: { tone?: "dark" | "light" }) {
	return (
		<img
			src={tone === "light" ? "/logo-scope-white.webp" : "/logo-scope.webp"}
			alt="Scope Healthcare"
			width={390}
			height={96}
			className="h-10 w-auto lg:h-12"
		/>
	);
}
