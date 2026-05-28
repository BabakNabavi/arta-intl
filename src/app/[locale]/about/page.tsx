import type { Metadata } from "next";
import { isLocale, i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { SITE } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { WorldGraphic } from "@/components/ui/WorldGraphic";
import { JsonLd, breadcrumbSchema } from "@/components/ui/JsonLd";
import {
  IconShield,
  IconCheck,
  IconGlobe,
  IconHandshake,
  IconChart,
  IconUsers,
} from "@/components/ui/icons";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = isLocale(params.locale) ? params.locale : i18n.defaultLocale;
  const dict = await getDictionary(locale);
  return {
    title: dict.about.seo.title,
    description: dict.about.seo.description,
    keywords: dict.about.seo.keywords,
    alternates: { canonical: `/${locale}/about` },
  };
}

const valueIcons = [IconShield, IconCheck, IconGlobe, IconChart, IconHandshake, IconUsers];

export default async function AboutPage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(locale);
  const a = dict.about;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: dict.nav.home, url: `${SITE.url}/${locale}` },
          { name: dict.nav.about, url: `${SITE.url}/${locale}/about` },
        ])}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-mesh pb-20 pt-36 text-white lg:pb-28 lg:pt-44">
        <div className="pointer-events-none absolute inset-0 bg-hero-grid [background-size:64px_64px] opacity-40 [mask-image:radial-gradient(800px_420px_at_50%_0%,black,transparent)]" />
        <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-turquoise-500/20 blur-3xl" />
        <div className="container-wide relative">
          <SectionHeading
            eyelet={a.hero.eyelet}
            title={a.hero.title}
            subtitle={a.hero.subtitle}
            light
            className="max-w-3xl"
          />
        </div>
      </section>

      {/* STORY */}
      <section className="container-wide py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <SectionHeading eyelet={a.story.eyelet} title={a.story.title} />
          <div className="space-y-5 self-center">
            {a.story.paragraphs.map((p, i) => (
              <Reveal key={i} index={i}>
                <p className="text-base leading-relaxed text-navy-500">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION + VISION */}
      <section className="border-y border-navy-100 bg-sand-50 py-20 lg:py-24">
        <div className="container-wide grid gap-6 lg:grid-cols-2">
          {[a.mission, a.visionBlock].map((block, i) => (
            <Reveal key={block.label} index={i}>
              <div className="relative h-full overflow-hidden rounded-3xl border border-navy-100 bg-white p-8 shadow-soft lg:p-10">
                <span className="absolute end-0 top-0 h-28 w-28 -translate-y-12 translate-x-12 rounded-full bg-turquoise-100/50 blur-2xl rtl:-translate-x-12" />
                <span className="eyelet">
                  <span className="h-px w-6 bg-turquoise-500" />
                  {block.label}
                </span>
                <p className="font-display mt-5 text-2xl font-medium leading-snug text-navy-900 lg:text-[1.7rem]">
                  {block.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="container-wide py-20 lg:py-28">
        <SectionHeading eyelet={a.values.eyelet} title={a.values.title} align="center" className="mb-14" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {a.values.items.map((item, i) => {
            const Icon = valueIcons[i] ?? IconShield;
            return (
              <Reveal key={item.title} index={i}>
                <div className="group h-full rounded-2xl border border-navy-100 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-turquoise-50 text-turquoise-600 transition-colors group-hover:bg-turquoise-500 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="font-display mt-5 text-lg font-semibold text-navy-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-500">{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* CORPORATE IDENTITY */}
      <section className="relative overflow-hidden bg-navy-mesh py-20 text-white lg:py-28">
        <div className="pointer-events-none absolute inset-0 bg-hero-grid [background-size:64px_64px] opacity-40 [mask-image:radial-gradient(700px_400px_at_30%_50%,black,transparent)]" />
        <div className="container-wide relative grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyelet={a.identity.eyelet} title={a.identity.title} subtitle={a.identity.body} light />
            <dl className="mt-9 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur">
              {a.identity.items.map((item, i) => (
                <Reveal key={item.label} index={i}>
                  <div className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <dt className="text-sm font-medium text-navy-200/70">{item.label}</dt>
                    <dd className="font-medium text-white">{item.value}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <WorldGraphic className="h-auto w-full" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-wide py-20 lg:py-24">
        <div className="flex flex-col items-center gap-6 text-center">
          <Reveal>
            <h2 className="font-display max-w-2xl text-balance text-3xl font-semibold text-navy-900 sm:text-4xl">
              {dict.home.cta.title}
            </h2>
          </Reveal>
          <Reveal index={1}>
            <Button href={`/${locale}/contact`} locale={locale} variant="primary">
              {dict.home.cta.button}
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
