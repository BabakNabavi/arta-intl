import type { Metadata } from "next";
import { isLocale, i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { SITE } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { JsonLd, breadcrumbSchema } from "@/components/ui/JsonLd";
import {
  IconArrows,
  IconShip,
  IconHandshake,
  IconSearch,
  IconRoute,
  IconCheck,
  IconGlobe,
  IconChart,
  IconShield,
} from "@/components/ui/icons";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = isLocale(params.locale) ? params.locale : i18n.defaultLocale;
  const dict = await getDictionary(locale);
  return {
    title: dict.services.seo.title,
    description: dict.services.seo.description,
    keywords: dict.services.seo.keywords,
    alternates: { canonical: `/${locale}/services` },
  };
}

const serviceIcons = [IconArrows, IconShip, IconHandshake, IconSearch, IconRoute];
const sectorIcons = [IconGlobe, IconChart, IconShield];

export default async function ServicesPage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(locale);
  const s = dict.services;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: dict.nav.home, url: `${SITE.url}/${locale}` },
          { name: dict.nav.services, url: `${SITE.url}/${locale}/services` },
        ])}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-mesh pb-20 pt-36 text-white lg:pb-28 lg:pt-44">
        <div className="pointer-events-none absolute inset-0 bg-hero-grid [background-size:64px_64px] opacity-40 [mask-image:radial-gradient(800px_420px_at_50%_0%,black,transparent)]" />
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-turquoise-500/20 blur-3xl" />
        <div className="container-wide relative">
          <SectionHeading
            eyelet={s.hero.eyelet}
            title={s.hero.title}
            subtitle={s.hero.subtitle}
            light
            className="max-w-3xl"
          />
        </div>
      </section>

      {/* SERVICES LIST */}
      <section className="container-wide py-20 lg:py-28">
        <div className="space-y-6">
          {s.list.map((svc, i) => {
            const Icon = serviceIcons[i] ?? IconArrows;
            return (
              <Reveal key={svc.title} index={i % 3}>
                <article className="group grid gap-7 rounded-3xl border border-navy-100 bg-white p-7 shadow-soft transition-shadow hover:shadow-card lg:grid-cols-[auto,1fr,1fr] lg:items-start lg:gap-10 lg:p-9">
                  <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-navy-900 text-turquoise-400 transition-colors group-hover:bg-turquoise-500 group-hover:text-white">
                      <Icon className="h-7 w-7" />
                    </span>
                    <span className="font-display text-sm font-semibold text-navy-300 lg:mt-2">
                      0{i + 1}
                    </span>
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-navy-900">{svc.title}</h2>
                    <p className="mt-3 text-base leading-relaxed text-navy-500">{svc.text}</p>
                  </div>
                  <ul className="grid gap-3 self-center sm:grid-cols-2 lg:grid-cols-1">
                    {svc.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm text-navy-700">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-turquoise-50 text-turquoise-600">
                          <IconCheck className="h-3.5 w-3.5" />
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* SECTOR FOCUS */}
      <section className="border-y border-navy-100 bg-sand-50 py-20 lg:py-28">
        <div className="container-wide">
          <SectionHeading eyelet={s.sectors.eyelet} title={s.sectors.title} align="center" className="mb-14" />
          <div className="grid gap-5 md:grid-cols-3">
            {s.sectors.items.map((item, i) => {
              const Icon = sectorIcons[i] ?? IconGlobe;
              return (
                <Reveal key={item.title} index={i}>
                  <div className="group h-full overflow-hidden rounded-2xl border border-navy-100 bg-white p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-turquoise-50 text-turquoise-600 transition-colors group-hover:bg-turquoise-500 group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="font-display mt-5 text-xl font-semibold text-navy-900">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-navy-500">{item.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-wide py-20 lg:py-28">
        <div className="relative overflow-hidden rounded-3xl bg-navy-900 px-7 py-14 text-center sm:px-12 lg:py-20">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-turquoise-500/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-turquoise-400/15 blur-3xl" />
          <Reveal>
            <h2 className="font-display mx-auto max-w-2xl text-balance text-3xl font-semibold text-white sm:text-4xl">
              {s.cta.title}
            </h2>
          </Reveal>
          <Reveal index={1}>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-navy-100/80">{s.cta.subtitle}</p>
          </Reveal>
          <Reveal index={2}>
            <div className="mt-9 flex justify-center">
              <Button href={`/${locale}/contact`} locale={locale} variant="primary">
                {s.cta.button}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
