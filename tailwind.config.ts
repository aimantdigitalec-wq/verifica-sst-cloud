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
        sst: {
          success: "#009879",
          warning: "#FFCC00",
          danger: "#D32F2F",
          light: "#F4F6F8",
          dark: "#1F2937",
        },
      },
    },
  },
  plugins: [],
};
export default config;
