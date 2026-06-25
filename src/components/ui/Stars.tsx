import { Star } from "lucide-react";

export function Stars({ count }: { count: number }) {
	return (
		<span className="flex gap-0.5">
			{Array.from({ length: count }).map((_, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: static star rating
				<Star key={i} size={15} className="fill-amber-400 text-amber-400" />
			))}
		</span>
	);
}
