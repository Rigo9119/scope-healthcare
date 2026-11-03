import { Link } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLang } from "#/i18n.js";
import {
	buildSearchIndex,
	type SearchEntry,
	searchEntries,
} from "#/lib/search.js";
import { m } from "#/paraglide/messages.js";

const COPY = {
	es: { dialog: "Búsqueda en el sitio", input: "Buscar en el sitio" },
	en: { dialog: "Site search", input: "Search the site" },
} as const;

/** Full-site search overlay. Opens from the header (button or Cmd/Ctrl+K),
 *  filters the client-side index, and links to any route. */
export function SearchDialog({
	open,
	onClose,
}: {
	open: boolean;
	onClose: () => void;
}) {
	const { locale } = useLang();
	const [query, setQuery] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);
	const panelRef = useRef<HTMLDivElement>(null);
	const copy = COPY[locale];
	// Callers pass an inline onClose; a ref keeps the open/close effect from
	// re-running (and bouncing focus) on every parent render.
	const onCloseRef = useRef(onClose);
	onCloseRef.current = onClose;
	const index = useMemo(() => buildSearchIndex(locale), [locale]);
	const results = useMemo(() => searchEntries(index, query), [index, query]);

	useEffect(() => {
		if (!open) {
			setQuery("");
			return;
		}
		// Remember the opener (button or Cmd/Ctrl+K origin) to restore focus on close.
		const opener = document.activeElement as HTMLElement | null;
		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		inputRef.current?.focus();
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				e.preventDefault();
				onCloseRef.current();
				return;
			}
			if (e.key !== "Tab" || !panelRef.current) return;
			const focusables = panelRef.current.querySelectorAll<HTMLElement>(
				'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
			);
			if (focusables.length === 0) return;
			const first = focusables[0];
			const last = focusables[focusables.length - 1];
			const active = document.activeElement;
			if (
				e.shiftKey &&
				(active === first || !panelRef.current.contains(active))
			) {
				e.preventDefault();
				last.focus();
			} else if (
				!e.shiftKey &&
				(active === last || !panelRef.current.contains(active))
			) {
				e.preventDefault();
				first.focus();
			}
		};
		window.addEventListener("keydown", onKey);
		return () => {
			window.removeEventListener("keydown", onKey);
			document.body.style.overflow = prevOverflow;
			opener?.focus?.();
		};
	}, [open]);

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-20 sm:pt-28">
			<button
				type="button"
				aria-label={m.search_close()}
				tabIndex={-1}
				onClick={onClose}
				className="absolute inset-0 h-full w-full cursor-default bg-black/40"
			/>
			<div
				ref={panelRef}
				role="dialog"
				aria-modal="true"
				aria-label={copy.dialog}
				className="relative w-full max-w-xl border border-border-default bg-white shadow-2xl"
			>
				<div className="flex items-center gap-3 border-b border-border-default px-4">
					<Search
						size={18}
						aria-hidden="true"
						className="shrink-0 text-text-muted"
					/>
					<input
						ref={inputRef}
						aria-label={copy.input}
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder={m.search_placeholder()}
						className="flex-1 bg-transparent py-4 text-text-primary outline-none placeholder:text-text-muted"
					/>
					<button
						type="button"
						onClick={onClose}
						aria-label={m.search_close()}
						className="shrink-0 text-text-muted transition-colors hover:text-text-primary"
					>
						<X size={18} />
					</button>
				</div>

				<div className="max-h-80 overflow-y-auto">
					{query && results.length === 0 && (
						<p className="px-4 py-6 text-center text-sm text-text-secondary">
							{m.search_no_results()}
						</p>
					)}
					<ul>
						{results.map((r) => (
							<li key={`${r.kind}-${r.group}-${r.title}`}>
								<SearchResultLink entry={r} onNavigate={onClose} />
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}

const resultCls =
	"flex flex-col gap-0.5 border-b border-border-default px-4 py-3 transition-colors hover:bg-primary-50";

function SearchResultLink({
	entry,
	onNavigate,
}: {
	entry: SearchEntry;
	onNavigate: () => void;
}) {
	const { locale } = useLang();
	const inner = (
		<>
			<span className="text-xs font-semibold uppercase tracking-wide text-primary-600">
				{entry.group}
			</span>
			<span className="font-heading text-sm font-bold text-text-primary">
				{entry.title}
			</span>
			<span className="line-clamp-1 text-xs text-text-secondary">
				{entry.description}
			</span>
		</>
	);

	if (entry.kind === "home") {
		return (
			<Link
				to="/$lang/"
				params={{ lang: locale }}
				onClick={onNavigate}
				className={resultCls}
			>
				{inner}
			</Link>
		);
	}
	if (entry.kind === "section") {
		return (
			<Link
				to="/$lang/$section/"
				params={{ lang: locale, section: entry.slug }}
				onClick={onNavigate}
				className={resultCls}
			>
				{inner}
			</Link>
		);
	}
	return (
		<Link
			to="/$lang/$section/$item/"
			params={{ lang: locale, section: entry.section, item: entry.item }}
			onClick={onNavigate}
			className={resultCls}
		>
			{inner}
		</Link>
	);
}
