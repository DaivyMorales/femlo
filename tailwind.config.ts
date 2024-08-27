import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./src/**/*.tsx",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satochi: ["var(--font-satochi)"],
        caveat: ["var(--font-caveat)"],
        faktum: ["var(--font-faktum)"],
      },
    },
  },
  plugins: [nextui()],
} satisfies Config;
