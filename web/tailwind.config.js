import { theme } from "tailwindcss/defaultConfig";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      opacity: {
        2: 0.02,
      },
      fontSize: {
        xxs: "0.625rem",
      },
      fontFamily: {
        sans: ["Inter", ...theme.fontFamily.sans],
      },
      boxShadow: {
        shape:
          "0px 8px 8px rgba(0, 0, 0, 0.1), 0px 4px 4px rgba(0, 0, 0, 0.1), 0px 2px 2px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px rgba(0, 0, 0, 0.1), inset 0px 0px 0px 1px rgba(255, 255, 255, 0.03), inset 0px 1px 0px rgba(255, 255, 255, 0.03)",
        "shape-content":
          "0px 0px 0px 1px rgba(0, 0, 0, 0.25), inset 0px 1px 0px rgba(255, 255, 255, 0.02), inset 0px 0px 0px 1px rgba(255, 255, 255, 0.02)",
      },
      animation: {
        border: "border 2s linear infinite",
        "collapsible-down": "collapsible-down 260ms cubic-bezier(0.87, 0, 0.13, 1)",
        "collapsible-up": "collapsible-up 260ms cubic-bezier(0.87, 0, 0.13, 1)",
      },
      keyframes: {
        border: {
          to: { "--border-angle": "360deg" },
        },
        "collapsible-down": {
          from: { height: "0" },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
        "collapsible-up": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: "0" },
        },
      },
    },
  },
  plugins: [],
};
