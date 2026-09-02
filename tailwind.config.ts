import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#FBF6E9",
          100: "#F5E9C6",
          200: "#EBD48F",
          300: "#E0C05C",
          400: "#D4AF37",
          500: "#C9962C",
          600: "#A97923",
          700: "#87601C",
          800: "#654715",
          900: "#43300E",
        },
        cream: "#FFFDF7",
        ink: "#1A1A1A",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #F5E9C6 0%, #D4AF37 45%, #C9962C 100%)",
        "gold-gradient-soft":
          "linear-gradient(135deg, #FBF6E9 0%, #F5E9C6 100%)",
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(201, 150, 44, 0.25)",
        card: "0 4px 20px -4px rgba(26, 26, 26, 0.08)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
