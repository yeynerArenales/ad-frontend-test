import { generateKey } from "crypto";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      base: "16px",
      lg: "18px",
      xl: "20px",
      xxl: "24px",
      xxxl: "36px",
    },
    extend: {
      colors: {
        surface: "#EEEEEE",
        primary: "#404040",
        secondary: "#3B3B3B",
        tertiary: "#8F8F8F",
        quaternary: "#F5F5F4",
        text: {
          dark: "#585660",
          light: "#737373",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
