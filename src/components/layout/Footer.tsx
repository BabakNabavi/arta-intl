import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { SITE, whatsappLink } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import {
  IconWhatsApp,
  IconInstagram,
  IconMapPin,
  IconMail,
} from "@/components/ui/icons";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
  const nav = dict.nav;
  const f = dict.footer;

  const companyLinks = [
    { href: `/${locale}`, label: nav.home },
    { href: `/${locale}/about`, label: nav.about },
    { href: `/${locale}/services`, label: nav.services },
    { href: `/${locale}/contact`, label: nav.contact },
  ];

  const serviceLinks = dict.services.list.map((s) => ({
    href: `/${locale}/services`,
    label: s.title,
  }));

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-navy-100">
      {/* atmospheric top edge */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-turquoise-500/60 to-transparent" />
      <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-turquoise-500/10 blur-3xl" />

      <div className="container-wide relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Logo locale={locale} variant="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-navy-200/80">
              {f.about}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-white/15 text-navy-100 transition-colors hover:bg-turquoise-500 hover:text-white hover:ring-turquoise-500"
              >
                <IconWhatsApp className="h-5 w-5" />
              </a>
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-white/15 text-navy-100 transition-colors hover:bg-turquoise-500 hover:text-white hover:ring-turquoise-500"
              >
                <IconInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Company */}
          <nav aria-label={f.quickLinks}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              {f.quickLinks}
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-navy-200/80 transition-colors hover:text-turquoise-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label={f.services}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              {f.services}
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {serviceLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-navy-200/80 transition-colors hover:text-turquoise-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              {f.contactTitle}
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <IconMapPin className="mt-0.5 h-5 w-5 shrink-0 text-turquoise-400" />
                <span className="text-navy-200/80">{dict.contact.cards.address.value}</span>
              </li>
              <li className="flex items-center gap-3">
                <IconWhatsApp className="h-5 w-5 shrink-0 text-turquoise-400" />
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                  className="text-navy-200/80 transition-colors hover:text-turquoise-300"
                >
                  {SITE.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <IconMail className="h-5 w-5 shrink-0 text-turquoise-400" />
                <a
                  href={`mailto:${SITE.email}`}
                  dir="ltr"
                  className="text-navy-200/80 transition-colors hover:text-turquoise-300"
                >
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-navy-200/70 sm:flex-row">
          <p>
            © {year} {dict.meta.siteName}. {f.rights}
          </p>
          <p className="flex items-center gap-4">
            <span>{f.regNo}</span>
            <span className="hidden h-3 w-px bg-white/15 sm:block" />
            <span dir="ltr">{SITE.domain}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
