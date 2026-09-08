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
          // 5.3:1 on newsprint. The previous #8A8175 was 3.5:1, which fails
          // WCAG AA for the small text this token is used for throughout.
          faint: "#6E6659",
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
          // 5.1:1 on newsprint-white. The previous #B8862F was 3.2:1, which
          // failed AA for the kickers this is mostly used on. Nothing sits on
          // a harvest background, so darkening the token is safe.
          DEFAULT: "#90651A",
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
    },
  },
  plugins: [],
};

export default config;
