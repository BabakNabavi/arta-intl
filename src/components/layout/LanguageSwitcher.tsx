"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { i18n, localeNames, type Locale } from "@/i18n/config";

export function LanguageSwitcher({
  locale,
  variant = "dark",
}: {
  locale: Locale;
  variant?: "dark" | "light";
}) {
  const pathname = usePathname() || `/${locale}`;

  // Build the equivalent path for a target locale by swapping the first segment.
  const pathFor = (target: Locale) => {
    const segments = pathname.split("/");
    segments[1] = target;
    return segments.join("/") || `/${target}`;
  };

  const light = variant === "light";

  return (
    <div
      className={`inline-flex items-center rounded-full p-0.5 text-sm font-semibold ${
        light ? "bg-white/10 ring-1 ring-white/20" : "bg-navy-50 ring-1 ring-navy-100"
      }`}
      role="group"
      aria-label="Language"
    >
      {i18n.locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={pathFor(l)}
            aria-current={active ? "true" : undefined}
            className={`rounded-full px-3 py-1.5 transition-colors ${
              active
                ? "bg-navy-900 text-white shadow-sm"
                : light
                  ? "text-white/70 hover:text-white"
                  : "text-navy-500 hover:text-navy-900"
            }`}
          >
            {l === "fa" ? "FA" : "EN"}
            <span className="sr-only"> — {localeNames[l as Locale]}</span>
          </Link>
        );
      })}
    </div>
  );
}
