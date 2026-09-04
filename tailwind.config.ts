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
        forest: {
          50: "#EBEFEC",
          100: "#D3DBD5",
          200: "#A6B7AB",
          300: "#6E8577",
          400: "#3F5C48",
          500: "#2D4C38",
          600: "#1B3022",
          700: "#16271C",
          800: "#101D15",
          900: "#0A130E",
        },
        cream: "#FFFDF7",
        ink: "#1A1A1A",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        fraunces: ["var(--font-fraunces)", "serif"],
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #F5E9C6 0%, #D4AF37 45%, #C9962C 100%)",
        "gold-gradient-soft":
          "linear-gradient(135deg, #FBF6E9 0%, #F5E9C6 100%)",
      },
      boxShadow: {
        soft: "0 12px 32px -10px rgba(169, 121, 35, 0.35)",
        card: "0 8px 28px -8px rgba(26, 26, 26, 0.12)",
        premium: "0 24px 60px -20px rgba(67, 48, 14, 0.35)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
