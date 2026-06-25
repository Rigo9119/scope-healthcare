import { Stethoscope } from "lucide-react";

export function BrandMark({ tone = "dark" }: { tone?: "dark" | "light" }) {
	const text = tone === "light" ? "text-white" : "text-text-primary";
	return (
		<span className="flex items-center gap-2.5">
			<span className="flex h-10 w-10 items-center justify-center bg-primary-500 shadow-[0_6px_16px_rgba(16,89,181,0.35)]">
				<Stethoscope size={20} className="text-white" />
			</span>
			<span className={`font-heading text-lg font-bold tracking-tight ${text}`}>
				Scope<span className="text-primary-500">Health</span>
			</span>
		</span>
	);
}
