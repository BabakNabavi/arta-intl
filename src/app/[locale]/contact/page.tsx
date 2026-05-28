import type { Metadata } from "next";
import { isLocale, i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { SITE, whatsappLink } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/sections/ContactForm";
import { JsonLd, breadcrumbSchema } from "@/components/ui/JsonLd";
import { IconMapPin, IconWhatsApp, IconInstagram, IconClock } from "@/components/ui/icons";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = isLocale(params.locale) ? params.locale : i18n.defaultLocale;
  const dict = await getDictionary(locale);
  return {
    title: dict.contact.seo.title,
    description: dict.contact.seo.description,
    keywords: dict.contact.seo.keywords,
    alternates: { canonical: `/${locale}/contact` },
  };
}

function localBusinessSchema(locale: Locale, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    legalName: SITE.legalName,
    description,
    url: `${SITE.url}/${locale}/contact`,
    telephone: `+${SITE.whatsapp}`,
    email: SITE.email,
    founder: { "@type": "Person", name: SITE.director },
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressCountry: "IR",
    },
    sameAs: [SITE.instagramUrl],
  };
}

export default async function ContactPage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(locale);
  const c = dict.contact;

  const cards = [
    {
      icon: IconMapPin,
      label: c.cards.address.label,
      value: c.cards.address.value,
      href: undefined as string | undefined,
      ltr: false,
    },
    {
      icon: IconWhatsApp,
      label: c.cards.whatsapp.label,
      value: c.cards.whatsapp.value,
      href: whatsappLink(),
      action: c.cards.whatsapp.action,
      ltr: true,
    },
    {
      icon: IconInstagram,
      label: c.cards.instagram.label,
      value: c.cards.instagram.value,
      href: SITE.instagramUrl,
      action: c.cards.instagram.action,
      ltr: true,
    },
    {
      icon: IconClock,
      label: c.cards.hours.label,
      value: c.cards.hours.value,
      href: undefined,
      ltr: false,
    },
  ];

  return (
    <>
      <JsonLd
        data={[
          localBusinessSchema(locale, dict.meta.siteName, c.seo.description),
          breadcrumbSchema([
            { name: dict.nav.home, url: `${SITE.url}/${locale}` },
            { name: dict.nav.contact, url: `${SITE.url}/${locale}/contact` },
          ]),
        ]}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-mesh pb-20 pt-36 text-white lg:pb-28 lg:pt-44">
        <div className="pointer-events-none absolute inset-0 bg-hero-grid [background-size:64px_64px] opacity-40 [mask-image:radial-gradient(800px_420px_at_50%_0%,black,transparent)]" />
        <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-turquoise-500/20 blur-3xl" />
        <div className="container-wide relative">
          <SectionHeading
            eyelet={c.hero.eyelet}
            title={c.hero.title}
            subtitle={c.hero.subtitle}
            light
            className="max-w-3xl"
          />
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="container-wide py-20 lg:py-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => {
            const Icon = card.icon;
            const inner = (
              <div className="group h-full rounded-2xl border border-navy-100 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-turquoise-50 text-turquoise-600 transition-colors group-hover:bg-turquoise-500 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <p className="mt-5 text-xs uppercase tracking-wider text-navy-400">{card.label}</p>
                <p
                  dir={card.ltr ? "ltr" : undefined}
                  className="mt-1 font-medium leading-relaxed text-navy-900"
                >
                  {card.value}
                </p>
                {card.href && (
                  <span className="mt-3 inline-block text-sm font-semibold text-turquoise-600">
                    {card.action} →
                  </span>
                )}
              </div>
            );
            return (
              <Reveal key={card.label} index={i}>
                {card.href ? (
                  <a href={card.href} target="_blank" rel="noopener noreferrer" className="block h-full">
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* FORM + MAP */}
      <section className="border-t border-navy-100 bg-sand-50 py-20 lg:py-28">
        <div className="container-wide grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyelet={c.form.title} title={c.form.subtitle} className="mb-8" />
            <Reveal index={1}>
              <ContactForm dict={c.form} />
            </Reveal>
          </div>

          <div className="flex flex-col gap-6">
            <Reveal>
              <p className="eyelet">
                <span className="h-px w-6 bg-turquoise-500" />
                {c.mapLabel}
              </p>
            </Reveal>
            <Reveal index={1}>
              {/* Map placeholder — replace src with a real Google Maps embed for the
                  exact address when available. Kept as a styled placeholder to avoid
                  loading third-party iframes in the base build. */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-navy-100 bg-navy-900 shadow-card">
                <div className="absolute inset-0 bg-hero-grid [background-size:40px_40px] opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-br from-navy-900/40 to-turquoise-900/30" />
                <div className="absolute inset-0 grid place-items-center text-center">
                  <div className="flex flex-col items-center gap-3 px-6">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-turquoise-500 text-white shadow-glow">
                      <IconMapPin className="h-7 w-7" />
                    </span>
                    <p className="font-display text-lg font-semibold text-white">{SITE.brand}</p>
                    <p className="max-w-xs text-sm text-navy-100/80">{c.cards.address.value}</p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal index={2}>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  SITE.address.full,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-turquoise-600 hover:text-turquoise-700"
              >
                {locale === "fa" ? "مشاهده روی نقشه" : "Open in Google Maps"} →
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
