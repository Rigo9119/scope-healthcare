import { type LucideIcon, UserRound } from "lucide-react";

// A soft, intentional image placeholder (calming clinic photography goes here).
export function ImagePlaceholder({
	className = "",
	icon: Icon = UserRound,
}: {
	className?: string;
	icon?: LucideIcon;
}) {
	return (
		<div
			className={`relative flex items-center justify-center overflow-hidden ${className}`}
			style={{
				background:
					"linear-gradient(150deg, #b3e8e8 0%, #4dcaca 55%, #009999 100%)",
			}}
		>
			<Icon size={80} className="text-white/70" strokeWidth={1.25} />
			<span className="absolute bottom-3 right-4 bg-white/85 px-3 py-1 text-[11px] font-semibold text-primary-700">
				Imagen
			</span>
		</div>
	);
}
