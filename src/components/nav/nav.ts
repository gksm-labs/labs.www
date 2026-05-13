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

export function getRouteKeyByPath(
  pathname: string,
  lang: SupportedLang,
): string | undefined {
  for (const key of Object.keys(routes) as RouteKey[]) {
    if (routes[key][lang] === pathname) {
      return key;
    }
  }
  return undefined;
}
