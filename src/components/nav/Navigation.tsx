import { useState } from "react";
import { defaultLang, type SupportedLang } from "../../i18n/supported-lang";
import LanguageSwitcher from "./LanguageSwitcher";
import { getNavLinks } from "./nav";

interface Props {
  lang: SupportedLang;
  pathname: string;
}

const Navigation = ({ lang, pathname }: Props) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navLinks = getNavLinks(lang);

  return (
    <header className="fixed top-0 left-0 z-50 h-20 w-full bg-amber-400">
      <nav className="relative mx-auto flex h-full max-w-7xl items-center justify-between px-4 py-2 md:px-6">
        <div>
          <a
            className="text-3xl font-black"
            href={lang === defaultLang ? "/" : `/${lang}`}
          >
            GKŠM Labs
          </a>
        </div>
        <div className="hidden items-center gap-12 md:flex">
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
        <div className="flex items-center md:hidden">
          <button
            aria-label="Open menu"
            className="inline-flex cursor-pointer items-center justify-center rounded-md p-2 focus:ring-2 focus:ring-black focus:outline-none focus:ring-inset"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8h16M4 16h16"
                />
              )}
            </svg>
          </button>
        </div>
        {mobileOpen && (
          <div className="absolute top-20 left-0 z-50 w-full bg-amber-400 shadow-md md:hidden">
            <ul className="flex flex-col items-center gap-4 py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    className="text-lg font-medium decoration-wavy hover:underline"
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <LanguageSwitcher lang={lang} pathname={pathname} />
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
