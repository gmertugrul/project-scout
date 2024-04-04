import type { Config } from "tailwindcss";
import * as defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "390px",
      ...defaultTheme.screens,
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "header-gradient":
          "linear-gradient(131deg, rgba(14,44,85,1) 100%, rgba(0,59,148,1) 100%)",
      },
      spacing: {
        card: "1.5rem",
        "card-sm": "1rem",
      },
      colors: {
        brand: {
          "50": "#e9f9ff",
          "100": "#cef1ff",
          "200": "#a7e8ff",
          "300": "#6bdeff",
          "400": "#26c6ff",
          "500": "#009fff",
          "600": "#0075ff",
          "700": "#005aff",
          "800": "#004ce6",
          "900": "#0046b3",
          "950": "#001b42",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries"),
  ],
};

export default config;
