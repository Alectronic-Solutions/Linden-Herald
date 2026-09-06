import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#14110F",
          soft: "#2A2521",
          muted: "#5A5248",
          faint: "#8A8175",
        },
        newsprint: {
          DEFAULT: "#FAF7F0",
          deep: "#F2EDE2",
          white: "#FFFDF8",
        },
        herald: {
          DEFAULT: "#1B4D3E",
          dark: "#123328",
          light: "#2F6B57",
        },
        cherry: {
          DEFAULT: "#8E2A2A",
          light: "#B24A45",
        },
        harvest: {
          DEFAULT: "#B8862F",
          light: "#D8AC55",
        },
        rule: {
          DEFAULT: "#DCD5C6",
          strong: "#C2B9A6",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "Georgia", "serif"],
        label: ["var(--font-label)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        broadsheet: "78rem",
        column: "42rem",
      },
      boxShadow: {
        page: "0 1px 2px rgba(20,17,15,0.04), 0 12px 32px -18px rgba(20,17,15,0.28)",
        lift: "0 2px 4px rgba(20,17,15,0.05), 0 24px 48px -24px rgba(20,17,15,0.38)",
      },
      backgroundImage: {
        "newsprint-grain":
          "radial-gradient(circle at 25% 15%, rgba(184,134,47,0.05), transparent 55%), radial-gradient(circle at 78% 62%, rgba(27,77,62,0.05), transparent 55%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both",
        marquee: "marquee 42s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
