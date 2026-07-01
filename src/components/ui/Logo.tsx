import Link from "next/link";
import type { Locale } from "@/i18n/config";

/* =============================================================================
   LOGO / BRAND MARK
   -----------------------------------------------------------------------------
   The final logo is not available yet. This component renders a clean,
   text-based brand mark as a temporary placeholder.

   ▸ TO ADD THE FINAL LOGO LATER:
     1. Place the logo file(s) in:  /public/logo/
        e.g. /public/logo/arta-logo.svg  (and an inverted version for dark
        backgrounds, e.g. /public/logo/arta-logo-light.svg)
     2. Uncomment the <Image> block below and remove the text placeholder.
     3. Use the `variant` prop ("dark" | "light") to swap logo colours so it
        works on both the white navbar and the navy footer/hero.
   ============================================================================ */

   import Image from "next/image";

type LogoProps = {
  locale: Locale;
  /** "dark" = for light backgrounds (navbar). "light" = for dark backgrounds (footer/hero). */
  variant?: "dark" | "light";
  className?: string;
};

export function Logo({ locale, variant = "dark", className = "" }: LogoProps) {
  const isLight = variant === "light";

  return (
    <Link
      href={`/${locale}`}
      aria-label="Arta Tejarat — Home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      {/* --- Mark --- */}
      <span
        className={`relative grid h-9 w-9 place-items-center rounded-[10px] ${
          isLight ? "bg-white/10 ring-1 ring-white/25" : "bg-navy-900"
        }`}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
          <path
            d="M12 3 4 20h3.4l1.3-3h6.6l1.3 3H20L12 3Zm-2.1 11L12 9.2 14.1 14H9.9Z"
            fill={isLight ? "#fff" : "#2fbecd"}
          />
        </svg>
        <span
          className={`absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full ${
            isLight ? "bg-turquoise-300" : "bg-turquoise-400"
          }`}
        />
      </span>

      {/* --- Wordmark (text placeholder until logo asset is added) --- */}
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.05rem] font-bold ${
            locale === "fa" ? "tracking-normal" : "tracking-[0.12em]"
          } ${isLight ? "text-white" : "text-navy-900"}`}
        >
          {locale === "fa" ? "آرتا تجارت" : <>ARTA&nbsp;TEJARAT</>}
        </span>
        <span
          className={`mt-1 text-[0.6rem] font-medium ${
            locale === "fa" ? "tracking-normal" : "uppercase tracking-[0.28em]"
          } ${isLight ? "text-turquoise-200/80" : "text-turquoise-600/90"}`}
        >
          {locale === "fa" ? "بین‌الملل آپادانا" : "INTERNATIONAL APADANA"}
        </span>
      </span>

      { /*
      <Image
        src={isLight ? "/logo/arta-logo-light.svg" : "/logo/arta-logo.svg"}
        alt="Arta Tejarat International Apadana"
        width={170}
        height={40}
        priority
      />
      */}
    </Link>
  );
}
