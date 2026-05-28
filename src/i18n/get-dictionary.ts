import "server-only";
import type { Locale } from "./config";

// Dictionaries are loaded on the server only and passed down to components.
// This keeps bundle size small and supports clean RTL/LTR content separation.
const dictionaries = {
  fa: () => import("./dictionaries/fa.json").then((m) => m.default),
  en: () => import("./dictionaries/en.json").then((m) => m.default),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["en"]>>;

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();
