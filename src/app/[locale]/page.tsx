import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { SITE, whatsappLink } from "@/lib/site";
import { Hero } from "@/components/sections/Hero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { WorldGraphic } from "@/components/ui/WorldGraphic";
import { JsonLd, organizationSchema, websiteSchema } from "@/components/ui/JsonLd";
import {
  IconArrows,
  IconShip,
  IconHandshake,
  IconSearch,
  IconRoute,
  IconCheck,
  IconShield,
  IconGlobe,
  IconChart,
  IconUsers,
  IconClock,
  IconWhatsApp,
  IconInstagram,
  IconArrowRight,
  IconArrowLeft,
} from "@/components/ui/icons";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = isLocale(params.locale) ? params.locale : i18n.defaultLocale;
  const dict = await getDictionary(locale);
  return {
    title: dict.home.seo.title,
    description: dict.home.seo.description,
    alternates: { canonical: `/${locale}` },
  };
}

const serviceIcons = [IconArrows, IconShip, IconHandshake, IconSearch, IconRoute];
const whyIcons = [IconShield, IconGlobe, IconCheck, IconChart, IconShield, IconUsers];

export default async function HomePage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(locale);
  const h = dict.home;

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(locale, dict.meta.siteName, h.seo.description),
          websiteSchema(locale, dict.meta.siteName),
        ]}
      />

      <Hero locale={locale} dict={h.hero} />

      {/* INTRODUCTION */}
      <section className="container-wide py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <SectionHeading eyelet={h.intro.eyelet} title={h.intro.title} subtitle={h.intro.body} />
          <div className="grid gap-5 self-center">
            {h.intro.highlights.map((item, i) => (
              <Reveal key={item.title} index={i}>
                <div className="flex gap-4 rounded-2xl border border-navy-100 bg-white p-5 shadow-soft transition-shadow hover:shadow-card">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-turquoise-50 text-turquoise-600">
                    <IconCheck className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-navy-900">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-navy-500">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="border-y border-navy-100 bg-sand-50 py-20 lg:py-28">
        <div className="container-wide">
          <SectionHeading
            eyelet={h.services.eyelet}
            title={h.services.title}
            subtitle={h.services.subtitle}
            align="center"
            className="mb-14"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {dict.services.list.map((svc, i) => {
              const Icon = serviceIcons[i] ?? IconArrows;
              return (
                <Reveal key={svc.title} index={i}>
                  <article className="group relative h-full overflow-hidden rounded-2xl border border-navy-100 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-900 text-turquoise-400 transition-colors group-hover:bg-turquoise-500 group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="font-display mt-5 text-xl font-semibold text-navy-900">{svc.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-navy-500">{svc.text}</p>
                    <span className="absolute end-0 top-0 h-16 w-16 -translate-y-8 translate-x-8 rounded-full bg-turquoise-100/60 blur-xl transition-opacity group-hover:opacity-100 rtl:-translate-x-8" />
                  </article>
                </Reveal>
              );
            })}
            <Reveal index={dict.services.list.length}>
              <Link
                href={`/${locale}/services`}
                className="group flex h-full flex-col justify-between rounded-2xl bg-navy-900 p-7 text-white transition-colors hover:bg-navy-800"
              >
                <span className="font-display text-xl font-semibold">{h.services.viewAll}</span>
                <span className="mt-8 inline-flex h-11 w-11 items-center justify-center rounded-full bg-turquoise-500 text-white transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                  {locale === "fa" ? <IconArrowLeft className="h-5 w-5" /> : <IconArrowRight className="h-5 w-5" />}
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="container-wide py-20 lg:py-28">
        <SectionHeading
          eyelet={h.why.eyelet}
          title={h.why.title}
          align="center"
          className="mb-14"
        />
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {h.why.items.map((item, i) => {
            const Icon = whyIcons[i] ?? IconShield;
            return (
              <Reveal key={item.title} index={i}>
                <div className="flex gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-turquoise-50 text-turquoise-600 ring-1 ring-turquoise-100">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-navy-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy-500">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* VISION */}
      <section className="relative overflow-hidden bg-navy-mesh py-20 text-white lg:py-28">
        <div className="pointer-events-none absolute inset-0 bg-hero-grid [background-size:64px_64px] opacity-40 [mask-image:radial-gradient(700px_400px_at_70%_50%,black,transparent)]" />
        <div className="container-wide relative grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyelet={h.vision.eyelet}
              title={h.vision.title}
              subtitle={h.vision.body}
              light
            />
            <ul className="mt-8 space-y-4">
              {h.vision.points.map((p, i) => (
                <Reveal key={p} index={i} as="li">
                  <span className="flex items-start gap-3 text-navy-100/90">
                    <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-turquoise-500 text-white">
                      <IconCheck className="h-3.5 w-3.5" />
                    </span>
                    {p}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <WorldGraphic className="h-auto w-full" />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="container-wide py-20 lg:py-24">
        <SectionHeading eyelet={h.stats.eyelet} title={h.stats.title} align="center" className="mb-12" />
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-navy-100 bg-navy-100 lg:grid-cols-4">
          {h.stats.items.map((s, i) => (
            <Reveal key={s.label} index={i}>
              <div className="flex h-full flex-col items-center justify-center gap-2 bg-white px-6 py-10 text-center">
                <span className="font-display bg-gradient-to-br from-navy-900 to-turquoise-600 bg-clip-text text-4xl font-bold text-transparent lg:text-5xl">
                  {s.value}
                </span>
                <span className="text-sm font-medium text-navy-500">{s.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-navy-400">{h.stats.disclaimer}</p>
      </section>

      {/* CTA BAND */}
      <section className="container-wide pb-20 lg:pb-28">
        <div className="relative overflow-hidden rounded-3xl bg-navy-900 px-7 py-14 text-center sm:px-12 lg:py-20">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-turquoise-500/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-turquoise-400/15 blur-3xl" />
          <Reveal>
            <h2 className="font-display mx-auto max-w-2xl text-balance text-3xl font-semibold text-white sm:text-4xl">
              {h.cta.title}
            </h2>
          </Reveal>
          <Reveal index={1}>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-navy-100/80">{h.cta.subtitle}</p>
          </Reveal>
          <Reveal index={2}>
            <div className="mt-9 flex justify-center">
              <Button href={`/${locale}/contact`} locale={locale} variant="primary">
                {h.cta.button}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT PREVIEW */}
      <section className="border-t border-navy-100 bg-sand-50 py-20 lg:py-24">
        <div className="container-wide grid items-center gap-12 lg:grid-cols-2">
          <SectionHeading
            eyelet={h.contactPreview.eyelet}
            title={h.contactPreview.title}
            subtitle={h.contactPreview.body}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-navy-100 bg-white p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-turquoise-50 text-turquoise-600">
                <IconWhatsApp className="h-6 w-6" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-wider text-navy-400">WhatsApp</p>
                <p dir="ltr" className="font-semibold text-navy-900">{SITE.whatsappDisplay}</p>
              </div>
            </a>
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-navy-100 bg-white p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-turquoise-50 text-turquoise-600">
                <IconInstagram className="h-6 w-6" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-wider text-navy-400">Instagram</p>
                <p dir="ltr" className="font-semibold text-navy-900">@{SITE.instagram}</p>
              </div>
            </a>
            <div className="sm:col-span-2">
              <Button href={`/${locale}/contact`} locale={locale} variant="secondary" className="w-full sm:w-auto">
                {h.contactPreview.button}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
