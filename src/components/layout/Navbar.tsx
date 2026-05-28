"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Locale } from "@/i18n/config";
import { Logo } from "@/components/ui/Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { IconArrowRight, IconArrowLeft } from "@/components/ui/icons";

type NavDict = {
  home: string;
  about: string;
  services: string;
  contact: string;
  cta: string;
  menu: string;
  close: string;
};

export function Navbar({ locale, dict }: { locale: Locale; dict: NavDict }) {
  const pathname = usePathname() || `/${locale}`;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const Arrow = locale === "fa" ? IconArrowLeft : IconArrowRight;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: `/${locale}`, label: dict.home, exact: true },
    { href: `/${locale}/about`, label: dict.about },
    { href: `/${locale}/services`, label: dict.services },
    { href: `/${locale}/contact`, label: dict.contact },
  ];

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-navy-100 bg-white/85 backdrop-blur-md"
          : "border-b border-transparent bg-white/0"
      }`}
    >
      <nav className="container-wide flex h-[72px] items-center justify-between gap-4">
        <Logo locale={locale} variant="dark" />

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`relative rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors ${
                  isActive(l.href, l.exact)
                    ? "text-navy-900"
                    : "text-navy-500 hover:text-navy-900"
                }`}
              >
                {l.label}
                {isActive(l.href, l.exact) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-turquoise-500"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher locale={locale} />
          <Link
            href={`/${locale}/contact`}
            className="group inline-flex items-center gap-2 rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-turquoise-600"
          >
            {dict.cta}
            <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher locale={locale} />
          <button
            type="button"
            aria-label={dict.menu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-navy-200 text-navy-900"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition-all ${open ? "top-1.5 rotate-45" : ""}`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-5 bg-current transition-all ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`absolute left-0 top-3 h-0.5 w-5 bg-current transition-all ${open ? "top-1.5 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden"
          >
            <div className="container-wide border-t border-navy-100 bg-white pb-8 pt-4">
              <ul className="flex flex-col">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className={`flex items-center justify-between border-b border-navy-50 py-4 text-lg font-medium ${
                        isActive(l.href, l.exact) ? "text-turquoise-600" : "text-navy-800"
                      }`}
                    >
                      {l.label}
                      <Arrow className="h-5 w-5 opacity-50" />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={`/${locale}/contact`}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-turquoise-500 px-5 py-3.5 font-semibold text-white"
              >
                {dict.cta}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
