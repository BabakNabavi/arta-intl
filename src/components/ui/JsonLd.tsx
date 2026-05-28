import { SITE } from "@/lib/site";
import type { Locale } from "@/i18n/config";

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // Structured data for search engines (Organization / WebSite / pages).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationSchema(locale: Locale, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    legalName: SITE.legalName,
    url: `${SITE.url}/${locale}`,
    description,
    foundingLocation: "Tehran, Iran",
    identifier: SITE.registrationNumber,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressCountry: "IR",
    },
    sameAs: [SITE.instagramUrl],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: `+${SITE.whatsapp}`,
      areaServed: "Worldwide",
      availableLanguage: ["Persian", "English"],
    },
  };
}

export function websiteSchema(locale: Locale, name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url: `${SITE.url}/${locale}`,
    inLanguage: locale === "fa" ? "fa-IR" : "en-US",
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}
