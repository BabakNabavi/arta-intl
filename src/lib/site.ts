// Central place for company / contact constants used across the site.
// Update these values in one place to propagate everywhere.

export const SITE = {
  url: "https://www.artaintl.com",
  domain: "artaintl.com",
  legalName: "Arta Tejarat International Apadana",
  legalNameFa: "آرتا تجارت بین‌الملل آپادانا",
  brand: "Arta Tejarat",
  registrationNumber: "659891",
  // Director name is intentionally kept low-profile; surfaced only subtly in contact JSON-LD.
  director: "Babak Nabavi",
  email: "info@artaintl.com",
  // WhatsApp number in international format (digits only for the wa.me link).
  whatsapp: "98900132728",
  whatsappDisplay: "+98 900 132 7283",
  instagram: "artaintl",
  instagramUrl: "https://instagram.com/artaintl",
  address: {
    street: "No. 36 ,Golnabi St., Pasdaran, Tehran, Iran",
    city: "Tehran",
    country: "Iran",
    full: "No. 36 ,Golnabi St., Pasdaran, Tehran, Iran",
  },
} as const;

export const whatsappLink = (message?: string) =>
  `https://wa.me/${SITE.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
