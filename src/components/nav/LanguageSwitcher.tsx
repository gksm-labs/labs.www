import { routes } from "../../i18n/routes";
import { supportedLang, type SupportedLang } from "../../i18n/supported-lang";
import { getRouteKeyByPath } from "./nav";

interface Props {
  lang: SupportedLang;
  pathname: string;
}

const LanguageSwitcher = ({ lang, pathname }: Props) => {
  const routeKey = getRouteKeyByPath(pathname, lang);

  const routeConfig = routes[routeKey as keyof typeof routes];

  return (
    <div className="flex items-center gap-2">
      {supportedLang.map((sLang) => {
        const isCurrentLang = sLang === lang;

        if (isCurrentLang) {
          return (
            <span
              className="text-sm font-black text-zinc-800 underline decoration-wavy"
              key={sLang}
            >
              {sLang.toUpperCase()}
            </span>
          );
        }
        return (
          <a
            className="text-sm text-zinc-800"
            key={sLang}
            href={routeConfig[sLang]}
          >
            {sLang.toUpperCase()}
          </a>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
