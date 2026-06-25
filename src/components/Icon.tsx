import {
	Award,
	Baby,
	Bone,
	ClipboardCheck,
	Eye,
	HeartPulse,
	Microscope,
	Phone,
	Scale,
	ShieldCheck,
	Smile,
	Sparkles,
	Star,
	Stethoscope,
	UserRound,
} from "lucide-react";

type IconProps = {
	name: string;
	size?: number;
	className?: string;
	strokeWidth?: number;
};

const ICON_MAP: Record<
	string,
	React.ComponentType<{
		size?: number;
		className?: string;
		strokeWidth?: number;
	}>
> = {
	Smile,
	Sparkles,
	Bone,
	Eye,
	HeartPulse,
	Baby,
	Scale,
	Microscope,
	ShieldCheck,
	Award,
	Stethoscope,
	Phone,
	ClipboardCheck,
	UserRound,
	Star,
};

export function IconComponent({
	name,
	size,
	className,
	strokeWidth,
}: IconProps) {
	const Component = ICON_MAP[name] ?? Stethoscope;
	return (
		<Component size={size} className={className} strokeWidth={strokeWidth} />
	);
}
