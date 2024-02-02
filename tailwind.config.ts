import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      spacing: {
        card: "1.5rem",
        "card-sm": "1rem",
      },
      colors: {
        brand: {
          "50": "#ebfef3",
          "100": "#cefde0",
          "200": "#a1f9c8",
          "300": "#64f1ab",
          "400": "#27e08b",
          "500": "#02c773",
          "600": "#00a25e",
          "700": "#00824e",
          "800": "#00663f",
          "900": "#00452c",
          "950": "#00301f",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
