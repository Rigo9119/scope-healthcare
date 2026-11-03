/** Merges a Sanity document over its bundled fallback, field by field: empty
 *  values (null, "", []) keep the fallback, and nested objects (e.g. `hero`)
 *  are merged the same way, so a half-filled document never breaks a page. */
export function withFallback<T extends object>(
	data: Partial<T> | null | undefined,
	fallback: T,
): T {
	const out = { ...fallback } as Record<string, unknown>;
	for (const [key, value] of Object.entries(data ?? {})) {
		if (value == null || value === "") continue;
		if (Array.isArray(value)) {
			if (value.length) out[key] = value;
		} else if (typeof value === "object" && isPlainObject(out[key])) {
			out[key] = withFallback(value, out[key] as object);
		} else {
			out[key] = value;
		}
	}
	return out as T;
}

function isPlainObject(v: unknown): v is object {
	return typeof v === "object" && v !== null && !Array.isArray(v);
}
