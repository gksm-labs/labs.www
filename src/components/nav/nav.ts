import { routes } from "../../i18n/routes";
import type { SupportedLang } from "../../i18n/supported-lang";
import { translation } from "../../i18n/translation";

type NavKey = keyof (typeof translation)[SupportedLang]["nav"];
type RouteKey = keyof typeof routes;

export function getNavLinks(lang: SupportedLang) {
  return (Object.keys(translation[lang].nav) as NavKey[]).map((key) => ({
    label: translation[lang].nav[key],
    href: routes[key][lang],
  }));
}

function normalizePath(p: string) {
  if (!p) return "/";
  return p.replace(/\/index\.html$/, "").replace(/\/$/, "") || "/";
}

export function getRouteKeyByPath(
  pathname: string,
  lang: SupportedLang,
): string | undefined {
  const normalizedPath = normalizePath(pathname);
  for (const key of Object.keys(routes) as RouteKey[]) {
    if (normalizePath(routes[key][lang]) === normalizedPath) {
      return key;
    }
  }
  return undefined;
}
