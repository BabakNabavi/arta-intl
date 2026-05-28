"use client";

import { useState, type FormEvent } from "react";
import { SITE, whatsappLink } from "@/lib/site";
import type { Dictionary } from "@/i18n/get-dictionary";

// Client component: the contact form keeps local state and, on submit,
// prepares a structured message and opens WhatsApp / the user's mail client.
// No backend is required for deployment; swap the handler for an API route
// (e.g. /api/contact) if server-side delivery is later desired.

type FormDict = Dictionary["contact"]["form"];

export function ContactForm({ dict }: { dict: FormDict }) {
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [values, setValues] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });

  const update = (key: keyof typeof values) => (e: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!values.name.trim() || !values.email.trim() || !values.message.trim()) {
      setStatus("error");
      return;
    }

    const lines = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      values.company && `Company: ${values.company}`,
      values.subject && `Subject: ${values.subject}`,
      "",
      values.message,
    ]
      .filter(Boolean)
      .join("\n");

    // Open a prepared WhatsApp message in a new tab.
    if (typeof window !== "undefined") {
      window.open(whatsappLink(lines), "_blank", "noopener,noreferrer");
    }
    setStatus("success");
  }

  const fieldCls =
    "w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-navy-900 placeholder:text-navy-300 transition-colors focus:border-turquoise-500 focus:outline-none focus:ring-4 focus:ring-turquoise-100";
  const labelCls = "mb-1.5 block text-sm font-medium text-navy-700";

  return (
    <form onSubmit={handleSubmit} className="grid gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>
            {dict.name} <span className="text-turquoise-600">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={values.name}
            onChange={update("name")}
            placeholder={dict.namePlaceholder}
            className={fieldCls}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>
            {dict.email} <span className="text-turquoise-600">*</span>
          </label>
          <input
            id="email"
            type="email"
            dir="ltr"
            value={values.email}
            onChange={update("email")}
            placeholder={dict.emailPlaceholder}
            className={fieldCls}
            required
          />
        </div>
        <div>
          <label htmlFor="company" className={labelCls}>
            {dict.company}
          </label>
          <input
            id="company"
            type="text"
            value={values.company}
            onChange={update("company")}
            placeholder={dict.companyPlaceholder}
            className={fieldCls}
          />
        </div>
        <div>
          <label htmlFor="subject" className={labelCls}>
            {dict.subject}
          </label>
          <input
            id="subject"
            type="text"
            value={values.subject}
            onChange={update("subject")}
            placeholder={dict.subjectPlaceholder}
            className={fieldCls}
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className={labelCls}>
          {dict.message} <span className="text-turquoise-600">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          value={values.message}
          onChange={update("message")}
          placeholder={dict.messagePlaceholder}
          className={`${fieldCls} resize-y`}
          required
        />
      </div>

      {status === "error" && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{dict.error}</p>
      )}
      {status === "success" && (
        <p className="rounded-xl bg-turquoise-50 px-4 py-3 text-sm font-medium text-turquoise-700">
          {dict.success}
        </p>
      )}

      <div>
        <button
          type="submit"
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-turquoise-500 px-7 py-3.5 text-[0.95rem] font-semibold text-white shadow-glow transition-all duration-300 hover:bg-turquoise-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-turquoise-300"
        >
          {dict.submit}
        </button>
      </div>
      <p className="text-xs text-navy-400">
        {SITE.email}
      </p>
    </form>
  );
}
