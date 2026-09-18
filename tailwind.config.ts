import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#FFF9FC",
        foreground: "#24202A",
        pulse: {
          purple: {
            DEFAULT: "#7C3AED",
            50: "#F4EDFE",
            100: "#E9DBFD",
            200: "#D3B7FB",
            300: "#BC93F9",
            400: "#A66FF6",
            500: "#7C3AED",
            600: "#6425D0",
            700: "#4C1BA3",
            800: "#351276",
            900: "#1E0A49",
          },
          pink: {
            DEFAULT: "#FF4F81",
            50: "#FFECF1",
            100: "#FFD3DF",
            200: "#FFA7BF",
            300: "#FF7BA0",
            400: "#FF4F81",
            500: "#F52469",
            600: "#D10E4F",
            700: "#9E0B3C",
            800: "#6C0729",
            900: "#3A0416",
          },
          gold: {
            DEFAULT: "#FFC857",
            50: "#FFFAEE",
            100: "#FFF2D4",
            200: "#FFE4A3",
            300: "#FFD772",
            400: "#FFC857",
            500: "#F5AE1E",
            600: "#CC8D0E",
            700: "#996A0B",
            800: "#664707",
            900: "#332403",
          },
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#24202A",
        },
        muted: {
          DEFAULT: "#F6EEF3",
          foreground: "#6B6572",
        },
        primary: {
          DEFAULT: "#7C3AED",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#FF4F81",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#FFC857",
          foreground: "#24202A",
        },
        destructive: {
          DEFAULT: "#E11D48",
          foreground: "#FFFFFF",
        },
      },
      fontFamily: {
        display: ["var(--font-baloo)", "system-ui", "sans-serif"],
        sans: ["var(--font-nunito)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "party-gradient": "linear-gradient(135deg, #7C3AED 0%, #FF4F81 60%, #FFC857 100%)",
        "party-gradient-soft": "linear-gradient(135deg, #F4EDFE 0%, #FFECF1 50%, #FFFAEE 100%)",
        "hero-radial": "radial-gradient(circle at 70% 30%, rgba(124,58,237,0.12), transparent 55%), radial-gradient(circle at 20% 80%, rgba(255,79,129,0.12), transparent 55%)",
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(124, 58, 237, 0.18)",
        card: "0 6px 20px -6px rgba(36, 32, 42, 0.10)",
        "card-hover": "0 16px 36px -12px rgba(124, 58, 237, 0.28)",
        pop: "0 20px 50px -16px rgba(255, 79, 129, 0.35)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        blob: "62% 38% 55% 45% / 45% 55% 45% 55%",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-16px) rotate(3deg)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pop-in": {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "heart-pop": {
          "0%": { transform: "scale(1)" },
          "40%": { transform: "scale(1.4)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 5s ease-in-out infinite",
        "pop-in": "pop-in 0.2s ease-out",
        "heart-pop": "heart-pop 0.4s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
