import { ui, defaultLocale, type Locale } from "./ui";

export function getLangFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as Locale;
  return defaultLocale;
}

export function useTranslations(lang: Locale) {
  return function t(key: keyof (typeof ui)[typeof defaultLocale]): string {
    return ui[lang][key] ?? ui[defaultLocale][key];
  };
}

export function getLocalePath(lang: Locale, path: string = "/"): string {
  if (lang === defaultLocale) return path;
  return `/${lang}${path}`;
}

export function getAlternateLang(lang: Locale): Locale {
  return lang === "ja" ? "en" : "ja";
}
