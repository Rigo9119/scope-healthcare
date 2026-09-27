import {
	Facebook,
	Instagram,
	Linkedin,
	Link as LinkIcon,
	Twitter,
	Youtube,
} from "lucide-react";

const SOCIAL_MAP: Record<
	string,
	React.ComponentType<{ size?: number; className?: string }>
> = {
	instagram: Instagram,
	facebook: Facebook,
	twitter: Twitter,
	x: Twitter,
	youtube: Youtube,
	linkedin: Linkedin,
};

/** Resolves a social platform name to its brand glyph; falls back to a link
 *  icon for unknown platforms. */
export function SocialIcon({
	platform,
	size = 18,
	className,
}: {
	platform: string;
	size?: number;
	className?: string;
}) {
	const Icon = SOCIAL_MAP[platform.toLowerCase()] ?? LinkIcon;
	return <Icon size={size} className={className} />;
}
