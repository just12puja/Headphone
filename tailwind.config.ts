import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#E6D8C3",
        "secondary-bg": "#D9CBB6",
        "tertiary-bg": "#F5EFE6",
        surface: "#FAF7F2",
        "primary-text": "#1A1510",
        "secondary-text": "rgba(40, 32, 24, 0.85)",
        "gradient-start": "#4A3B28",
        "gradient-end": "#8E795E",
        "primary-accent": "#D4AF37",
        "atmospheric-start": "#E6D8C3",
        "atmospheric-end": "#CBB9A0",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "atmospheric-gradient":
          "radial-gradient(circle at center, var(--tw-gradient-stops))",
        "accent-gradient":
          "linear-gradient(to right, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
