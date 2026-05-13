import { defaultLang, type SupportedLang } from "../../i18n/supported-lang";
import LanguageSwitcher from "./LanguageSwitcher";
import { getNavLinks } from "./nav";

interface Props {
  lang: SupportedLang;
  pathname: string;
}

const Navigation = ({ lang, pathname }: Props) => {
  const navLinks = getNavLinks(lang);

  return (
    <header className="sticky top-0 h-20 bg-amber-400">
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 py-2">
        <div>
          <a
            className="text-3xl font-black"
            href={lang === defaultLang ? "/" : `/${lang}`}
          >
            GKŠM Labs
          </a>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  className="text-xl decoration-wavy hover:underline"
                  href={link.href}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div>
            <LanguageSwitcher lang={lang} pathname={pathname} />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
