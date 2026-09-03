const base = import.meta.env.BASE_URL.replace(/\/+$/, "");
const baseRoot = base === "" ? "/" : `${base}/`;

function isExternal(path: string): boolean {
  return /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(path);
}

export function getAssetPath(path: string): string {
  if (
    isExternal(path) ||
    path.startsWith("#") ||
    path.startsWith("?")
  ) {
    return path;
  }

  const normalized = path.replace(/^\/+/, "");
  const normalizedBase = base.replace(/^\/+/, "");

  if (
    normalizedBase &&
    (normalized === normalizedBase ||
      normalized.startsWith(`${normalizedBase}/`))
  ) {
    return `/${normalized}`;
  }

  return normalized ? `${baseRoot}${normalized}` : baseRoot;
}

export function stripBasePath(pathname: string): string {
  if (!base) return pathname || "/";
  if (pathname === base) return "/";

  return pathname.startsWith(`${base}/`)
    ? pathname.slice(base.length)
    : pathname;
}

export function absoluteUrl(
  path: string,
  site?: string | URL
): string {
  return new URL(getAssetPath(path), site).toString();
}
