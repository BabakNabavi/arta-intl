import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/i18n/config";

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
      className={`inline-flex items-center ${className}`}
    >
      <Image
        src={isLight ? "/logo/arta-logo-light.svg" : "/logo/arta-logo.svg"}
        alt="Arta Tejarat International Apadana"
        width={150}
        height={36}
        priority
        className="h-9 w-auto"
      />
    </Link>
  );
}