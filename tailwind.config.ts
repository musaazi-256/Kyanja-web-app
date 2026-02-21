import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#071a63",
          gold: "#fbbf24",
          mist: "#f7f9ff"
        }
      },
      boxShadow: {
        card: "0 10px 30px rgba(7, 26, 99, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
