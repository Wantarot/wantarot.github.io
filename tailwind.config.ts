import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0f1a33",
          gold: "#c9a045",
          soft: "#f6f7fb",
          ink: "#1f2937"
        }
      },
      boxShadow: {
        card: "0 8px 30px rgba(15,26,51,0.08)"
      }
    }
  },
  plugins: []
} satisfies Config;
