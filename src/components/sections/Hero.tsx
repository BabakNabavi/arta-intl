"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { WorldGraphic } from "@/components/ui/WorldGraphic";
import { IconArrowRight, IconArrowLeft } from "@/components/ui/icons";

type HeroDict = {
  eyelet: string;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  trustNote: string;
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero({ locale, dict }: { locale: Locale; dict: HeroDict }) {
  const Arrow = locale === "fa" ? IconArrowLeft : IconArrowRight;

  return (
    <section className="relative overflow-hidden bg-navy-mesh text-white">
      {/* grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-hero-grid [background-size:64px_64px] [mask-image:radial-gradient(900px_500px_at_50%_0%,black,transparent)]" />
      {/* glow accents */}
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-turquoise-500/20 blur-3xl" />

      <div className="container-wide relative grid items-center gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
        {/* Copy */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-turquoise-200 ring-1 ring-white/15 rtl:tracking-normal rtl:text-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-turquoise-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-turquoise-400" />
            </span>
            {dict.eyelet}
          </motion.span>

          <motion.h1
            variants={item}
            className="font-display mt-6 text-balance text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-[3.6rem]"
          >
            {dict.title}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-navy-100/85 sm:text-lg"
          >
            {dict.subtitle}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href={`/${locale}/services`}
              className="group inline-flex items-center gap-2 rounded-full bg-turquoise-500 px-7 py-3.5 text-base font-semibold text-white shadow-glow transition-colors hover:bg-turquoise-400"
            >
              {dict.ctaPrimary}
              <Arrow className="h-5 w-5 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-7 py-3.5 text-base font-semibold text-white ring-1 ring-white/25 backdrop-blur transition-colors hover:bg-white/20"
            >
              {dict.ctaSecondary}
            </Link>
          </motion.div>

          <motion.p
            variants={item}
            className="mt-8 flex items-center gap-2 text-sm text-navy-100/60"
          >
            <span className="h-px w-8 bg-turquoise-400/60" />
            {dict.trustNote}
          </motion.p>
        </motion.div>

        {/* Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative mx-auto hidden w-full max-w-md lg:block"
        >
          <div className="animate-float">
            <WorldGraphic className="h-auto w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.4)]" />
          </div>
        </motion.div>
      </div>

      {/* bottom fade into page */}
      <div className="h-16 bg-gradient-to-b from-transparent to-white" />
    </section>
  );
}
