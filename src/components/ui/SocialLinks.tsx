import { useSiteSettings } from "#/siteSettings.js";
import { SocialIcon } from "./SocialIcon";

/** Social media icon row. Renders nothing until URLs are configured in Sanity
 *  ("Configuración del sitio" → Redes sociales). */
export function SocialLinks({ className = "" }: { className?: string }) {
	const { socialLinks } = useSiteSettings();
	if (!socialLinks?.length) return null;
	return (
		<div className={`flex items-center gap-3 ${className}`}>
			{socialLinks.map((s) => (
				<a
					key={s.platform}
					href={s.url}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={s.platform}
					className="text-text-muted transition-colors duration-200 hover:text-primary-600"
				>
					<SocialIcon platform={s.platform} size={18} />
				</a>
			))}
		</div>
	);
}
