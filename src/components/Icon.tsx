import {
	Activity,
	Apple,
	Award,
	Baby,
	Bone,
	Brain,
	Briefcase,
	ClipboardCheck,
	CreditCard,
	Droplets,
	Dumbbell,
	Eye,
	HeartPulse,
	Leaf,
	Microscope,
	Phone,
	Salad,
	Scale,
	ShieldCheck,
	Smile,
	Sparkles,
	Star,
	Stethoscope,
	UserRound,
	Video,
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
	Activity,
	Apple,
	Brain,
	Briefcase,
	CreditCard,
	Droplets,
	Dumbbell,
	Leaf,
	Salad,
	Video,
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
