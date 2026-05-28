import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — Deep Navy + Turquoise
        navy: {
          50: "#eef2f9",
          100: "#d3dcee",
          200: "#a7b8dd",
          300: "#7491c6",
          400: "#476aa8",
          500: "#2f4d86",
          600: "#23396a",
          700: "#1a2c54",
          800: "#122042",
          900: "#0a1733",
          950: "#060e22",
        },
        turquoise: {
          50: "#eafafb",
          100: "#cbf2f5",
          200: "#9ce6ec",
          300: "#63d4df",
          400: "#2fbecd",
          500: "#14a2b4",
          600: "#0f8298",
          700: "#11677b",
          800: "#145465",
          900: "#154656",
          950: "#072d3a",
        },
        sand: {
          50: "#fbfaf7",
          100: "#f5f2ea",
          200: "#eae3d2",
        },
      },
      fontFamily: {
        // English: Plus Jakarta Sans (UI/body). Persian: Estedad (see globals.css).
        sans: ["var(--font-sans)", "Estedad", "system-ui", "sans-serif"],
        // Premium serif display for large English headings.
        display: ["var(--font-display)", "Estedad", "Georgia", "serif"],
        // Persian explicit utility.
        fa: ["Estedad", "var(--font-sans)", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
        wide: "1320px",
      },
      boxShadow: {
        soft: "0 2px 8px -2px rgba(10, 23, 51, 0.08), 0 6px 24px -8px rgba(10, 23, 51, 0.10)",
        card: "0 1px 2px rgba(10,23,51,0.04), 0 12px 40px -16px rgba(10,23,51,0.18)",
        glow: "0 0 0 1px rgba(20,162,180,0.18), 0 18px 60px -20px rgba(20,162,180,0.35)",
      },
      backgroundImage: {
        "navy-mesh":
          "radial-gradient(1200px 600px at 80% -10%, rgba(20,162,180,0.22), transparent 60%), radial-gradient(900px 500px at 0% 110%, rgba(47,190,205,0.16), transparent 55%), linear-gradient(180deg, #0a1733 0%, #122042 60%, #0a1733 100%)",
        "hero-grid":
          "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.8)", opacity: "0.6" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        float: "float 6s ease-in-out infinite",
        "pulse-ring": "pulse-ring 3s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
