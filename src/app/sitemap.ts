import type { MetadataRoute } from "next";
import { i18n } from "@/i18n/config";
import { SITE } from "@/lib/site";

// Generates an XML sitemap for both locales and all pages.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/services", "/contact"];
  const now = new Date();

  return i18n.locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${SITE.url}/${locale}${page}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: page === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          i18n.locales.map((l) => [l, `${SITE.url}/${l}${page}`]),
        ),
      },
    })),
  );
}
