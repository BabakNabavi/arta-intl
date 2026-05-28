import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import "../globals.css";
import { i18n, isLocale, localeDirection, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { SITE } from "@/lib/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = isLocale(params.locale) ? params.locale : i18n.defaultLocale;
  const dict = await getDictionary(locale);

  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: dict.home.seo.title,
      template: `%s · ${dict.meta.shortName}`,
    },
    description: dict.home.seo.description,
    applicationName: dict.meta.siteName,
    keywords: dict.home.seo.keywords,
    authors: [{ name: dict.meta.siteName }],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        "fa-IR": "/fa",
        "en-US": "/en",
        "x-default": "/fa",
      },
    },
    openGraph: {
      type: "website",
      siteName: dict.meta.siteName,
      locale: locale === "fa" ? "fa_IR" : "en_US",
      url: `${SITE.url}/${locale}`,
      title: dict.home.seo.title,
      description: dict.home.seo.description,
      images: [{ url: "/images/og.svg", width: 1200, height: 630, alt: dict.meta.siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.home.seo.title,
      description: dict.home.seo.description,
      images: ["/images/og.svg"],
    },
    robots: { index: true, follow: true },
    icons: { icon: "/favicon.svg" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dir = localeDirection[locale];
  const dict = await getDictionary(locale);

  return (
    <html lang={locale} dir={dir}>
      <head>
        {/* English type system — loaded at runtime (build-safe, no asset bundling). */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white"
        >
          {locale === "fa" ? "پرش به محتوا" : "Skip to content"}
        </a>
        <Navbar locale={locale} dict={dict.nav} />
        <main id="main" className="min-h-screen pt-[72px]">
          {children}
        </main>
        <Footer locale={locale} dict={dict} />
      </body>
    </html>
  );
}
