// Internationalization configuration.
// Primary audience is Iranian B2B, so Persian (fa) is the default locale,
// with full English (en) support. Both are fully supported for RTL/LTR.

export const i18n = {
  defaultLocale: "fa",
  locales: ["fa", "en"],
} as const;

export type Locale = (typeof i18n)["locales"][number];

export const localeDirection: Record<Locale, "rtl" | "ltr"> = {
  fa: "rtl",
  en: "ltr",
};

export const localeNames: Record<Locale, string> = {
  fa: "فارسی",
  en: "English",
};

export function isLocale(value: string): value is Locale {
  return (i18n.locales as readonly string[]).includes(value);
}
