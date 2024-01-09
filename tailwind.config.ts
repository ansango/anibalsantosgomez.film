import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
//@ts-expect-error fluidType is not typed
import fluidType from "tailwindcss-fluid-type";
//@ts-expect-error fluidType is not typed
import heroPatterns from "tailwind-heropatterns";
import forms from "@tailwindcss/forms";
const config: Config = {
  darkMode: "class",
  content: [
    "./src/lib/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        "dynamic-screen": "100dvh",
      },
      minHeight: {
        "dynamic-screen": "100dvh",
      },
      maxHeight: {
        "dynamic-screen": "100dvh",
      },
      screens: {
        "3xs": "420px",
        "2xs": "480px",
        xs: "576px",
        "3xl": "1920px",
      },
      fontFamily: {
        sans: ["var(--sans)", ...fontFamily.sans],
        serif: ["var(--serif)", ...fontFamily.serif],
        display: ["var(--display)", ...fontFamily.sans],
      },
      fontSize: {
        "10xl": ["10rem", { lineHeight: "1" }],
        "11xl": ["11rem", { lineHeight: "1" }],
        "12xl": ["12rem", { lineHeight: "1" }],
        "13xl": ["13rem", { lineHeight: "1" }],
        "14xl": ["14rem", { lineHeight: "1" }],
      },
      aspectRatio: {
        "4/3": "4 / 3",
        "4/5": "4 / 5",
        "5/4": "5 / 4",
        "9/16": "9 / 16",
        "2/3": "2 / 3",
        "3/2": "3 / 2",
      },
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
      },
      textColor: {
        default: "var(--color-text)",
        offset: "var(--color-text-offset)",
        button: "var(--color-text-button)",
      },
      backgroundColor: {
        default: "var(--color-background)",
        offset: "var(--color-background-offset)",
      },
      borderColor: {
        default: "var(--color-border)",
        offset: "var(--color-border-offset)",
      },
    },
  },

  plugins: [
    forms,
    fluidType({
      settings: {
        fontSizeMin: 1.125, // 1.125rem === 18px
        fontSizeMax: 1.25, // 1.25rem === 20px
        ratioMin: 1.125, // Multiplicator Min
        ratioMax: 1.2, // Multiplicator Max
        screenMin: 20, // 20rem === 320px
        screenMax: 96, // 96rem === 1536px
        unit: "rem", // default is rem but it's also possible to use 'px'
        prefix: "", // set a prefix to use it alongside the default font sizes
      },
      values: {
        xs: [-2, 1.6],
        sm: [-1, 1.6],
        base: [0, 1.6],
        lg: [1, 1.6],
        xl: [2, 1.2],
        "2xl": [3, 1.2],
        "3xl": [4, 1.2],
        "4xl": [5, 1.1],
        "5xl": [6, 1.1],
        "6xl": [7, 1.1],
        "7xl": [8, 1],
        "8xl": [9, 1],
        "9xl": [10, 1],
        "10xl": [11, 1],
        "11xl": [12, 1],
        "12xl": [13, 1],
        "13xl": [14, 1],
        "14xl": [15, 1],
      },
    }),
    heroPatterns({
      patterns: ["topography"],
      colors: {
        "primary-light": "#171717",
        "secondary-light": "#f59e0b",
        "default-light": "#525252",
        "offset-light": "#a3a3a3",

        "primary-dark": "#fbbf24",
        "secondary-dark": "#3b82f6",
        "default-dark": "#a3a3a3",
        "offset-dark": "#525252",
      },

      opacity: {
        10: "0.03",
        15: "0.15",
        20: "0.2",
        100: "1.0",
      },
    }),
  ],
};
export default config;
