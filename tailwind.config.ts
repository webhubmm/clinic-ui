import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        dark: "#000000",
        blue: "#0000ee",
        blue_two: "#000e25",
        blue_three: "0c1c19",
        gray: "#6e7581",
        gray_two: "#aaadb0",
        gray_three: "#d9dce2",
        gray_four: "#dddddd",
        sky: "#a8b6ce",
        pink: "#ffdede",
        "#05b9de": "#05b9de",
        sky_one: "#052e73",
        brown: "#333333",
        slate: "#4b5362",
        sky_two: "#5cd1e9",
        gray_opacity: "#122258",
        white: "#f3f3f3",
      },
    },
  },
  plugins: [],
};
export default config;
