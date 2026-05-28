import Link from "next/link";
import type { ReactNode } from "react";
import { IconArrowRight, IconArrowLeft } from "./icons";

type Variant = "primary" | "secondary" | "ghost" | "light";

const styles: Record<Variant, string> = {
  primary:
    "bg-turquoise-500 text-white shadow-glow hover:bg-turquoise-600 focus-visible:ring-turquoise-300",
  secondary:
    "bg-navy-900 text-white hover:bg-navy-800 focus-visible:ring-navy-300",
  ghost:
    "bg-transparent text-navy-800 ring-1 ring-navy-200 hover:ring-navy-900 hover:bg-navy-50 focus-visible:ring-navy-300",
  light:
    "bg-white/10 text-white ring-1 ring-white/25 backdrop-blur hover:bg-white/20 focus-visible:ring-white/50",
};

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  locale?: "fa" | "en";
  withArrow?: boolean;
  external?: boolean;
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  locale = "en",
  withArrow = true,
  external = false,
  className = "",
}: ButtonProps) {
  const Arrow = locale === "fa" ? IconArrowLeft : IconArrowRight;
  const content = (
    <>
      <span>{children}</span>
      {withArrow && (
        <Arrow className="h-[1.05em] w-[1.05em] transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
      )}
    </>
  );

  const cls = `group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.95rem] font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-4 ${styles[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}
