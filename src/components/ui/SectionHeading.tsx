import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyelet,
  title,
  subtitle,
  align = "start",
  light = false,
  className = "",
}: {
  eyelet?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "start" | "center";
  light?: boolean;
  className?: string;
}) {
  const alignCls = align === "center" ? "mx-auto text-center items-center" : "items-start";
  return (
    <div className={`flex max-w-2xl flex-col ${alignCls} ${className}`}>
      {eyelet && (
        <Reveal>
          <span className="eyelet">
            <span className="h-px w-6 bg-turquoise-500" />
            {eyelet}
          </span>
        </Reveal>
      )}
      <Reveal index={1}>
        <h2
          className={`font-display mt-4 text-balance text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-[2.6rem] ${
            light ? "text-white" : "text-navy-900"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal index={2}>
          <p
            className={`mt-5 text-pretty text-base leading-relaxed sm:text-lg ${
              light ? "text-navy-200/85" : "text-navy-500"
            }`}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
